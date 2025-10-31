import { useState, useEffect } from "react";

import { CATEGORY, SORT } from "../data/category.js";
import { getFilteredAndSortedPosts } from "../api/PostApi.js";
import CategoryFilter from "../components/CategoryFilter.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
import PostCard from "../components/PostCard.jsx";

function Lab() {
  const TYPE = "Lab";
  const CATEGORY_LIST = ["All", ...CATEGORY[TYPE]];

  const [postList, setPostList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(CATEGORY_LIST[0]);
  const [currentSort, setCurrentSort] = useState(SORT.NEWEST.order);

  useEffect(() => {
    setPostList(getFilteredAndSortedPosts(TYPE, currentCategory, currentSort));
  }, [currentCategory, currentSort]);

  return (
    <main>
      <h1>Lab</h1>

      {/* 카테고리 리스트 : 전체, 스터디, 회고 등 ... */}
      <CategoryFilter
        categories={CATEGORY_LIST}
        currentCategory={currentCategory}
        onCategoryChange={setCurrentCategory}
      />

      {/* 정렬 옵션: 최신순, 오래된 순 */}
      <SortDropdown
        sortOptions={SORT}
        currentSort={currentSort}
        onSortChange={(e) => setCurrentSort(e.target.value)}
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

export default Lab;
