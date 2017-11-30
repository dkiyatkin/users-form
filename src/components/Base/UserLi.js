import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import UserItem from 'ufSrc/components/UserItem'

import styles from 'ufSrc/styles/empty.scss'

class UserLi extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    userId: PropTypes.string,
    user: PropTypes.object,
  }

  render () {
    const { userId, user } = this.props

    if (!user) return null

    return (
      <li className={cn(styles.empty, this.props.className)}>
        <UserItem userId={userId} />
      </li>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const userId = ownProps.userId

  return {
    user: state.rrf.users[userId]
  }
}

export default connect(mapStateToProps)(UserLi)
