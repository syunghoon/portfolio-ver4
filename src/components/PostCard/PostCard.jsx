import "./PostCard.css";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post, type }) {
  const navigate = useNavigate();
  const resolvedType = (type ?? post.type ?? "").toLowerCase();

  const isBlog = resolvedType === "blog";

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formattedDate = isBlog ? formatDate(post?.date) : "";

  return (
    <article
      className={`post-card post-card--${resolvedType}`}
      onClick={() => navigate(`/posts/${post.slug}`)}
    >
      {isBlog && (
        <div className="post-card__meta">
          {post.category && (
            <span className="post-card__category">{post.category}</span>
          )}
          {formattedDate && (
            <time className="post-card__date" dateTime={post.date}>
              {formattedDate}
            </time>
          )}
        </div>
      )}

      <div className="post-card__body">
        <h2 className="post-card__title">{post.title}</h2>
        {post.summary && <p className="post-card__summary">{post.summary}</p>}
      </div>

      <img
        src={post.imagesPath + "cover.png"}
        alt={post.title}
        className="post-card__cover"
      />
    </article>
  );
}
