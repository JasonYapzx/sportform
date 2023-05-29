// ForumPost component that shows post image, title, summary, likes and comments
function ForumPost({post}) {
    // TODO: Implement liking and commenting functionality
    return (
        <div className="bg-gray-200 flex flex-col rounded-lg p-8 m-1 w-[15vw]">
            {/* Post Image */}
            <img src={post.imageURL} alt={post.title}/>

            {/* Post Title */}
            <h2>{post.title}</h2>

            {/* Post Summary */}
            <ul>
                {post.summary.map((point, index) => <li key={index}>{point}</li>)}
            </ul>

            {/* Likes and Comments */}
            <p>{post.likes} likes</p>
            <p>{post.comments} comments</p>
        </div>
    )
}

export default ForumPost