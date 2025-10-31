import { useSearchParams } from "react-router";

import { CATEGORY, SORT } from "../data/category.js";
import { getFilteredAndSortedPosts } from "../api/PostApi.js";

import PostCard from "../components/PostCard.jsx";

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

  const handleCategoryChange = (e) => {
    setSearchParams((prev) => {
      prev.set("category", e.target.textContent);
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
    <main>
      <h1>Blog</h1>

      {/* 카테고리 리스트 : 전체, 스터디, 회고 등 ... */}
      <div className="buttons-container">
        {CATEGORY_LIST.map((category, idx) => (
          <button
            key={idx}
            onClick={handleCategoryChange}
            className={category === currentCategory ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 정렬 옵션: 최신순, 오래된 순 */}
      <select onChange={handleSortOrderChange} value={currentSort}>
        {Object.entries(SORT).map(([name, option]) => (
          <option key={name} value={option.order}>
            {option.label}
          </option>
        ))}
      </select>

      {/* 포스트 목록: 카드 그리드 */}
      <div className="cards-grid">
        {postList.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <hr />
    </main>
  );
}

export default Blog;
