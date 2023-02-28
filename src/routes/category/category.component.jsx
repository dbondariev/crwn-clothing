import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom"; // to get query from url-params

import ProductCard from "../../components/product-card/product-card.component";

// import { CategoriesContext } from "../../contexts/categories.context";
import { useSelector } from "react-redux";
import {
  selectCategoriesMap,
  selectcategoriesIsLoading,
} from "../../store/categories/categories.selector";
import { CategoryContainer, Title } from "./category.styles";
import Spinner from "../../components/spinner/spinner.component";
import { Dropdown } from "../../components/dropdown-menu/dropdown.component";


const Category = () => {
  const { category } = useParams();
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectcategoriesIsLoading);

  const [products, setProducts] = useState(categoriesMap[category]);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

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
    <Fragment>
      <div style={{display:"flex",
       alignItems:"center", 
       justifyContent:"space-between",
       width:"100%", 
       }}>
      <Title>{category.toUpperCase()}</Title>
      <Dropdown onSort={onSetSort} />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {newProducts &&
            newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
