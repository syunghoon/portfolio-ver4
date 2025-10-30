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

  // 파생된 derived 상태..
  // searchParams와 원본 데이터인 POSTS만 있으면 언제든지 postList를 계산할 수 있다.
  // 굳이 별도의 useState로 관리할 필요가 없다.
  // const [postList, setPostList] = useState(
  //   POSTS.filter((post) => post.type === "Blog")
  // );

  // useEffect(() => {
  //   currentCategory = searchParams.get("category") || "All";
  //   currentSort = searchParams.get("sortBy") || SORT.NEWEST.order;
  //   // setPostList(콜백함수(카테고리, 소트옵션))
  //   setPostList(applyFiltersAndSorting(currentCategory, currentSort));
  // }, [searchParams]);

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

      {CATEGORY_LIST.map((category, idx) => (
        <button
          key={idx}
          className={category === currentCategory ? "active" : ""}
          onClick={handleCategoryChange}
        >
          {category}
        </button>
      ))}

      <select onChange={handleSortOrderChange} value={currentSort}>
        {Object.entries(SORT).map(([name, option]) => (
          <option key={name} value={option.order}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="cards-grid">
        <PostCard posts={postList} />
      </div>
      <hr />
    </main>
  );
}

export default Blog;
