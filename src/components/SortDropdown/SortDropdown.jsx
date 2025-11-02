function SortDropdown({ sortOptions, currentSort, onSortChange }) {
  return (
    <select onChange={onSortChange} value={currentSort}>
      {Object.entries(sortOptions).map(([name, option]) => (
        <option key={name} value={option.order}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortDropdown;
