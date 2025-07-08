import React, { useState, useEffect } from 'react';
import Input from './Input';
import databaseService from '../appwrite/config';
import { Query } from 'appwrite';
import { Link } from 'react-router-dom';

function Searchbar({ setSearchbarStatus }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFilteredPosts = async () => {
        setLoading(true);
        try {
            const queries = [Query.equal('status', 'active')];
            if (searchTerm.trim() !== '') {
                queries.push(Query.contains('title', searchTerm));
            }

            const result = await databaseService.getPosts(queries);
            if (result && result.documents) {
                setFilteredPosts(result.documents);
            }
        } catch (error) {
            console.error('Search Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (searchTerm.trim() !== '') {
                fetchFilteredPosts();
            } else {
                setFilteredPosts([]);
            }
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchTerm]);

    return (
        <div className="w-full px-6 py-4">
            <div className="flex flex-col gap-4">
                {/* Label */}
                <label htmlFor="search" className="text-sm text-gray-500 font-medium">
                    Type a keyword to find a post
                </label>

                {/* Search input */}
                <input
                    id="search"
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                />

                {/* Results */}
                {searchTerm.trim() !== '' && (
                    <div className="mt-4">
                        {loading ? (
                            <p className="text-gray-400">Searching...</p>
                        ) : filteredPosts.length === 0 ? (
                            <p className="text-gray-400">No matching posts found.</p>
                        ) : (
                            <div className="space-y-4">
                                {filteredPosts.map((post) => (
                                    <div
                                        key={post.$id}
                                        className="p-4 border rounded-xl hover:shadow transition"
                                    >
                                        <Link
                                            to={`/post/${post.$id}`}
                                            onClick={() => {
                                                setSearchbarStatus(false);
                                                setSearchTerm('');
                                            }}
                                            className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                                        >
                                            {post.title}
                                        </Link>

                                        <p className="text-sm text-gray-600 mt-1">
                                            {post.content.slice(0, 100)}...
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Searchbar;
