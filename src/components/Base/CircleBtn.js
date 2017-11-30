import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as userActions from 'ufSrc/actions/user'
import FaIcon from 'ufSrc/components/common/FaIcon'

import styles from 'ufSrc/styles/base.circleBtn.scss'

class circleBtn extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onAddClick: PropTypes.func,
  }

  render () {
    const { onAddClick } = this.props

    return (
      <div className={cn(styles.circleBtnDiv, this.props.className)}>
        <button type='button' title='Добавить пользователя' onClick={onAddClick} className={cn('btn btn-info', styles.circleBtn)}>
          <FaIcon icon='plus' />
        </button>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    onAddClick: function () {
      return dispatch(userActions.onAddClick())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(circleBtn)
