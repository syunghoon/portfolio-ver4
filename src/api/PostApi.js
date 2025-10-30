import POSTS from "../data/posts.json";

// 도메인별 글 목록 조회용
function getPosts(type) {
  return POSTS.filter((post) => post.type === type);
}

// 글 상세 조회용 (조회할 slug 필요)
function getPostDetail(slug) {
  return POSTS.find((post) => post.slug === slug);
}

// 글 필터링, 정렬 목록 조회용
function getFilteredAndSortedPosts(type, category, sortOrder) {
  const posts = getPosts(type);

  const filteredPosts =
    category === "All"
      ? posts
      : posts.filter((post) => post.category === category);

  if (sortOrder === "new") {
    return filteredPosts.toSorted(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  } else {
    return filteredPosts.toSorted(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }
}

export { getPosts, getPostDetail, getFilteredAndSortedPosts };
