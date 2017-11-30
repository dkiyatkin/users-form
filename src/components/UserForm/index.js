import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Control } from 'react-redux-form'
import get from 'lodash.get'

import Errors from 'ufSrc/components/common/Errors'
import userValidators from 'ufSrc/utils/validators/user'
import * as userActions from 'ufSrc/actions/user'
import Birthdate from './Birthdate'
import Phone from './Phone'
import Buttons from './Buttons'
import validClasses from 'ufSrc/utils/validClasses'

import styles from 'ufSrc/styles/userForm.scss'

class UserForm extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    userId: PropTypes.string,
    userProps: PropTypes.object,
    isDisable: PropTypes.bool,
    onSubmit: PropTypes.func,
  }

  render () {
    const { userId, userProps, isDisable, onSubmit } = this.props
    const isFioLenValid = get(userProps.$form, ['validity', 'fioLen'])
    const isFioLenErrShow =
      get(userProps.surname, ['validity', 'isRequired']) &&
      get(userProps.name, ['validity', 'isRequired']) &&
      get(userProps.patronymic, ['validity', 'isRequired'])
    const fioClass = cn({'is-invalid': !userProps.$form.pristine && isFioLenErrShow && !isFioLenValid})

    return (
      <Form model={`rrf.users.${userId}`} validators={userValidators} onSubmit={onSubmit} className={cn(styles.userForm, this.props.className)}>
        <div className='form-group'>
          <label>
            Фамилия
            <Control.text
              model='.surname' disabled={isDisable} autoFocus
              className={cn('form-control', validClasses(userProps.surname), fioClass)}
            />
            <Errors
              model={`.surname`}
              messages={{
                isRequired: 'Обязательно для заполнения'
              }}
            />
            {
              isFioLenErrShow &&
              <Errors
                model={`rrf.users.${userId}`}
                messages={{
                  fioLen: 'ФИО должно быть не больше 100 символов'
                }}
              />
            }
          </label>
          {' '}
          <label>
            Имя
            <Control.text model='.name' disabled={isDisable} className={cn('form-control', validClasses(userProps.name), fioClass)} />
            <Errors
              model={`.name`}
              messages={{
                isRequired: 'Обязательно для заполнения'
              }}
            />
          </label>
          {' '}
          <label>
            Отчество
            <Control.text model='.patronymic' disabled={isDisable} className={cn('form-control', validClasses(userProps.patronymic), fioClass)} />
            <Errors
              model={`.patronymic`}
              messages={{
                isRequired: 'Обязательно для заполнения'
              }}
            />
          </label>
        </div>

        <Birthdate userId={userId} className='form-group' />

        <Phone userId={userId} className='form-group' />

        <div className='form-group'>
          <label>
            Город
            <Control.text model='.city' disabled={isDisable} className='form-control' />
          </label>
          {' '}
          <label>
            Адрес
            <Control.text model='.address' disabled={isDisable} className='form-control' />
          </label>
        </div>

        <Buttons userId={userId} className='form-group mb-0' />
      </Form>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const user = state.rrf.users[ownProps.userId]
  const userProps = state.rrf.forms.users[ownProps.userId]
  const { isEdit } = user

  return {
    userProps,
    isDisable: !isEdit,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  const userId = ownProps.userId

  return {
    onSubmit: function () {
      return dispatch(userActions.onSubmit(userId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
