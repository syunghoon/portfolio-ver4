import { useState, useMemo } from "react";
import { POST, CATEGORY, SORT } from "../data/category.js";
import POSTS from "../data/posts.json";

// 대분류에 맞는 태그목록 설정
const currentCategory = POST.Projects;
const CATEGORY_LIST = ["All", ...CATEGORY[currentCategory]];

console.log(currentCategory);
console.log(CATEGORY_LIST);

function Projects() {
  // 태그, 정렬 연습해보기
  // 1: useState 와 useMemo 를 사용해보기

  const [currentTag, setTag] = useState(CATEGORY_LIST[0]);
  const [sortOption, setSortOption] = useState(SORT.NEWEST);

  const filteredPosts = useMemo(() => {
    if (currentTag === "All") {
      return POSTS;
    } else {
      return POSTS.filter((post) => post.tags.includes(currentTag));
    }
  }, [currentTag]);

  const sortedPosts = useMemo(() => {
    if (sortOption === SORT.NEWEST) {
      return filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      return filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
  }, [sortOption, filteredPosts]);

  return (
    <main>
      <h1>Projects</h1>

      {CATEGORY_LIST.map((tag, idx) => (
        <button
          key={idx}
          className={tag === currentTag ? "active" : ""}
          onClick={() => setTag(tag)}
        >
          {tag}
        </button>
      ))}

      <select onChange={(e) => setSortOption(SORT[e.target.value])}>
        {Object.entries(SORT).map(([name, option]) => (
          <option key={name} value={name}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="cards-grid">
        {/* ProjectsCard 컴포넌트 분리 예정 */}
        {filteredPosts.map((post) => (
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
