import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import Tag from '../../molecules/Tag'
import Heading from '../../atoms/Heading'

const Item = ({
  heading: { title, isTitled },
  tags,
}) => (
  <li
    css={css`
      color: ${isTitled ? '#000' : '#888'};
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
    isTitled: PropTypes.bool,
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const Posts = ({ posts, totalCount }) => (
  <div>
    <Heading>{totalCount} Posts</Heading>
    {posts.map((post) => (
      <ul key={post.id}>
        <Link
          to={post.path}
          css={css`
            text-decoration: none;
            color: inherit;
          `}
        >
          <Item
            heading={{
              title: post.title || '(Untitled Post)',
              isTitled: !!post.title,
            }}
            tags={post.tags}
          />
        </Link>
      </ul>
    ))}
  </div>
)

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      title: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  ).isRequired,
  totalCount: PropTypes.number.isRequired,
}

export default Posts
