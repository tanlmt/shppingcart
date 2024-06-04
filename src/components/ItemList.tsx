import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ItemListProps {
  items: Item[];
  onAddToCart: (item: Item) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({
  items,
  onAddToCart,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100vw' }}>
    <div style={{ textAlign: 'center', width: '100%' }}>
      <h1>Danh sách sản phẩm</h1>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {items.map(item => (
          <div key={item.id} style={{ margin: '10px', textAlign: 'center' }}>
            <img src={item.image} alt={item.name} style={{ width: '150px', height: '150px' }} />
            <h3>{item.name}</h3>
            <p>Giá: {item.price} VND</p>
            <p>Số lượng: {item.quantity}</p>
            <button onClick={() => onAddToCart(item)}>Thêm vào giỏ hàng</button>
          </div>
        ))}
      </div>
      <div>
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>Trang trước</button>
        )}
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Trang sau</button>
        )}
        <button onClick={() => navigate('/cart')}>Đi đến giỏ hàng</button>
      </div>
    </div>
    </div>
  );
};

export default ItemList;
