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
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = STATUS_PENDING
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = STATUS_SUCCESS
        state.posts = action.payload.posts
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = STATUS_REJECTED
        state.error = action.payload.message
      })
      .addCase(getPostById.pending, (state) => {
        state.status = STATUS_PENDING
        state.posts = []
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.status = STATUS_SUCCESS
        state.posts = [action.payload.post]
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.status = STATUS_REJECTED
        state.error = action.payload.message
      })
      .addCase(getPostsByUserId.pending, (state) => {
        state.status = STATUS_PENDING
        state.posts = []
      })
      .addCase(getPostsByUserId.fulfilled, (state, action) => {
        state.status = STATUS_SUCCESS
        state.posts = [...action.payload.posts]
      })
      .addCase(getPostsByUserId.rejected, (state, action) => {
        state.status = STATUS_REJECTED
        state.error = action.payload.message
      })
      .addCase(createPost.pending, (state) => {
        state.status = STATUS_PENDING
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = STATUS_SUCCESS
        state.posts.unshift(action.payload.post)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = STATUS_REJECTED
        state.error = action.payload.message
      })
      .addCase(likePost.pending, (state, action) => {
        //
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
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = STATUS_SUCCESS
        //
      })
      .addCase(likePost.rejected, (state, action) => {
        //
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
      .addCase(bookmarkPost.pending, (state, action) => {
        //
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
      .addCase(bookmarkPost.fulfilled, (state, action) => {
        state.status = STATUS_SUCCESS
      })
      .addCase(bookmarkPost.rejected, (state, action) => {
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

      .addCase(updatePost.pending, (state) => {
        state.status = STATUS_PENDING
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = STATUS_SUCCESS
        state.posts = [action.payload.post]
        // let postIndex = state.posts.findIndex(
        //   (post) => post.id === action.payload.post.id
        // )
        // state.posts[postIndex] = { ...action.payload.post }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = STATUS_REJECTED
        state.error = action.payload.message
      })
      .addCase(deletePost.pending, (state) => {
        state.status = STATUS_PENDING
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = STATUS_SUCCESS
        // navigate back (-1)
        // navigate to feed / profile page
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = STATUS_REJECTED
        state.error = action.payload.message
      })
  },
})

export default postsSlice.reducer