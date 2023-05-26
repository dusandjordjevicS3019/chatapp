import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [] },
  reducers: {
    addUsers(state, action) {
      state.users = [...action.payload]
    },
  },
})

export const usersActions = usersSlice.actions
export default usersSlice
