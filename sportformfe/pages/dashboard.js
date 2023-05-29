import React, { useState } from "react";

import { useRouter } from 'next/router';

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import Page from "@/components/common/Page";
import Img from "../public/default.png";
import ForumPost from "@/components/ForumPost";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage, db } from '../firebase/config';
import { doc, setDoc } from "firebase/firestore"


const types = ["Sit Up", "Push Up"];

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateDummyData = (count) => {
  const summaryPoints = [
    // General fitness benefits
    "Increased strength and endurance",
    "Improved flexibility and posture",
    "Burned calories and reduced body fat",
    "Boosted energy levels",
    "Enhanced cardiovascular health",
    "Stronger core and muscles",
    "Reduced stress and improved mood",
    "Better sleep quality",
    "Increased self-confidence",

    // Push Up benefits
    "Targets chest, shoulders, and triceps",
    "Improves upper body strength",
    "Engages core muscles for stability",
    "Can be modified for different fitness levels",
    "Enhances overall muscular definition",

    // Sit Up benefits
    "Targets abdominal muscles",
    "Strengthens core and hip flexors",
    "Improves posture and spinal alignment",
    "Enhances overall core stability",
    "Can be performed without equipment",

    // Cardio benefits
    "Improves heart health and circulation",
    "Burns calories and aids in weight loss",
    "Increases lung capacity and oxygen efficiency",
    "Reduces the risk of chronic diseases",
    "Boosts metabolism for all-day calorie burn",

    // Eating healthy benefits
    "Provides essential nutrients for overall health",
    "Maintains a healthy weight",
    "Supports proper digestion and gut health",
    "Boosts the immune system",
    "Reduces the risk of chronic diseases"
  ];

  const posts = [];

  for (let i = 0; i < count; i++) {
    const type = types[getRandomNumber(0, types.length - 1)];
    const likes = getRandomNumber(0, 100);
    const comments = getRandomNumber(0, 50);

    const shuffledSummaryPoints = summaryPoints.sort(() => 0.5 - Math.random());
    const randomSummary = shuffledSummaryPoints.slice(0, getRandomNumber(1, 3));

    const post = {
      type,
      imageURL: "../public/assets/Images/crying.jpg",
      title: `${type} Post ${i + 1}`,
      summary: randomSummary,
      likes,
      comments
    };

    posts.push(post);
  }

  return posts;
};

const posts = generateDummyData(50);

export default function Dashboard() {
  const auth = getAuth();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const [uploading, setUploading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    router.push("/");
    return <div>Please sign in to continue</div>
  }

  const uploadToDatabase = (url) => {
    let docData = {
        mostRecentUploadURL: url,
        username: "jasondubon"
    }
    const userRef = doc(db, "posts")
    setDoc(userRef, docData, {merge: true}).then(() => {
        console.log("successfully updated DB")
    }).catch((error) => {
        console.log("errrror")
    })
}

  const handleSubmit = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/video", formData);
      console.log(data);
    } catch (error) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };
  
  return (
    <>
      <Page title="Dashboard">
        <main className="profile-page">

        <div class="flex items-center justify-center w-full flex-col">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black" for="file_input">Upload file</label>
            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
              aria-describedby="file_input_help" id="file_input" type="file" accept="video/mp4" onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              setSelectedVideo(URL.createObjectURL(file));
              setSelectedFile(file);
            }
          }} />
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-700" id="file_input_help">MP4 ONLY (16:9)</p>
           <button onClick={handleSubmit} disabled={uploading} > {uploading ? "Uploading.." : "Upload"}</button>
      </div> 

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

          
        </main>
      </Page>
    </>
  );
}

export const getServerSideProps = async () => {
  const props = { dirs: [] };
  try {
    const dirs = await fs.readdir(path.join(process.cwd(), "/public/videos"));
    props.dirs = dirs;
    return { props };
  } catch (error) {
    return { props };
  }
};