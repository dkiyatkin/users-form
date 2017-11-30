import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as userActions from 'ufSrc/actions/user'

import styles from 'ufSrc/styles/empty.scss'

class Buttons extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isEdit: PropTypes.bool,
    isNew: PropTypes.bool,
    onFoldClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onCancelClick: PropTypes.func,
    onSubmitClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
  }

  render () {
    const { isEdit, isNew, onFoldClick, onEditClick, onCancelClick, onSubmitClick, onDeleteClick } = this.props

    return (
      <div className={cn(styles.empty, this.props.className)}>
        {
          !isEdit &&
          <span>
            <button type='button' onClick={onFoldClick} className='btn btn-secondary'>
              Свернуть
            </button>
            {' '}
            <button type='button' onClick={onEditClick} className='btn btn-primary'>
              Редактировать
            </button>
          </span>
        }
        {
          isEdit &&
          <span>
            <button type='button' onClick={onCancelClick} className='btn btn-secondary'>
              Отмена
            </button>
            {' '}
            <button type='button' onClick={onSubmitClick} className='btn btn-success'>
              Сохранить
            </button>
            {' '}
          </span>
        }
        {' '}
        {
          !isNew &&
          <button type='button' onClick={onDeleteClick} className='btn btn-danger'>
            Удалить
          </button>
        }
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const user = state.rrf.users[ownProps.userId]
  const { isEdit, isNew } = user

  return {
    isEdit,
    isNew,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  const userId = ownProps.userId

  return {
    onSubmit: function () {
      return dispatch(userActions.onSubmit(userId))
    },
    onFoldClick: function () {
      return dispatch(userActions.onFoldClick(userId))
    },
    onEditClick: function () {
      return dispatch(userActions.onEditClick(userId))
    },
    onCancelClick: function () {
      return dispatch(userActions.onCancelClick(userId))
    },
    onSubmitClick: function () {
      return dispatch(userActions.onSubmitClick(userId))
    },
    onDeleteClick: function () {
      return dispatch(userActions.onDeleteClick(userId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons)
