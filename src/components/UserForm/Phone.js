import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InputMask from 'react-input-mask'

import Errors from 'ufSrc/components/common/Errors'
import * as userActions from 'ufSrc/actions/user'
import validClasses from 'ufSrc/utils/validClasses'

import styles from 'ufSrc/styles/empty.scss'

class Phone extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    userId: PropTypes.string,
    phone: PropTypes.string,
    phoneProps: PropTypes.object,
    isDisable: PropTypes.bool,
    formChange: PropTypes.func,
  }

  render () {
    const { userId, phone, phoneProps, isDisable, formChange } = this.props

    return (
      <div className={cn(styles.empty, this.props.className)}>
        <label>
          Телефон
          <InputMask
            mask='+7 (999) 999-99-99' disabled={isDisable} value={phone}
            onChange={function (event) {
              const value = event.target.value.replace(/[^0-9+]/g, '')
              if (phoneProps.pristine) {
                if (value === '+7') return
                if (!value) return
              }
              formChange({model: `rrf.users.${userId}.phone`, value: value})
            }}
            className={cn('form-control', phone ? validClasses(phoneProps) : '')}
          />
          <Errors
            model={`rrf.users.${userId}.phone`}
            messages={{
              len: 'Неправильно заполнен телефон'
            }}
          />
        </label>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const user = state.rrf.users[ownProps.userId]
  const phoneProps = state.rrf.forms.users[ownProps.userId].phone
  const { isEdit, phone } = user

  return {
    phone,
    phoneProps,
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

export default connect(mapStateToProps, mapDispatchToProps)(Phone)
