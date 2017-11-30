import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { Errors } from 'react-redux-form'

export default class CustomErrors extends React.Component {
  static propTypes = {
    wrapperClassName: PropTypes.string,
  }

  render () {
    const { wrapperClassName, ...other } = this.props

    return (
      <Errors
        {...other}
        show={(field) => !field.pristine}
        wrapper={
          (props) => <div className={cn('invalid-feedback position-absolute d-block mt-0', wrapperClassName)}>{props.children}</div>
        }
      />
    )
  }
}
