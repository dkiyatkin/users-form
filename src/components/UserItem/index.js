import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FaIcon from 'ufSrc/components/common/FaIcon'

import * as userActions from 'ufSrc/actions/user'
import UserForm from 'ufSrc/components/UserForm'

import styles from 'ufSrc/styles/userItem.scss'

class UserItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    userId: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    patronymic: PropTypes.string,
    isOpen: PropTypes.bool,
    onToggleOpenClick: PropTypes.func,
  }

  render () {
    const { userId, name = '', surname = '', patronymic = '', isOpen, onToggleOpenClick } = this.props
    const fio = (surname + ' ' + name + ' ' + patronymic).trim()

    return (
      <div className={cn(styles.userItem, this.props.className)}>
        <button onClick={onToggleOpenClick} className={cn('btn btn-link', styles.btn)}>
          <div className={cn(styles.btnDiv)}>
            <FaIcon icon={cn({'folder': !isOpen, 'folder-open': isOpen})} className={cn(styles.btnIcon)} />
            {' '}
            <span className={cn(styles.btnSpan)}>
              {fio}
            </span>
          </div>
        </button>
        {
          isOpen &&
          <UserForm userId={userId} className='mt-3' />
        }
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const userId = ownProps.userId
  const user = state.rrf.users[userId]
  const { name, surname, patronymic, isOpen } = user

  return {
    name,
    surname,
    patronymic,
    isOpen,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  const userId = ownProps.userId

  return {
    onToggleOpenClick: function (values) {
      return dispatch(userActions.onToggleOpenClick(userId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItem)
