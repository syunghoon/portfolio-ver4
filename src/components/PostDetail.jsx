import "../styles/detail.css";

function PostDetail({ post }) {
  return (
    <article className="post-detail">
      <h1>{post.title}</h1>
      <p className="post-date">{post.date}</p>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}

export default PostDetail;
