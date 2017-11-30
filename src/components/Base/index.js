import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CircleBtn from './CircleBtn'
import UserLi from './UserLi'

import styles from 'ufSrc/styles/base.scss'

class Base extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    userIds: PropTypes.array,
  }

  render () {
    const { userIds } = this.props

    return (
      <div className={cn('container position-relative pt-4 pb-5', styles.base, this.props.className)}>
        <h1 className='mt-2'>Список пользователей</h1>
        {
          !!userIds.length &&
          <ol className='pl-4'>
            {
              userIds.map(function (userId) {
                return (
                  <UserLi key={userId} userId={userId} className='my-4' />
                )
              })
            }
          </ol>
        }
        {
          !userIds.length &&
          <p>
            Пользователей не найдено. Чтобы создать нового пользователя, нужно нажать кнопку со знаком «плюс» ↘.
          </p>
        }
        <CircleBtn />
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    userIds: state.rrf.userIds,
  }
}

export default connect(mapStateToProps)(Base)
