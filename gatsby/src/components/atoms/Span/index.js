import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'

const Span = ({ children, border }) => (
  <span
    css={css`
      font-size: .7em;
      padding: .2em;
      border: ${border ? '1px solid #999;' : 'none'}
      border-radius: 3px;
      margin-left: .5em;
    `}
  >
    {children}
  </span>
)

Span.propTypes = {
  children: PropTypes.node.isRequired,
  border: PropTypes.bool,
}

Span.defaultProps = {
  border: false,
}

export default Span
