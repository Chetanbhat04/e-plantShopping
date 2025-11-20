// src/components/ProductList.jsx
import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/CartSlice'; // adjust path

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items || []);
  const totalQuantity = cartItems ? cartItems.reduce((total, item) => total + (item.quantity || 0), 0) : 0;

  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({}); // local UI disable state

  // plantsArray ... (copy your plantsArray here)

  const handleAddToCart = (plant, category) => {
    const payload = { ...plant, category, quantity: 1 };
    // dispatch adds to redux store
    dispatch(addItem(payload));
    // visually disable button and mark added
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  const handleCartClick = (e) => {
    e?.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    e?.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      {/* --- navbar with cart badge --- */}
      <div className="navbar" style={{ backgroundColor: '#4CAF50', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
        </div>
        <div>
          <button onClick={handleCartClick} style={{ fontSize: 18 }}>
            Cart 🛒 <span className="cart-count" style={{ marginLeft: 8, background: 'red', color: 'white', borderRadius: '12px', padding: '2px 8px' }}>{totalQuantity}</span>
          </button>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map(cat => (
            <div key={cat.category} className="category-block">
              <h2>{cat.category}</h2>
              <div className="category-plants" style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                {cat.plants.map(plant => (
                  <div className="product-card" key={plant.name} style={{ width: 220, border: '1px solid #eee', padding: 12 }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p>{plant.cost}</p>
                    <button
                      onClick={() => handleAddToCart(plant, cat.category)}
                      disabled={!!addedToCart[plant.name]}
                      style={{ background: addedToCart[plant.name] ? '#6c757d' : '#28a745', color: '#fff', padding: '8px', border: 'none', borderRadius: 6 }}
                    >
                      {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
