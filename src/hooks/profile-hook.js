// import { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { getPostsByUserId } from 'store/postsSlice'
// import { currentUserProfile, getProfileData } from 'store/userSlice'
// import { useAuth } from './auth-hook'

// function useProfile() {
//   const dispatch = useDispatch()
//   const { user, currentProfile } = useSelector((state) => state.user)
//   const { posts } = useSelector((state) => state.posts)
//   const { userId, token } = useAuth()

//   const { id } = useParams()
//   let uid
//   if(user.id === id) dispatch(currentUserProfile())
//   else {
//     dispatch(getProfileData({ userId: uid, token }))

//   }
//   dispatch(getPostsByUserId({ userId: uid, token }))

//   // useEffect(() => {
//   //   if (id === userId) {
//   //     // own profile , posts
//   //     uid = userId
//   //     // setProfile(user)
//   //   } else {
//   //     uid = id

//   //     //   // setProfile({ ...data.payload })
//   //     // })
//   //   }
//   //   dispatch(getPostsByUserId({ userId: uid, token }))
//   // }, [user, id])

//   return { profile, posts }
// }

// export default useProfile
