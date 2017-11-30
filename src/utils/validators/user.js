function isRequired (value = '') {
  return !!value.trim()
}

export default {
  '': {
    fioLen: function (vals) {
      const { surname = '', name = '', patronymic = '' } = vals
      const fioLen = surname.length + name.length + patronymic.length + 2
      return (fioLen <= 100)
    }
  },
  'surname': {
    isRequired,
  },
  'name': {
    isRequired,
  },
  'patronymic': {
    isRequired,
  },
  'birthday': {
    isRequired,
  },
  'birthmonth': {
    isRequired,
  },
  'birthyear': {
    isRequired,
  },
  'phone': {
    len: function (value = '') {
      value = value.trim()
      if (!value) return true
      if (value === '+7') return true
      return (value.length === 12)
    }
  }
}
