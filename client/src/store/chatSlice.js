import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    groupName: '',
    participants: [],
    roomId: '',
    chatIsActive: false,
    connection: {},
  },
  reducers: {
    addChat(state, action) {
      state.participants = []
      state.participants = [...action.payload.participants]
      state.roomId = action.payload.roomId
      state.groupName = action.payload.groupName
    },
    clearChat(state) {
      state.participants = []
      state.groupName = ''
      state.roomId = ''
      state.chatIsActive = false
    },
    updateAllChats(state, action) {
      console.log(action.payload)
      state.currentChats = [...state.currentChats, action.payload]
    },
    setChatIsActive(state, action) {
      state.chatIsActive = action.payload
    },
  },
})

export const chatActions = chatSlice.actions
export default chatSlice
