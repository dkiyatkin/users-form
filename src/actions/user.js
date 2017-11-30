import { actions as formActions } from 'react-redux-form'
import omit from 'lodash.omit'

import updateOne from 'ufSrc/utils/localStorage/updateOne'
import removeOne from 'ufSrc/utils/localStorage/removeOne'
import getOne from 'ufSrc/utils/localStorage/getOne'

export function onSubmit (userId) {
  const model = `rrf.users.${userId}`

  return function (dispatch, getState) {
    dispatch(formActions.change(`${model}.isEdit`, false))
    const state = getState()
    const user = state.rrf.users[userId]
    if (user.isNew) { // fold new user
      dispatch(formActions.change(`${model}.isOpen`, false))
    }
    dispatch(formActions.change(`${model}.isNew`, false))
    updateOne(model, omit(user, ['isEdit', 'isOpen', 'isNew']))
    updateOne('rrf.userIds', state.rrf.userIds) // for new user or change order
  }
}

export function onSubmitClick (userId) {
  const model = `rrf.users.${userId}`

  return function (dispatch, getState) {
    dispatch(formActions.setDirty(model))
    dispatch(formActions.submit(model))
  }
}

export function onEditClick (userId) {
  const model = `rrf.users.${userId}`
  return formActions.change(`${model}.isEdit`, true, {silent: true})
}

export function onFoldClick (userId) {
  const model = `rrf.users.${userId}`

  return function (dispatch, getState) {
    dispatch(formActions.change(model, getOne(model), {silent: true}))
    dispatch(formActions.setPristine(model))
  }
}

export function onToggleOpenClick (userId) {
  const model = `rrf.users.${userId}`

  return function (dispatch, getState) {
    const state = getState()
    const user = state.rrf.users[userId]
    if (user.isNew) return dispatch(formActions.change(`${model}.isOpen`, true, {silent: true})) // always open for new user
    const isOpen = user.isOpen
    dispatch(onFoldClick(userId))
    dispatch(formActions.change(`${model}.isOpen`, !isOpen, {silent: true}))
  }
}

export function onCancelClick (userId) {
  const model = `rrf.users.${userId}`

  return function (dispatch, getState) {
    const state = getState()
    const user = state.rrf.users[userId]
    if (user.isNew) return dispatch(_deleteUser(userId))
    dispatch(onFoldClick(userId))
    dispatch(formActions.change(`${model}.isOpen`, true, {silent: true}))
  }
}

export function formChange (values) {
  return formActions.change(values.model, values.value)
}

function _deleteUser (userId) {
  return function (dispatch, getState) {
    const state = getState()
    const index = state.rrf.userIds.findIndex((id) => id === userId)
    dispatch(formActions.remove('rrf.userIds', index))
    dispatch(formActions.omit('rrf.users', userId))
  }
}

export function onDeleteClick (userId) {
  const model = `rrf.users.${userId}`

  return function (dispatch, getState) {
    dispatch(_deleteUser(userId))
    updateOne('rrf.userIds', getState().rrf.userIds)
    removeOne(model)
  }
}

export function onAddClick () {
  return function (dispatch, getState) {
    const state = getState()
    const userIds = state.rrf.userIds
    const maxUserId = userIds.length ? Math.max.apply(null, userIds) : -1
    const userId = (maxUserId + 1).toString()
    const model = `rrf.users.${userId}`
    dispatch(formActions.push('rrf.userIds', userId))
    dispatch(formActions.change(model, {
      isEdit: true,
      isOpen: true,
      isNew: true,
    }))
    setTimeout(function () {
      window.scrollTo(0, document.body.scrollHeight)
    }, 0)
  }
}
