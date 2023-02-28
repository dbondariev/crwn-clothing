import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { selectCurrentUser } from "../../store/user/user.selector";

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  // const { addItemToCart } = useContext(CartContext);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const currentUser = useSelector(selectCurrentUser);


  const itemToBasket = () => {
    if (currentUser) {
      dispatch(addItemToCart(cartItems, product));
    } else {
      alert("Please login to add items to cart");
    }
  };


  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={itemToBasket }
      >
        Add to card
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
