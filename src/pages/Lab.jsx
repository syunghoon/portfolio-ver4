import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

import POSTS from "../data/posts.json";
import { CATEGORY, SORT } from "../data/category.js";
import PostCard from "../components/PostCard.jsx";

function Lab() {
  const CATEGORY_LIST = ["All", ...CATEGORY["Lab"]];

  let currentCategory, currentSort, currentParams;

  const [postList, setPostList] = useState(POSTS);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    currentCategory = searchParams.get("category");
    currentSort = searchParams.get("sortBy");
    currentParams = Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  return (
    <main>
      <h1>Lab</h1>

      <hr />

      {CATEGORY_LIST.map((category, idx) => (
        <button
          key={idx}
          onClick={(e) =>
            setSearchParams({
              ...currentParams,
              category: e.target.textContent,
            })
          }
        >
          {category}
        </button>
      ))}

      <select onChange={(e) => setSearchParams({ sortBy: e.target.value })}>
        {Object.entries(SORT).map(([name, option]) => (
          <option key={name} value={name}>
            {option.label}
          </option>
        ))}
      </select>

      <hr />

      <div className="cards-grid">
        <PostCard posts={postList} />
      </div>
    </main>
  );
}

export default Lab;
