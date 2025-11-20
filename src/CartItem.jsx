// src/components/CartItem.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../features/CartSlice'; // adjust path
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items || []);
  const dispatch = useDispatch();

  const calculateTotalCost = (item) => {
    if (!item || !item.cost) return 0;
    const numeric = parseFloat(item.cost.trim().substring(1));
    const qty = item.quantity || 1;
    return (isNaN(numeric) ? 0 : numeric) * qty;
  };

  const calculateTotalAmount = () => {
    const total = cart.reduce((sum, item) => sum + calculateTotalCost(item), 0);
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e?.preventDefault();
    if (onContinueShopping) onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: (item.quantity || 1) + 1 }));
  };

  const handleDecrement = (item) => {
    const currentQty = item.quantity || 1;
    if (currentQty > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: currentQty - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <img src={item.image} alt={item.name} style={{ width: 110, height: 90, objectFit: 'cover' }} />
              <div>
                <div><strong>{item.name}</strong></div>
                <div>{item.cost}</div>
                <div>
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span style={{ margin: '0 8px' }}>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div>Subtotal: ${calculateTotalCost(item).toFixed(2)}</div>
                <button onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={handleContinueShopping}>Continue Shopping</button>
        <button onClick={() => alert('Functionality to be added for future reference')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
