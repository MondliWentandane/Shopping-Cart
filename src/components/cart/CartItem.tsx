import React, { useState } from 'react';
import type { CartItem as CartItemType } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { deleteCartItem, updateCartItem } from '../../features/cart/cartSlice';
import AddEditItemForm from './AddEditItemForm';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await dispatch(deleteCartItem(item.id)).unwrap();
      } catch (error) {
        alert('Failed to delete item. Please try again.');
      }
    }
  };

  const handleSaveEdit = async (itemData: any) => {
    try {
      await dispatch(updateCartItem({ itemId: item.id, itemData })).unwrap();
      setIsEditing(false);
    } catch (error) {
      alert('Failed to update item. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <AddEditItemForm
        item={item}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <div id='itemEach'>
      <img src={item.itemImage} alt={item.name}
           style={{width: '80px', height: '80px',objectFit: 'cover',borderRadius: '6px', marginRight: '1rem',}}
           onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=No+Image';}}/>
      
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 0.5rem 0'}}>{item.name}</h3>
        <p style={{ margin: '0 0 0.25rem 0'}}>
          <strong>Category:</strong> {item.category}
        </p>
        <p style={{ margin: '0 0 0.25rem 0' }}>
          <strong>Quantity:</strong> {item.quantity}
        </p>
        <p style={{ margin: '0 0 0.25rem 0'}}>
          <strong>Price:</strong> ${item.price}
        </p>
        {item.notes && (
          <p style={{ margin: '0', fontSize: '0.9rem' }}>
            <strong>Notes:</strong> {item.notes}
          </p>
        )}
      </div>

      <div style={{ textAlign: 'right', marginRight: '1rem' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#11f36fff', marginBottom: '0.5rem' }}>
          R {(item.price * item.quantity).toFixed(2)}
        </div>
        <div style={{ fontSize: '0.9rem', color: '#ffffffff' }}>
          Line Total
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button onClick={() => setIsEditing(true)} id='btnsEdit'>
          Edit
        </button>
        <button onClick={handleDelete} id='delBtn'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;