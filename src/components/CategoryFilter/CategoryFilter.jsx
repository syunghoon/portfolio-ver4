function CategoryFilter({ categories, currentCategory, onCategoryChange }) {
  return (
    <>
      {categories.map((category, idx) => (
        <button
          key={idx}
          onClick={() => onCategoryChange(category)}
          className={category === currentCategory ? "active" : ""}
        >
          {category}
        </button>
      ))}
    </>
  );
}

export default CategoryFilter;
