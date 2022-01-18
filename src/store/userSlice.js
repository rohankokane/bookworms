import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
      return client(`users/${userId}`, { token }).then((userData) => {
        userData.token = token
        userData.tokenExpirationDate = tokenExpirationDate
        saveAuth(userData.userId, userData.token, tokenExpirationDate)
        return userData
      })
    } else {
      // login on form submit
      return client('users/login', {
        data,
        method: 'POST',
      }).then((resData) => {
        const { expirationDate, ...userData } = resData
        console.log('login User', resData)
        const tokenExpirationDate =
          expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
        saveAuth(userData.userId, userData.token, tokenExpirationDate)
        return { ...userData, tokenExpirationDate }
      })
    }
  }
)
export const signupUser = createAsyncThunk('user/signup', async (data) => {
  return client('users/signup', {
    data,
    method: 'POST',
  }).then((resData) => {
    const { expirationDate, ...userData } = resData
    console.log('signup User', resData)
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    saveAuth(userData.userId, userData.token, tokenExpirationDate)
    return { ...userData, tokenExpirationDate }
  })
})
export const getProfileData = createAsyncThunk(
  'user/profileData ',
  async ({ userId, token }) => {
    return client(`users/${userId}`, { token })
  }
)
// export const
// export const getUser = createAsyncThunk(
//   'user/getUser',
//   async ({ uid, token }) => {
//     return client(`users/${uid}`, { token })
//   }
// )
// // update with /:id
// export const updateUser = createAsyncThunk(
//   'user/updateUser',
//   async (promise) => {
//     return promise
//   }
// )
// export const followUser = createAsyncThunk(
//   'profile/follow',
//   async ({ pid, userId, isFollowed, token }) => {
//     return client(`user/${isFollowed ? 'un' : ''}like/${pid}`, { token })
//   }
// )

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
    builder.addCase(loginUser.pending, (state) => {
      state.status = STATUS_PENDING
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = STATUS_SUCCESS
      state.userId = action.payload.userId
      state.token = action.payload.token
      state.user = action.payload
      state.tokenExpirationDate = action.payload.tokenExpirationDate
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = STATUS_REJECTED
      state.error = action.payload.message
    })
    builder.addCase(signupUser.pending, (state) => {
      state.status = STATUS_PENDING
    })
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.status = STATUS_SUCCESS
      state.userId = action.payload.userId
      state.token = action.payload.token
      state.user = action.payload
      state.tokenExpirationDate = action.payload.tokenExpirationDate
    })
    builder.addCase(signupUser.rejected, (state, action) => {
      state.status = STATUS_REJECTED
      state.error = action.payload.message
    })
    builder.addCase(getProfileData.fulfilled, (state, { payload }) => {
      state.currentProfile = payload
    })
    builder.addCase(getProfileData.rejected, (state, { payload }) => {
      state.error = payload
    })

    // builder.addCase(getUser.pending, (state) => {
    //   state.status = STATUS_PENDING
    // })
    // builder.addCase(getUser.fulfilled, (state, action) => {
    //   state.status = STATUS_SUCCESS
    //   state.user = action.payload.user

    // })
    // builder.addCase(getUser.rejected, (state, action) => {
    //   state.status = STATUS_REJECTED
    //   state.error = action.payload.message
    // })

    // builder.addCase(likeUser.pending, (state, action) => {
    //   // console.log('PENDING', { action })
    //   state.status = STATUS_PENDING
    //   const { pid, isLiked, userId } = action.meta.arg
    //   let postIndex = state.user.findIndex((post) => post.id === pid)
    //   if (isLiked) {
    //     //unlike
    //     const unlikedArray = state.user[postIndex].likes.filter(
    //       (id) => id !== userId
    //     )
    //     state.user[postIndex].likes = unlikedArray
    //   } else {
    //     // like
    //     state.posts[postIndex].likes.push(userId)
    //   }
    // })
    // builder.addCase(likeUser.fulfilled, (state, action) => {
    //   state.status = STATUS_SUCCESS
    //   console.log(STATUS_SUCCESS, { action })
    // })
    // builder.addCase(likeUser.rejected, (state, action) => {
    //   // console.log('REJECTED', action)
    //   state.status = STATUS_REJECTED
    //   const { pid, isLiked, userId } = action.meta.arg
    //   let postIndex = state.posts.findIndex((post) => post.id === pid)
    //   // ! -> reverting the changes
    //   if (!isLiked) {
    //     //unlike
    //     const unlikedArray = state.posts[postIndex].likes.filter(
    //       (id) => id !== userId
    //     )
    //     state.posts[postIndex].likes = unlikedArray
    //   } else {
    //     // like
    //     state.posts[postIndex].likes.push(userId)
    //   }
    // })
  },
})
export const { logout } = userSlice.actions

export default userSlice.reducer
