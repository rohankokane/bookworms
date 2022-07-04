import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { removeAuth, saveAuth } from 'utils/auth'
import { client } from 'utils/client'
import {
  STATUS_PENDING,
  STATUS_REJECTED,
  STATUS_SUCCESS,
} from 'utils/constants'

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ userId, token, tokenExpirationDate, data }) => {
    // login existing logged in user
    if (userId && token) {
      return client(`users/${userId}`, { token })
        .then((userData) => {
          userData.token = token
          userData.tokenExpirationDate = tokenExpirationDate.toISOString()
          saveAuth(userData.userId, userData.token, tokenExpirationDate)
          return userData
        })
        .catch((e) => {
          throw new Error(e)
        })
    } else {
      // login on form submit
      return client('users/login', {
        data,
        method: 'POST',
      })
        .then((resData) => {
          const { expirationDate, ...userData } = resData

          const tokenExpirationDate =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
          saveAuth(userData.userId, userData.token, tokenExpirationDate)
          return {
            ...userData,
            tokenExpirationDate: tokenExpirationDate.toISOString(),
          }
        })
        .catch((e) => {
          console.log(e)
          throw new Error(e)
        })
    }
  }
)
export const signupUser = createAsyncThunk('user/signup', async (data) => {
  // signup
  return client('users/signup', {
    data,
    method: 'POST',
  }).then((resData) => {
    const { expirationDate, ...userData } = resData

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    saveAuth(userData.userId, userData.token, tokenExpirationDate)
    return {
      ...userData,
      tokenExpirationDate: tokenExpirationDate.toISOString(),
    }
  })
})
export const getProfileData = createAsyncThunk(
  'user/profileData ',
  async ({ userId, token }) => {
    return client(`users/${userId}`, { token })
  }
)

// update with /:id
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (promise) => {
    return promise
  }
)
export const followProfile = createAsyncThunk(
  'user/followProfile',
  async ({ profileId, userId, isFollowed, token }, thunkApi) => {
    return client(`users/${isFollowed ? 'un' : ''}follow/${profileId}`, {
      token,
    })
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    userId: null,
    tokenExpirationDate: null,
    token: '',
    status: null,
    error: null,
    currentProfile: {},
  },
  reducers: {
    logout: (state) => {
      removeAuth()
      state.token = null
      state.tokenExpirationDate = null
      state.userId = null
      state.user = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        console.log('PENDING', state)
        state.status = STATUS_PENDING
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('FULFILLED', state, action)
        state.status = STATUS_SUCCESS
        state.userId = action.payload.userId
        state.token = action.payload.token
        state.user = action.payload
        state.tokenExpirationDate = action.payload.tokenExpirationDate
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = STATUS_REJECTED
        console.log('REJECTED', state, action.error.message)

        state.error = action.error.message
      })
      .addCase(signupUser.pending, (state) => {
        state.status = STATUS_PENDING
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = STATUS_SUCCESS
        state.userId = action.payload.userId
        state.token = action.payload.token
        state.user = action.payload
        state.tokenExpirationDate = action.payload.tokenExpirationDate
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = STATUS_REJECTED
        state.error = action.payload.message
      })
      .addCase(getProfileData.fulfilled, (state, { payload }) => {
        state.currentProfile = payload
      })
      .addCase(getProfileData.rejected, (state, { payload }) => {
        state.error = payload
      })

      .addCase(updateUser.pending, (state) => {
        state.status = STATUS_PENDING
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = STATUS_SUCCESS
        state.user = { ...state.user, ...action.payload.user }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = STATUS_REJECTED
        state.error = action.payload.message
      })
      .addCase(followProfile.pending, (state, action) => {
        state.status = STATUS_PENDING
      })
      .addCase(followProfile.fulfilled, (state, action) => {
        const { userId, profileId, isFollowed } = action.meta.arg

        if (isFollowed) {
          //unfollow
          let unfollowedArrUser = state.user.following.filter(
            (f) => f.id !== profileId
          )
          let unfollowedArrProfile = state.currentProfile.followers.filter(
            (f) => f.id !== userId
          )
          state.user.following = [...unfollowedArrUser]
          state.currentProfile.following = [...unfollowedArrProfile]
        } else {
          //follow
          state.user.following.push({
            id: profileId,
            fullname: state.currentProfile.fullname,
            username: state.currentProfile.username,
          })
          state.currentProfile.followers.push({
            id: userId,
            fullname: state.user.fullname,
            username: state.user.username,
          })
        }
        state.status = STATUS_SUCCESS
      })
      .addCase(followProfile.rejected, (state, action) => {
        state.status = STATUS_REJECTED
        // const { profileId, isFollowed } = action.meta.arg
        // if (!isFollowed) {
        //   //unfollow
        //   state.user.user.following?.filter((f) => f.id !== profileId)
        // } else {
        //   //follow
        //   state.user.user.following.push(profileId)
        // }
        // state.error = action.payload.message
      })
  },
})
export const { logout } = userSlice.actions

export default userSlice.reducer
