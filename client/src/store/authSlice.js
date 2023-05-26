import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false, userInfo: {} },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.userInfo = action.payload
      localStorage.setItem('userData', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.userInfo = {}
      localStorage.clear()
    },
  },
})

export const authActions = authSlice.actions
export default authSlice
