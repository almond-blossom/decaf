import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import Tag from '../../molecules/Tag'
import Heading from '../../atoms/Heading'

const TagMenu = ({ tagGroup }) => (
  <div>
    <Heading>Tag menu</Heading>
    <ul
      css={css`
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
      `}
    >
      {tagGroup.map((tag) => (
        <li key={tag.fieldValue}>
          <Tag name={tag.fieldValue} count={tag.totalCount} />
        </li>
      ))}
    </ul>
  </div>
)

TagMenu.propTypes = {
  tagGroup: PropTypes.arrayOf(PropTypes.shape({
    fieldValue: PropTypes.string.isRequired,
    totalCount: PropTypes.number.isRequired,
  })).isRequired,
}

export default TagMenu
