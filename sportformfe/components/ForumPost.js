import Image from 'next/image'
// ForumPost component that shows post image, title, summary, likes and comments
function ForumPost({post}) {
    // TODO: Implement liking and commenting functionality
    return (
        <div className="bg-gray-200 flex flex-col rounded-lg p-8 m-1">
            {/* Post Image */}
            <Image src={post.imageURL} alt={post.title} width="200" height="200"/>

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