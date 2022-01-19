import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPostsByUserId } from 'store/postsSlice'
import { getProfileData } from 'store/userSlice'
import { useAuth } from './auth-hook'

function useProfile() {
  const [profile, setProfile] = useState(null)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { posts } = useSelector((state) => state.posts)
  const { userId, token } = useAuth()
  const { id } = useParams()
  let uid
  useEffect(() => {
    if (id === userId) {
      // own profile , posts
      uid = userId
      setProfile(user)
    } else {
      uid = id
      dispatch(getProfileData({ userId: uid, token })).then((data) => {
        setProfile({ ...data.payload })
      })
    }
    dispatch(getPostsByUserId({ userId: uid, token }))
  }, [user, id])

  return { profile, posts }
}

export default useProfile
