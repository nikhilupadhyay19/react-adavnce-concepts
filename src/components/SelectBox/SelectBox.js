import React from 'react';

export const SelectBox = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <select class="form-select" aria-label="Default select example">
      <option selected>Open this select menu</option>
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
