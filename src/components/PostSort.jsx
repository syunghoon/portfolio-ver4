import { SORT } from "../data/category.js";

function PostSort() {
  return (
    <select onChange={handleSortOrderChange} value={currentSort}>
      {Object.entries(SORT).map(([name, option]) => (
        <option key={name} value={option.order}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default PostSort;
