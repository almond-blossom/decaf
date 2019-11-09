import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import PageTemplate from '../../templates/PageTemplate'
import Posts from '../../Posts'
import SEO from '../../SEO'
import Heading from '../../atoms/Heading'
import Tag from '../../molecules/Tag'
import Header from '../../organisms/Header'
import Footer from '../../organisms/Footer'

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
      <Heading>Tags</Heading>
      <ul
        css={css`
          list-style-type: none;
          display: flex;
          flex-wrap: wrap;
        `}
      >
        {data.allMarkdownRemark.group.map((tag) => (
          <li key={tag.fieldValue}>
            <Tag name={tag.fieldValue} count={tag.totalCount} />
          </li>
        ))}
      </ul>
      <Heading>{data.allMarkdownRemark.totalCount} Posts</Heading>
      <Posts data={data} />
    </PageTemplate>
  )
}

export default HomePage
