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
  async ({ token, tokenExpirationDate, data }) => {
    // login existing logged in user
    if (token) {
      return client(`users/bootstrap`, { token })
        .then((userData) => {
          userData.token = token
          userData.tokenExpirationDate = tokenExpirationDate
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

          const tokenExpirationDate = expirationDate
          saveAuth(userData.userId, userData.token, tokenExpirationDate)
          return {
            ...userData,
            tokenExpirationDate: tokenExpirationDate,
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

    const tokenExpirationDate = expirationDate
    saveAuth(userData.userId, userData.token, tokenExpirationDate)
    return {
      ...userData,
      tokenExpirationDate: tokenExpirationDate,
    }
  })
})
export const getProfileData = createAsyncThunk(
  'user/profileData',
  async ({ userId, token }) => {
    return client(`users/${userId}`, { token })
  }
)

// update with /:id
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, data, token }) => {
    return client(`users/${userId}`, { method: 'PATCH', data, token })
  }
)
export const followProfile = createAsyncThunk(
  'user/followProfile',
  async ({ profileId, userId, isFollowed, token }) => {
    return client(`users/${isFollowed ? 'un' : ''}follow/${profileId}`, {
      token,
    })
  }
)
export const logOut = createAsyncThunk('user/logout', async () => removeAuth())

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    userId: null,
    tokenExpirationDate: null,
    token: '',
    status: null,
    error: null,
    currentProfile: {
      status: null,
      error: null,
    },
  },
  reducers: {
    currentUserProfile: (state) => {
      state.currentProfile = state.user
      state.currentProfile.status = STATUS_SUCCESS
    },
    notLoggedIn: (state) => {
      state.status = STATUS_REJECTED
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = STATUS_PENDING
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = STATUS_SUCCESS
        state.userId = action.payload.userId
        state.token = action.payload.token
        state.user = action.payload
        state.tokenExpirationDate = action.payload.tokenExpirationDate
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = STATUS_REJECTED
        console.log('REJECTED', state, action.error)

        state.error = action.error.message
      })
      .addCase(logOut.fulfilled, (state) => {
        state.token = null
        state.tokenExpirationDate = null
        state.userId = null
        state.user = {}
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
        state.error = action.error.message
      })
      .addCase(getProfileData.pending, (state, action) => {
        console.log(action)
        state.currentProfile = {
          status: STATUS_PENDING,
          error: null,
        }
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        const { payload } = action
        state.currentProfile = payload
        state.currentProfile.status = STATUS_SUCCESS
        state.currentProfile.error = null
      })
      .addCase(getProfileData.rejected, (state, action) => {
        console.log(action)
        state.currentProfile = {
          status: STATUS_REJECTED,
          error: action?.error?.message,
        }
      })
      .addCase(updateUser.pending, (state) => {
        state.currentProfile.status = STATUS_PENDING
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = STATUS_SUCCESS
        state.currentProfile.status = STATUS_SUCCESS
        state.user = { ...state.user, ...action.payload.user }
        state.currentProfile = {
          ...state.currentProfile,
          ...action.payload.user,
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        // state.status = STATUS_REJECTED
        state.currentProfile.status = STATUS_SUCCESS
        // state.currentProfile.status = STATUS_REJECTED
        state.error = action.error.message
      })
      .addCase(followProfile.pending, (state, action) => {
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
          state.currentProfile.followers = [...unfollowedArrProfile]
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

        // state.status = STATUS_PENDING
      })
      .addCase(followProfile.fulfilled, (state, action) => {
        // state.status = STATUS_SUCCESS
      })
      .addCase(followProfile.rejected, (state, action) => {
        const { userId, profileId, isFollowed } = action.meta.arg
        if (isFollowed) {
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
        } else {
          //unfollow
          let unfollowedArrUser = state.user.following.filter(
            (f) => f.id !== profileId
          )
          let unfollowedArrProfile = state.currentProfile.followers.filter(
            (f) => f.id !== userId
          )
          state.user.following = [...unfollowedArrUser]
          state.currentProfile.followers = [...unfollowedArrProfile]
        }

        // state.status = STATUS_REJECTED
        // const { profileId, isFollowed } = action.meta.arg
        // if (!isFollowed) {
        //   //unfollow
        //   state.user.user.following?.filter((f) => f.id !== profileId)
        // } else {
        //   //follow
        //   state.user.user.following.push(profileId)
        // }
        state.error = action.error.message
      })
  },
})
export const { currentUserProfile, notLoggedIn } = userSlice.actions

export default userSlice.reducer
