import { atom } from 'recoil'

export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    userId: null,
    isAuthenticated: false,
    token: null,
    name: '',
    email: ''
  }
})
