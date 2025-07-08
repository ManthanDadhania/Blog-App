import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import Like_Comment from './Like_Comment'
function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFileURL(featuredImage)} alt={title}
                        className='rounded-xl'
                    />
                </div>
            
                    <h2
                        className='text-xl font-bold text-center'
                    >{title}</h2>
                    <Like_Comment postId={$id}/>
           
            </div>

        </Link>
    )
}

export default PostCard
