import { useRouter } from 'next/router'

// Sidebar component that contains Logo, buttons to filter posts and a button to go to profile page
function SideBar({filterPosts}) {
    const router = useRouter()

    return (
        <div>
           
            {/* Button to filter 'Push Up' posts */}
            <button onClick={() => filterPosts("Push Up")}>Push Up</button>

            {/* Button to filter 'Sit Up' posts */}
            <button onClick={() => filterPosts("Sit Up")}>Sit Up</button>

            {/* Button to go to profile page
            <button onClick={() => router.push('/profile')}>Profile</button> */}
        </div>
    )
}

export default SideBar
