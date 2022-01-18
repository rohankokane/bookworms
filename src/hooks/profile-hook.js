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
  let uid = id
  useEffect(() => {
    if (id === 'me') {
      uid = userId
      setProfile(user)
    } else {
      dispatch(getProfileData({ userId: uid, token })).then((data) => {
        setProfile({ ...data.payload })
      })
    }
    dispatch(getPostsByUserId({ userId: uid, token }))
  }, [])

  return { profile, posts }
}

export default useProfile
