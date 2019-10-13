import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'

export default ({ data }) => (
  <div>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <Link
          to={node.fields.slug}
          css={css`
            text-decoration: none;
            color: inherit;
          `}
        >
          <h3
            css={css`
              margin-bottom: ${rhythm(1 / 4)};
            `}
          >
            {node.frontmatter.title}{' '}
            <span
              css={css`
                color: #bbb;
              `}
            >
              — {node.frontmatter.date}
            </span>
          </h3>
          <p>{node.excerpt}</p>
        </Link>
      </div>
    ))}
  </div>
)