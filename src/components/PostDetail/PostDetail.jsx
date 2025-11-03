import "./PostDetail.css";

function PostDetail({ post }) {
  return (
    // post.type에 따라 다른 레이아웃을 보여주는 것도 가능할 듯.

    <article className="post-detail">
      <h1 className="post-detail__title">{post.title}</h1>
      <p className="post-detail__date">{post.date}</p>
      <div
        className="post-detail__content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}

export default PostDetail;
