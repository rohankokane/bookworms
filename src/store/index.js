import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postsSlice'
import userReducer from './userSlice'
const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
})

export default store
