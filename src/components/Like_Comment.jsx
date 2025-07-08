import React, { useEffect, useState } from 'react';
import authService from '../appwrite/auth';
import likeService from '../appwrite/likes'
import commentService from '../appwrite/comment';
function Like_Comment({ postId }) {
    const [likeAppear, setLikeAppear] = useState(false);
    const [user, setUser] = useState(null)
    const [likeCount, setLikeCount] = useState(0)
    const [likeId, setLikeId] = useState(null)

    const fetchLikes = async () => {
        try {
            const like = await likeService.listAllLikes(postId)
            setLikeCount(like.total)

            if (user) {
                const userLike = await like.documents.find((file) => file.userId === user.$id)
                if (userLike) {
                    setLikeAppear(true)
                    setLikeId(userLike.$id)
                }
            } else {
                setLikeAppear(false)
                setLikeId(null)
            }
        } catch (error) {
            console.log("Error in fetching likes", error)
        }
    }

    const toggleLike = async () => {
        if (!user) return;
        try {
            const res = await likeService.toggleLikes({
                postId,
                userId: user.$id,
                existingLikeId: likeId,
            })
            setLikeAppear(res.likeAppear);
            setLikeId(res.likeId || null);
            setLikeCount((prev) => (res.likeAppear ? prev + 1 : prev - 1));
        } catch (error) {
            console.log("Toggle Like Fail ", error)
        }
    }

    useEffect(() => {
        if (user) {
            fetchLikes()
        }
    }, [postId, user])

    useEffect(() => {
        const getUser = async () => {
            const userData = await authService.getCurrentUser();
            setUser(userData);
        };
        getUser();
    }, []);

    //Comment Section

    const [commentCount, setCommentCount] = useState(0);
    const [content, setContent] = useState("")
    const [commentState, setCommentState] = useState(false)
    const [comments, setComments] = useState([])
    const fetchComments = async () => {
        const res = await commentService.listAllComments(postId);
        setCommentCount(res.total);
        setComments(res.documents);
    };

    useEffect(() => {
        setContent('');
        setCommentState(false);
        fetchComments();
    }, [postId]);

    const submitComment = async () => {
        if (!user || !content.trim()) return
        try {
            const res = await commentService.createComment({
                postId,
                userId: user.$id,
                content: content.trim(),
            })
            setContent('')
            setCommentCount(prev => prev + 1)
            setCommentState(prev => !prev)
        } catch (error) {
            console.log("Error in adding comments : ", error)
        }
    }

    return (
        <>
            <div className="flex gap-3">
                <div className="flex items-center gap-1">
                    <button className="cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleLike()
                        }}
                    >

                        <svg
                            className={`w-6 h-6 x1lliihq x1n2onr6 xxk16z8 ${likeAppear ? 'fill-red-500 stroke-0' : 'fill-gray-400'}`}
                            aria-label="Unlike"
                            fill="white"
                            height="24"
                            role="img"
                            viewBox="0 0 48 48"
                            width="24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <title>{likeAppear ? "like" : "unlike"}</title>
                            <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" />
                        </svg>

                    </button>
                    <span className="text-sm text-gray-600">{likeCount}</span>
                </div>

                <div className="flex items-center gap-1">
                    <button className="cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setCommentState(prev => !prev)
                        }}
                    >
                        <svg
                            aria-label="Comment"
                            className={`x1lliihq x1n2onr6 x5n08af ${commentCount <= 0 ? 'fill-gray-400' : 'fill-blue-500'}  stroke-2`}
                            fill="currentColor"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                        >
                            <title>Comment</title>
                            <path
                                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"

                                strokeLinejoin="round"
                                strokeWidth="2"
                            />
                        </svg>
                    </button>
                    <span className="text-sm text-gray-600">{commentCount}</span>
                </div>
            </div>

            {commentState && (
                <div
                    className="mt-3 w-full flex-col justify-between"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <div className="mt-4 space-y-3">
                        {comments.map((comment) => (
                            <div key={comment.$id} className="p-3 bg-gray-100 rounded shadow-sm">
                                <p className="text-sm text-gray-800">{comment.content}</p>
                                <p className="text-xs text-gray-500">by {user.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center w-full max-w-xl border border-gray-300 rounded-lg overflow-hidden">
                        <input
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your comment here..."
                            className="flex-grow h-10 px-4 bg-white focus:outline-none"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                submitComment();
                            }}
                            className="h-10 px-3 bg-white text-blue-500 hover:bg-gray-300 hover:underline hover:text-blue-800 cursor-pointer transition-colors"
                        >
                            Post
                        </button>
                    </div>

                </div>
            )}

        </>
    );
}

export default Like_Comment;
