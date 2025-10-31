import { useState, useMemo } from "react";
import { CATEGORY, SORT } from "../data/category.js";
import POSTS from "../data/posts.json";
import CategoryFilter from "../components/CategoryFilter.jsx";
import SortDropdown from "../components/SortDropdown.jsx";

// 대분류에 맞는 태그목록 설정
const TYPE = "Projects";
const CATEGORY_LIST = ["All", ...CATEGORY[TYPE]];

function Projects() {
  // 태그, 정렬 연습해보기
  // 1: useState 와 useMemo 를 사용해보기

  const [currentCategory, setCurrentCategory] = useState(CATEGORY_LIST[0]);
  const [sortOrder, setSortOrder] = useState(SORT.NEWEST.order);

  const filteredPosts = useMemo(() => {
    const posts = POSTS.filter((post) => post.type === TYPE);
    if (currentCategory === "All") {
      return posts;
    } else {
      // Projects는 category가 아닌 tags 기준으로 필터링
      return posts.filter((post) => post.category === currentCategory);
    }
  }, [currentCategory]);

  const sortedPosts = useMemo(() => {
    // .toSorted()는 원본 배열을 변경하지 않는 새로운 배열을 반환합니다.
    if (sortOrder === SORT.NEWEST.order) {
      return filteredPosts.toSorted(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } else {
      return filteredPosts.toSorted(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    }
  }, [sortOrder, filteredPosts]);

  return (
    <main>
      <h1>Projects</h1>

      <CategoryFilter
        categories={CATEGORY_LIST}
        currentCategory={currentCategory}
        onCategoryChange={setCurrentCategory}
      />

      <SortDropdown
        sortOptions={SORT}
        currentSort={sortOrder}
        onSortChange={(e) => setSortOrder(e.target.value)}
      />

      <div className="cards-grid">
        {/* ProjectsCard 컴포넌트 분리 예정 */}
        {sortedPosts.map((post) => (
          <article key={post.slug} className="card">
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
        ))}
      </div>
    </main>
  );
}

export default Projects;
