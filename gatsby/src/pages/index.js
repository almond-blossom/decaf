import { css } from '@emotion/core'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Layout from '../components/Layout'
import Posts from '../components/Posts'
import SEO from '../components/SEO'
import Tag from '../components/atoms/Tag'

const Page = ({ data }) => (
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
      <h4>Tags</h4>
      <ul
        css={css`
          list-style-type: none;
          display: flex;
          flex-wrap: wrap;
        `}
      >
        {data.allMarkdownRemark.group.map((tag) => (
          <li><Tag>{tag.fieldValue} ({tag.totalCount})</Tag></li>
        ))}
      </ul>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      <Posts data={data} />
    </div>
  </Layout>
)

Page.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }),
      ).isRequired,
    }),
  }).isRequired,
}

export default Page

export const query = graphql`
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
`
