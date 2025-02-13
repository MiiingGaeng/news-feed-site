import Like from "./Like"

const FeedCard = ({ post }) => {
  return (
    <li>
      <div>
        <img src={post.img_url} />

        <h2>
          {post.title}
          <Like />
        </h2>
      </div>

      <p>{post.content}</p>
    </li>
  )
}

export default FeedCard