import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import Footer from '../../organisms/Footer'
import Header from '../../organisms/Header'
import TagMenu from '../../organisms/TagMenu'
import Posts from '../../organisms/Posts'
import SEO from '../../SEO'
import PageTemplate from '../../templates/PageTemplate'

const resolveHeading = (headings) => {
  const found = headings.find((v) => v.depth === 1)
  return found ? found.value : ''
}

const mapPost = (post) => ({
  id: post.node.id,
  path: post.node.fields.slug,
  title: resolveHeading(post.node.headings),
  tags: post.node.frontmatter.tags,
})

const HomePage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        totalCount
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
        edges {
          node {
            id
            frontmatter {
              tags
            }
            fields {
              slug
            }
            headings {
              depth
              value
            }
          }
        }
      }
    }
  `)
  return (
    <PageTemplate
      header={<Header />}
      footer={<Footer />}
    >
      <SEO title="Home" />
      <TagMenu tagGroup={data.allMarkdownRemark.group} />
      <Posts
        posts={data.allMarkdownRemark.edges.map(mapPost)}
        totalCount={data.allMarkdownRemark.totalCount}
      />
    </PageTemplate>
  )
}

export default HomePage
