import CategoryFilter from "../CategoryFilter/CategoryFilter";
import SortDropdown from "../SortDropdown/SortDropdown";

import "./ContentToolbar.css";

function ContentToolbar({
  categories,
  currentCategory,
  onCategoryChange,
  sortOptions,
  currentSort,
  onSortChange,
}) {
  return (
    <div className="content-toolbar">
      <div className="content-toolbar__filters">
        <CategoryFilter
          categories={categories}
          currentCategory={currentCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      <div className="content-toolbar__actions">
        <span className="content-toolbar__label"></span>
        <SortDropdown
          sortOptions={sortOptions}
          currentSort={currentSort}
          onSortChange={onSortChange}
        />
      </div>
    </div>
  );
}

export default ContentToolbar;
