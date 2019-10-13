import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Posts from '../components/Posts'

export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div>
      <h1
        css={css`
          display: inline-block;
          border-bottom: 1px solid;
        `}
      >
          Knolwdge Base
      </h1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      <Posts data={data}></Posts>
    </div>
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
