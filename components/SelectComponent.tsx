import React from "react";

function SelectComponent({
  selectedItem,
  setSelectedItem,
  data,
  label,
  disabledValue,
  handleFetch = null,
}) {
  return (
    <div className="w-full max-w-sm">
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <select
        id={label}
        value={selectedItem}
        onChange={(e) => {
          setSelectedItem(e.target.value);
          if (handleFetch) {
            handleFetch(e.target.value);
          }
        }}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          {disabledValue}
        </option>
        {data
          ? data.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))
          : null}
      </select>
    </div>
  );
}
export default SelectComponent;
