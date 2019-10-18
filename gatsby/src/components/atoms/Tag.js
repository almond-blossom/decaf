import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'

const Tag = ({ children }) => (
  <span
    css={css`
      font-size: .7em;
      padding: .2em;
      border: 1px solid #999;
      border-radius: 3px;
      margin-left: .5em;
    `}
  >
    {children}
  </span>
)

Tag.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Tag
