import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Control } from 'react-redux-form'
import range from 'lodash.range'
import get from 'lodash.get'

import Errors from 'ufSrc/components/common/Errors'
import * as userActions from 'ufSrc/actions/user'
import getMonthsLocalizedArray from 'ufSrc/utils/getMonthsLocalizedArray'
import getLastMonthDay from 'ufSrc/utils/getLastMonthDay'
import validClasses from 'ufSrc/utils/validClasses'

import styles from 'ufSrc/styles/empty.scss'

const monthsLocalizedArray = getMonthsLocalizedArray('ru')

class Birthdate extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    userId: PropTypes.string,
    userProps: PropTypes.object,
    isDisable: PropTypes.bool,
    birthday: PropTypes.string,
    birthmonth: PropTypes.string,
    birthyear: PropTypes.string,
    formChange: PropTypes.func,
  }

  componentWillReceiveProps (nextProps) {
    const { userId, formChange } = this.props
    const { birthday, birthmonth, birthyear } = nextProps

    if (birthday) {
      const lastMonthDay = getLastMonthDay(birthmonth, birthyear)
      if (birthday > lastMonthDay) {
        formChange({model: `rrf.users.${userId}.birthday`, value: ''})
      }
    }
  }

  render () {
    const { userProps, isDisable, birthmonth, birthyear } = this.props
    const lastMonthDay = getLastMonthDay(birthmonth, birthyear)

    return (
      <div className={cn(styles.empty, this.props.className)}>
        <label>
          День
          <Control.select model='.birthday' disabled={isDisable} className={cn('form-control', validClasses(userProps.birthday))}>
            <option value=''> &mdash; </option>
            {
              range(1, lastMonthDay + 1).map(function (day) {
                return (
                  <option key={day} value={day}>{day}</option>
                )
              })
            }
          </Control.select>
          <Errors
            model={`.birthday`}
            messages={{
              isRequired: 'Обязательно для заполнения'
            }}
          />
        </label>
        {' '}
        <label>
          Месяц
          <Control.select model='.birthmonth' disabled={isDisable} className={cn('form-control', validClasses(userProps.birthmonth))}>
            <option value=''> &mdash; </option>
            {
              range(1, 13).map(function (month) {
                return (
                  <option key={month} value={month}>{monthsLocalizedArray[month - 1]}</option>
                )
              })
            }
          </Control.select>
          {
            get(userProps.birthday, ['validity', 'isRequired']) &&
            <Errors
              model={`.birthmonth`}
              messages={{
                isRequired: 'Обязательно для заполнения'
              }}
            />
          }
        </label>
        {' '}
        <label>
          Год
          <Control.select model='.birthyear' disabled={isDisable} className={cn('form-control', validClasses(userProps.birthyear))}>
            <option value=''> &mdash; </option>
            {
              range(1930, 2018).map(function (year) {
                return (
                  <option key={year} value={year}>{year}</option>
                )
              })
            }
          </Control.select>
          {
            get(userProps.birthday, ['validity', 'isRequired']) &&
            get(userProps.birthmonth, ['validity', 'isRequired']) &&
            <Errors
              model={`.birthyear`}
              messages={{
                isRequired: 'Обязательно для заполнения'
              }}
            />
          }
        </label>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const user = state.rrf.users[ownProps.userId]
  const userProps = state.rrf.forms.users[ownProps.userId]
  const { isEdit, birthday, birthmonth, birthyear } = user

  return {
    userProps,
    birthday,
    birthmonth,
    birthyear,
    isDisable: !isEdit,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    formChange: function (values) {
      return dispatch(userActions.formChange(values))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Birthdate)
