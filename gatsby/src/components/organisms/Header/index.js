import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'

const Header = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
      css={css`
        font-size: 1.5em;
        letter-spacing: .2em;
        color: #fff;
        width: 100%;
        height: 100%;
        background-color: #6988b1;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {data.site.siteMetadata.title}
    </div>
  )
}

export default Header
