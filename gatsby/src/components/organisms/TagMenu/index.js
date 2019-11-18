import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import React from 'react'
import Tag from '../../molecules/Tag'
import Heading from '../../atoms/Heading'

const TagMenu = ({ tagGroup }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      margin-bottom: 2em;
    `}
  >
    <Heading>Tag menu</Heading>
    <ul
      css={css`
        display: flex;
        flex-flow: wrap;
        list-style-type: none;
        margin: 0;
      `}
    >
      {tagGroup.map((tag) => (
        <li
          css={css`
            margin: 0;
          `}
          key={tag.fieldValue}
        >
          <Tag
            name={tag.fieldValue}
            count={tag.totalCount}
          />
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
