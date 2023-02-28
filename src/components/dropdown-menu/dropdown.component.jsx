import React from 'react';



 export const  Dropdown = ({onSort}) => {


  const handleChange = (event) => {
    onSort(event.target.value)
  };

  return (
    <div>
     <form>
  <label htmlFor="sort">Sort By: </label>
  <select onChange={handleChange} name="sort" id="sort">
    <option value="Default">Sort By</option>
    <option value="descending">Decending</option>
    <option value="ascending">Acending</option>
    <option value="popular">Popular</option>
  </select>
</form>
    </div>
  )
}
