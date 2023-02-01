import { memo } from "react";
import { CartItemContainer, ItemDetails } from "./cart-item.styles";

// using react.memo for render performance (if increased the quantity for same item unless the props changes)
const CartItem = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;
