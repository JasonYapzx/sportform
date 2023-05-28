import { useState } from 'react'
import SideBar from '../components/SideBar'
import ForumPost from '../components/ForumPost'
import CatImage from '../public/assets/Images/crying.jpg'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons'

const posts = [
    {
        type: "Push Up",
        imageURL: "../public/assets/Images/crying.jpg",
        title: "Push Up Post 1",
        summary: [
            "Summary point 1",
            "Summary point 2",
            "Summary point 3"
        ],
        likes: 100,
        comments: 50
    },
    {
        type: "Sit Up",
        imageURL: "../public/assets/Images/crying.jpg",
        title: "Sit Up Post 1",
        summary: [
            "Summary point 1",
            "Summary point 2",
            "Summary point 3"
        ],
        likes: 50,
        comments: 20
    }
]

// Home page component
export default function Home() {
    // State for filtered posts, initially all posts are shown
    const [filteredPosts, setFilteredPosts] = useState(posts)

    // Function to filter posts based on filter type
    function filterPosts(filterType) {
        const filtered = posts.filter(post => post.type === filterType)
        setFilteredPosts(filtered)
    }

    return (
        <div className="flex-row lg:flex">
        <div className="flex flex-col w-full p-3 bg-white shadow lg:h-screen lg:w-72">
            <div className="space-y-2">
                <div className="flex items-center">
                    <h2 className="text-xl font-bold text-black">Menu</h2>
                </div>
            
                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1 text-sm text-black">
                        <li className="rounded-sm">
                            <Link
                                href='/profile'
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 fill:currentColor"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <span>Profile</span>
                            </Link>
                        </li>
                        
                        <li className="rounded-sm">
                       
                            <button onClick={() => filterPosts("Push Up")} 
                            className="flex items-center p-2 space-x-3 rounded-md">
                                
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            Push Up</button>
                        </li>
                        <li className="rounded-sm">
                            {/* Button to filter 'Sit Up' posts */}
                            <button 
                            onClick={() => filterPosts("Sit Up")} 
                            className="flex items-center p-2 space-x-3 rounded-md">
                              
                                
                                
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                                Sit Up
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    <div className={styles.container}>
        <main>
            {filteredPosts.map((post, index) => (
                <ForumPost key={index} post={post} />
            ))}
        </main>
    </div>
    </div>
        // </div><div className={styles.container}>
        //     {/* SideBar Component */}
        //     <SideBar filterPosts={filterPosts} />

        //     {/* Main Forum Section */}
        //     <main>
        //         {filteredPosts.map((post, index) => (
        //             <ForumPost key={index} post={post} />
        //         ))}
        //     </main>
        // </div>
    )
}
