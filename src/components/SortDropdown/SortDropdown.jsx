import "./SortDropdown.css";

function SortDropdown({ sortOptions, currentSort, onSortChange }) {
  return (
    <select
      onChange={onSortChange}
      value={currentSort}
      className="sort-dropdown"
      aria-label="정렬 옵션 선택"
    >
      {Object.entries(sortOptions).map(([name, option]) => (
        <option key={name} value={option.order}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortDropdown;
