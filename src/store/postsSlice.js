import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from 'utils/client'

const STATUS_PENDING = 'pending'
const STATUS_SUCCESS = 'success'
const STATUS_REJECTED = 'rejected'

export const getPosts = createAsyncThunk('posts/getPosts', async (token) => {
  // write getBy /:uid
  return client('posts', { token })
})
export const getPostById = createAsyncThunk(
  'posts/getPostById',
  async ({ token, postId }) => {
    return client(`posts/${postId}`, { token })
  }
)
export const getPostsByUserId = createAsyncThunk(
  'posts/getPostsByUserId',
  async ({ token, userId }) => {
    return client(`posts/user/${userId}`, { token })
  }
)
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (promise) => {
    return promise
  }
)
// update with /:id
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (promise) => {
    return promise
  }
)
// update with /:id
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (promise) => {
    return promise
  }
)

export const likePost = createAsyncThunk(
  'posts/likePost',
  async ({ pid, userId, isLiked, token }) => {
    return client(`posts/${isLiked ? 'un' : ''}like/${pid}`, { token })
  }
)
export const bookmarkPost = createAsyncThunk(
  'posts/bookmarkPost',
  async ({ pid, userId, isLiked, token }) => {
    return client(`posts/${isLiked ? 'un' : ''}bookmark/${pid}`, { token })
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.status = STATUS_PENDING
    })
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.status = STATUS_SUCCESS
      state.posts = action.payload.posts
    })
    builder.addCase(getPosts.rejected, (state, action) => {
      state.status = STATUS_REJECTED
      state.error = action.payload.message
    })
    builder.addCase(getPostById.pending, (state) => {
      state.status = STATUS_PENDING
      state.posts = []
    })
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.status = STATUS_SUCCESS
      state.posts = [action.payload.post]
    })
    builder.addCase(getPostById.rejected, (state, action) => {
      state.status = STATUS_REJECTED
      state.error = action.payload.message
    })
    builder.addCase(getPostsByUserId.pending, (state) => {
      state.status = STATUS_PENDING
      state.posts = []
    })
    builder.addCase(getPostsByUserId.fulfilled, (state, action) => {
      state.status = STATUS_SUCCESS
      state.posts = [...action.payload.posts]
    })
    builder.addCase(getPostsByUserId.rejected, (state, action) => {
      state.status = STATUS_REJECTED
      state.error = action.payload.message
    })
    builder.addCase(createPost.pending, (state) => {
      state.status = STATUS_PENDING
    })
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.status = STATUS_SUCCESS
      state.posts.unshift(action.payload.post)
    })
    builder.addCase(createPost.rejected, (state, action) => {
      state.status = STATUS_REJECTED
      state.error = action.payload.message
    })

    builder.addCase(likePost.pending, (state, action) => {
      // console.log('PENDING', { action })
      state.status = STATUS_PENDING
      const { pid, isLiked, userId } = action.meta.arg
      let postIndex = state.posts.findIndex((post) => post.id === pid)
      if (isLiked) {
        //unlike
        const unlikedArray = state.posts[postIndex].likes.filter(
          (id) => id !== userId
        )
        state.posts[postIndex].likes = unlikedArray
      } else {
        // like
        state.posts[postIndex].likes.push(userId)
      }
    })
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.status = STATUS_SUCCESS
      console.log(STATUS_SUCCESS, { action })
    })
    builder.addCase(likePost.rejected, (state, action) => {
      // console.log('REJECTED', action)
      state.status = STATUS_REJECTED
      const { pid, isLiked, userId } = action.meta.arg
      let postIndex = state.posts.findIndex((post) => post.id === pid)
      // ! -> reverting the changes
      if (!isLiked) {
        //unlike
        const unlikedArray = state.posts[postIndex].likes.filter(
          (id) => id !== userId
        )
        state.posts[postIndex].likes = unlikedArray
      } else {
        // like
        state.posts[postIndex].likes.push(userId)
      }
    })
    builder.addCase(bookmarkPost.pending, (state, action) => {
      // console.log('PENDING', { action })
      state.status = STATUS_PENDING
      const { pid, isBookmarked, userId } = action.meta.arg
      let postIndex = state.posts.findIndex((post) => post.id === pid)
      if (isBookmarked) {
        //unbookmark
        const unbookmarkedArray = state.posts[postIndex].bookmarks.filter(
          (id) => id !== userId
        )
        state.posts[postIndex].bookmarks = unbookmarkedArray
      } else {
        // bookmark
        state.posts[postIndex].bookmarks.push(userId)
      }
    })
    builder.addCase(bookmarkPost.fulfilled, (state, action) => {
      state.status = STATUS_SUCCESS
      console.log(STATUS_SUCCESS, { action })
    })
    builder.addCase(bookmarkPost.rejected, (state, action) => {
      console.log('REJECTED', action)
      state.status = STATUS_REJECTED
      const { pid, isBookmarked, userId } = action.meta.arg
      let postIndex = state.posts.findIndex((post) => post.id === pid)
      // ! -> reverting the changes
      if (!isBookmarked) {
        //unbookmark
        const unbookmarkedArray = state.posts[postIndex].bookmarks.filter(
          (id) => id !== userId
        )
        state.posts[postIndex].bookmarks = unbookmarkedArray
      } else {
        // bookmark
        state.posts[postIndex].bookmarks.push(userId)
      }
    })

    builder.addCase(updatePost.pending, (state) => {
      state.status = STATUS_PENDING
    })
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.status = STATUS_SUCCESS
      state.posts = [action.payload.post]
      // let postIndex = state.posts.findIndex(
      //   (post) => post.id === action.payload.post.id
      // )
      // state.posts[postIndex] = { ...action.payload.post }
    })
    builder.addCase(updatePost.rejected, (state, action) => {
      state.status = STATUS_REJECTED
      state.error = action.payload.message
    })
    builder.addCase(deletePost.pending, (state) => {
      state.status = STATUS_PENDING
    })
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.status = STATUS_SUCCESS
      // navigate back (-1)
      // navigate to feed / profile page
    })
    builder.addCase(deletePost.rejected, (state, action) => {
      state.status = STATUS_REJECTED
      state.error = action.payload.message
    })
  },
})

export default postsSlice.reducer
