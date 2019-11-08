import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'

const Heading = ({ children }) => (
  <div
    css={css`
      margin: 0;
      padding: 0;
      margin-bottom: 1.45rem;
      color: inherit;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      font-weight: bold;
      text-rendering: optimizeLegibility;
      font-size: 1rem;
      line-height: 1.1;
    `}
  >
    {children}
  </div>
)

Heading.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Heading
