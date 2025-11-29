import "./CategoryFilter.css";

function CategoryFilter({ categories, currentCategory, onCategoryChange }) {
  return (
    <div className="category-filter" role="tablist" aria-label="카테고리 선택">
      {categories.map((category, idx) => (
        <button
          key={idx}
          onClick={() => onCategoryChange(category)}
          className={`category-filter__button${
            category === currentCategory ? " is-active" : ""
          }`}
          type="button"
          role="tab"
          aria-selected={category === currentCategory}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
