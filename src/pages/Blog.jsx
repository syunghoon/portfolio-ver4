import { useSearchParams } from "react-router-dom";

import { CATEGORY, SORT } from "../data/category.js";
import { getFilteredAndSortedPosts } from "../api/PostApi.js";

import ContentToolbar from "../components/ContentToolbar/ContentToolbar.jsx";
import PostCard from "../components/PostCard/PostCard.jsx";

function Blog() {
  const TYPE = "Blog";
  const CATEGORY_LIST = ["All", ...CATEGORY[TYPE]];

  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get("category") || "All";
  const currentSort = searchParams.get("sortBy") || SORT.NEWEST.order;

  const postList = getFilteredAndSortedPosts(
    TYPE,
    currentCategory,
    currentSort
  );

  const handleCategoryChange = (category) => {
    setSearchParams((prev) => {
      prev.set("category", category);
      return prev;
    });
  };

  const handleSortOrderChange = (e) => {
    setSearchParams((prev) => {
      prev.set("sortBy", e.target.value);
      return prev;
    });
  };

  return (
    <section className="page-section">
      <h1>{TYPE}</h1>

      <ContentToolbar
        categories={CATEGORY_LIST}
        currentCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
        sortOptions={SORT}
        currentSort={currentSort}
        onSortChange={handleSortOrderChange}
      />

      <div className={`post-card-list post-card-list--${TYPE.toLowerCase()}`}>
        {postList.map((post) => (
          <PostCard key={post.slug} post={post} type={TYPE} />
        ))}
      </div>
    </section>
  );
}

export default Blog;
