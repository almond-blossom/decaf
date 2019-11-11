import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import Heading from '../../atoms/Heading'
import Footer from '../../organisms/Footer'
import Header from '../../organisms/Header'
import TagMenu from '../../organisms/TagMenu'
import Posts from '../../Posts'
import SEO from '../../SEO'
import PageTemplate from '../../templates/PageTemplate'

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
            excerpt
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
      <Heading>{data.allMarkdownRemark.totalCount} Posts</Heading>
      <Posts data={data} />
    </PageTemplate>
  )
}

export default HomePage
