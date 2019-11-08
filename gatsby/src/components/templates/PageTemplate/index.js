import PropTypes from 'prop-types'
import React from 'react'
import { css } from '@emotion/core'

const Header = ({ children }) => (
  <div
    css={css`
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 999;
    `}
  >
    {children}
  </div>
)

Header.propTypes = {
  children: PropTypes.node.isRequired,
}

const Footer = ({ children }) => (
  <div
    css={css`
      margin-top: auto;
    `}
  >
    {children}
  </div>
)

Footer.propTypes = {
  children: PropTypes.node.isRequired,
}

const PageTemplate = ({ header, children, footer }) => (
  <div>
    <Header>{header}</Header>
    <div>{children}</div>
    <Footer>{footer}</Footer>
  </div>
)

PageTemplate.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
}

export default PageTemplate
