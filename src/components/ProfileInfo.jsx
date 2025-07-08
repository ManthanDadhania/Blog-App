import React, { useEffect, useState } from 'react'
import authService from '../appwrite/auth'
import databaseService from '../appwrite/config'
import PostCard from './PostCard'
import { Query } from 'appwrite'
function ProfileInfo() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchDetails() {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData)

        const postDetails = await databaseService.getPosts([Query.equal("userId", userData.$id)])
        setPosts(postDetails.documents)

      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails()
  }, [])
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600"></div>
      </div>
    );
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 bg-gray-50 rounded-xl shadow-md">
      <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-md border border-gray-300 p-6 flex items-center gap-5 mb-10">
        {/* Avatar Fallback */}
        <div className="w-16 h-16 rounded-full bg-gray-400 text-white flex items-center justify-center text-2xl font-bold shadow-inner">
          {user.name?.charAt(0)}
        </div>

        {/* User Details */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-800 tracking-wide leading-tight">
            {user.name}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {user.email}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
          Your Posts ({posts.length})
        </h2>

        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            You haven’t written any posts yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {posts.map((post) => (
              <div key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileInfo
