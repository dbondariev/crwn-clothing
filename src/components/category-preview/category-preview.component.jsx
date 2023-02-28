import ProductCard from "../product-card/product-card.component";
import { Dropdown } from "../dropdown-menu/dropdown.component";
import { useState } from "react";

import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles";




 const CategoryPreview = ({ title, products }) => {

  const [sort, setSort] = useState("default");

   const  onSetSort = (items) => {
    setSort(items)
  }




const sortProducts = (products, sort) => {
  if (sort === "default") {
    return products;
  } else if (sort === "descending") {
    return products.slice().sort((a, b) => b.price - a.price);
  } else if (sort === "ascending") {
    return products.slice().sort((a, b) => a.price - b.price);
  } else if (sort === "popular") {
    return products;
  }
};



const newProducts = sortProducts(products, sort);




  return (
    <CategoryPreviewContainer>
      <div style={{
      display:"flex",
       alignItems:"center", 
       justifyContent:"space-between",
       width:"100%", 
       flexDirection:"row-reverse"
       }}>
      <Dropdown onSort={onSetSort} />
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      </div>
      <Preview>
        {newProducts
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;

