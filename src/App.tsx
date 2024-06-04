import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ItemList from './components/ItemList';
import Cart from './components/Cart';
import Success from './components/Success';

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const App: React.FC = () => {
  const initialItems: Item[] = [
    { id: 1, name: 'Táo', price: 10000, quantity: 30, image: '/img/image1.jpg' },
    { id: 2, name: 'Cà chua', price: 8000, quantity: 40, image: '/img/image2.jpg' },
    { id: 3, name: 'Trứng', price: 3000, quantity: 15, image: '/img/image3.jpg' },
    { id: 4, name: 'Salad', price: 5000, quantity: 50, image: '/img/image4.jpg' },
    { id: 5, name: 'Chuối', price: 9000, quantity: 20, image: '/img/image5.jpg' },
  ];

  const [items, setItems] = useState<Item[]>(initialItems);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleAddToCart = (item: Item) => {
    setItems(prevItems =>
      prevItems.map(i => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))
    );

    setCartItems(prevCartItems => {
      const cartItem = prevCartItems.find(ci => ci.id === item.id);
      if (cartItem) {
        return prevCartItems.map(ci =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      } else {
        return [...prevCartItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (item: CartItem) => {
    setCartItems(prevCartItems => {
      const cartItem = prevCartItems.find(ci => ci.id === item.id);
      if (cartItem && cartItem.quantity > 1) {
        return prevCartItems.map(ci =>
          ci.id === item.id ? { ...ci, quantity: ci.quantity - 1 } : ci
        );
      } else {
        return prevCartItems.filter(ci => ci.id !== item.id);
      }
    });

    setItems(prevItems =>
      prevItems.map(i => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Router>
      <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
        <Routes>
          <Route
            path="/"
            element={
              <ItemList
                items={currentItems}
                onAddToCart={handleAddToCart}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            }
          />
          <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
