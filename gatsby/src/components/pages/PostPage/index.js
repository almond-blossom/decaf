import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Footer from '../../organisms/Footer'
import Header from '../../organisms/Header'
import SEO from '../../SEO'
import PageTemplate from '../../templates/PageTemplate'

const PostPage = ({ data }) => {
  const post = data.markdownRemark
  return (
    <PageTemplate
      header={<Header />}
      footer={<Footer />}
    >
      <SEO title="Home" />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </PageTemplate>
  )
}

PostPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default PostPage

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
