import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchCartItems, addCartItem } from '../features/cart/cartSlice';
import CartItem from '../components/cart/CartItem';
import AddEditItemForm from '../components/cart/AddEditItemForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CartPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { items, isLoading } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user.id));
    }
  }, [user, dispatch]);

  const handleAddItem = async (itemData: any) => {
    try {
      await dispatch(addCartItem({ userId: user!.id, itemData })).unwrap();
      setShowAddForm(false);
    } catch (error) {
      alert('Failed to add item. Please try again.');
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#333' }}>My Shopping Cart</h1>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            + Add New Item
          </button>
        )}
      </div>

      {showAddForm && (
        <AddEditItemForm
          onSave={handleAddItem}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {items.length === 0 && !showAddForm ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <h3 style={{ color: '#666', marginBottom: '1rem' }}>Your cart is empty</h3>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Start adding items to your shopping cart to see them here.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            Add Your First Item
          </button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '2rem' }}>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          {items.length > 0 && (
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '2px solid #3498db',
            }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>Cart Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Total Items:</span>
                <strong>{totalItems}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Unique Products:</span>
                <strong>{items.length}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span>Total Value:</span>
                <strong style={{ fontSize: '1.25rem', color: '#27ae60' }}>
                  ${totalValue.toFixed(2)}
                </strong>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;