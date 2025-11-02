import "./PostCard.css";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  return (
    <>
      <article
        key={post.slug}
        className="card"
        onClick={() => navigate(`/post/${post.slug}`)}
      >
        <img
          src={post.imagesPath + "cover.png"}
          alt={post.title}
          className="card-cover"
        />
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-summary">{post.summary}</p>
        </div>
      </article>
    </>
  );
}
