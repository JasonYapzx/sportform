import React, { useState } from "react";

import { useRouter } from 'next/router';

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import Page from "@/components/common/Page";
import Img from "../public/default.png";
import ForumPost from "@/components/ForumPost";

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

export default function Dashboard() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedOption, setSelectedOption] = useState(false);

  // Function to filter posts based on filter type
  function filterPosts(filterType) {
      const filtered = posts.filter(post => post.type === filterType)
      setFilteredPosts(filtered)
  }

  const handleMouseEnter = () => {
    setSelectedOption(true);
  };

  const handleMouseLeave = () => {
    setSelectedOption(false);
  };

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    router.push("/");
    return <div>Please sign in to continue</div>
  }

  console.log(user);
  
  return (
    <>
      <Page title={"Profile"}>
        <section className="flex flex-col text-start p-12">
          <div className="flex align-center">
            <div className="items-center px-8">
              <img className="flex items-center justify-start rounded-full" src={user.photoURL || Img} alt="avatar" />
              <div className="overlay">
              </div>
            </div>
            <div className="flex flex-col py-2 justify-start">
              <h1 className="text-3xl">{user.displayName}</h1>
              <p>{user.email}</p>
              <hr />
              <small>Joined on: {user.metadata.creationTime}</small>
            </div>
          </div>
        </section>

        <div className="flex inline-block text-left">
          <div>
            <button onMouseEnter={handleMouseEnter} onClick={() => setSelectedOption((prevOption) => !prevOption)} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
              Options
              <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          { selectedOption ? 
            <div onMouseLeave={handleMouseLeave} className="absolute z-10 mt-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div className="py-1" role="none">
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0" onClick={() => filterPosts("Push Up")}>Push-Up</a>
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0" onClick={() => filterPosts("Sit Up")}>Sit-Up</a>
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0" onClick={() => setFilteredPosts(posts)}>All</a>
              </div>
            </div> : <></>
          }
        </div>

        <div className="flex flex-wrap">
          <main className="flex flex-row flex-wrap">
              {filteredPosts.map((post, index) => (
                  <ForumPost key={index} post={post} />
              ))}
          </main>
        </div>
      </Page>
    </>
  );
}