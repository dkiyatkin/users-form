import getOne from 'ufSrc/utils/localStorage/getOne'

export default function getAll () {
  const users = {}
  const path = 'rrf.users.'
  const pathLen = path.length

  Object.keys(localStorage).forEach(function (key) {
    if (key.startsWith('rrf.users.')) {
      const userId = key.slice(pathLen)
      users[userId] = getOne(key)
    }
  })

  let userIds = localStorage.getItem('rrf.userIds')
  if (userIds) {
    userIds = JSON.parse(userIds)
  } else {
    userIds = []
  }

  return {
    'rrf': {
      users: users,
      userIds: userIds,
    }
  }

  // return {
  //   'rrf': {
  //     'users': {
  //       '1': {
  //         surname: 'Иванов',
  //         name: 'Иван',
  //         patronymic: 'Иванович',
  //         birthday: '22',
  //         birthmonth: '12',
  //         birthyear: '1988',
  //         address: 'ул. Льва Толстого, 16',
  //         city: 'Москва',
  //         phone: '+79051111111'
  //       }
  //     },
  //     userIds: [
  //       '1',
  //     ],
  //   }
  // }
}
