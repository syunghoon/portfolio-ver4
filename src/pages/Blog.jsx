import { useSearchParams } from "react-router-dom";

import { CATEGORY, SORT } from "../data/category.js";
import { getFilteredAndSortedPosts } from "../api/PostApi.js";

import CategoryFilter from "../components/CategoryFilter.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
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
    <main>
      <h1>Blog</h1>

      {/* 카테고리 리스트 : 전체, 스터디, 회고 등 ... */}
      <CategoryFilter
        categories={CATEGORY_LIST}
        currentCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* 정렬 옵션: 최신순, 오래된 순 */}
      <SortDropdown
        sortOptions={SORT}
        currentSort={currentSort}
        onSortChange={handleSortOrderChange}
      />

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
