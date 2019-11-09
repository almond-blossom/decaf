import PropTypes from 'prop-types'
import React from 'react'
import { css } from '@emotion/core'

const HEADER_HEIGHT = '4rem'

const Header = ({ children }) => (
  <div
    css={css`
      position: fixed;
      top: 0;
      left: 0;
      height: ${HEADER_HEIGHT};
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

const Body = ({ children }) => (
  <div
    css={css`
      margin-top: ${HEADER_HEIGHT};
      padding: 4%;
    `}
  >
    {children}
  </div>
)

Body.propTypes = {
  children: PropTypes.node.isRequired,
}

const Footer = ({ children }) => (
  <div
    css={css`
      margin-top: auto;
      padding: 0 5%;
    `}
  >
    {children}
  </div>
)

Footer.propTypes = {
  children: PropTypes.node.isRequired,
}

const PageTemplate = ({ header, children, footer }) => (
  <div
    css={css`
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: .5em;
    `}
  >
    <Header>{header}</Header>
    <Body>{children}</Body>
    <Footer>{footer}</Footer>
  </div>
)

PageTemplate.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
}

export default PageTemplate
