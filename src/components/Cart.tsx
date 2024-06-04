import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  cartItems: CartItem[];
  onRemoveFromCart: (item: CartItem) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemoveFromCart }) => {
  const navigate = useNavigate();
  const itemsInCart = cartItems.filter(item => item.quantity > 0);
  const total = itemsInCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isEmptyCart = itemsInCart.length === 0;

  return (
    <div style={{ width: '100vw' }}>
    <div style={{ textAlign: 'center', width: '100%' }}>
      <h1>Giỏ hàng</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {isEmptyCart ? (
          <p>Giỏ hàng trống</p>
        ) : (
          itemsInCart.map(item => (
            <div key={item.id} style={{ margin: '10px', textAlign: 'center', width: '300px' }}>
              <img src={item.image} alt={item.name} style={{ width: '150px', height: '150px' }} />
              <h3>{item.name}</h3>
              <p>Giá: {item.price} VND</p>
              <p>Số lượng: {item.quantity}</p>
              <button onClick={() => onRemoveFromCart(item)}>Bỏ bớt</button>
            </div>
          ))
        )}
      </div>
      {!isEmptyCart && <h2>Tổng: {total} VND</h2>}
      <button disabled={isEmptyCart} onClick={() => navigate('/success')}>
        Thanh Toán
      </button>
    </div>
    </div>
  );
};

export default Cart;
