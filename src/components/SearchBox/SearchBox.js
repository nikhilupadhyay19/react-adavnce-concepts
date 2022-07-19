import React from 'react';

export const SearchBox = (props) => {
  const { className, htmlFor, label, placeholder } = props;

  return (
    <div className={`search-box ${className}`}>
      <label htmlFor={htmlFor} className="form-label">
        {label}
      </label>
      <input className="form-control" placeholder={placeholder} type="search" />
    </div>
  );
};
