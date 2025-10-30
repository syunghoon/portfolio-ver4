import { CATEGORY } from "../data/category.js";

function PostCategory({ type, currentCategory }) {
  const CATEGORY_LIST = ["All", ...CATEGORY[type]];

  return CATEGORY_LIST.map((category, idx) => (
    <button key={idx} className={category === currentCategory ? "active" : ""}>
      {category}
    </button>
  ));
}

export default PostCategory;
