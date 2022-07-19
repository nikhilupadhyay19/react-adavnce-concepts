import React from 'react';

export const SelectBox = (props) => {
  const { data, selectChangeHandler } = props;
  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={selectChangeHandler}
    >
      {data.map((el) => {
        return (
          <option value={el} key={el}>
            {el}
          </option>
        );
      })}
    </select>
  );
};
