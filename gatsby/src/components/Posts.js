import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import Tag from './molecules/Tag'

const resolveHeading = (node) => {
  const result = {
    title: '(Untitled Post)',
    isUntitled: true,
  }

  if (!node || !Array.isArray(node.headings)) return result

  const heading = node.headings.find((head) => (
    head.depth === 1 && typeof head.value === 'string'
  ))

  if (!heading) return result

  result.title = heading.value
  result.isUntitled = false

  return result
}

const Item = ({
  heading: { title, isUntitled },
  tags,
}) => (
  <li
    css={css`
      color: ${isUntitled ? '#888' : '#000'};
    `}
  >
    {title}
    {tags.map((tag) => (
      <Tag key={tag} name={tag} />
    ))}
  </li>
)

Item.propTypes = {
  heading: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isUntitled: PropTypes.bool,
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const Posts = ({ data }) => (
  <div>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <ul key={node.id}>
        <Link
          to={node.fields.slug}
          css={css`
            text-decoration: none;
            color: inherit;
          `}
        >
          <Item heading={resolveHeading(node)} tags={node.frontmatter.tags} />
        </Link>
      </ul>
    ))}
  </div>
)

Posts.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              tags: PropTypes.arrayOf(PropTypes.string).isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired,
      ),
    }),
  }).isRequired,
}

export default Posts