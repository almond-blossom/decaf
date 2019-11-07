import PropTypes from 'prop-types'
import React from 'react'
import Span from '../../atoms/Span'

const Tag = ({ name, count }) => (
  <Span border>{ name } { count ? `(${count})` : '' }</Span>
)

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number,
}

Tag.defaultProps = {
  count: 0,
}

export default Tag
