import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import createDebug from 'debug'

import getAll from 'ufSrc/utils/localStorage/getAll'
import configureStore from 'ufSrc/configureStore'
import Base from 'ufSrc/components/Base'

const debug = createDebug('users-form:render') // eslint-disable-line no-unused-vars

const initialState = getAll()

const store = configureStore(initialState)

// DEBUG {{{
window.APP.store = store
// }}}

render(
  React.createElement(
    Provider, { store }, React.createElement(Base)
  ), document.getElementById('app')
)
