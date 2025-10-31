import { useEffect, useState } from "react";

import { CATEGORY, SORT } from "../data/category.js";
import { getPosts, getFilteredAndSortedPosts } from "../api/PostApi.js";

import PostCard from "../components/PostCard.jsx";

function Lab() {
  const TYPE = "Lab";
  const CATEGORY_LIST = ["All", ...CATEGORY[TYPE]];

  const [postList, setPostList] = useState(getPosts(TYPE));
  const [currentCategory, setCurrentCategory] = useState(CATEGORY_LIST[0]);
  const [currentSort, setCurrentSort] = useState(SORT.NEWEST.order);

  useEffect(() => {
    setPostList(getFilteredAndSortedPosts(TYPE, currentCategory, currentSort));
  }, [currentCategory, currentSort]);

  return (
    <main>
      <h1>Lab</h1>

      {/* 카테고리 리스트 : 전체, 스터디, 회고 등 ... */}
      <div className="buttons-container">
        {CATEGORY_LIST.map((category, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentCategory(category)}
            className={category === currentCategory ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 정렬 옵션: 최신순, 오래된 순 */}
      <select
        value={currentSort}
        onChange={(e) => setCurrentSort(e.target.value)}
      >
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

export default Lab;
