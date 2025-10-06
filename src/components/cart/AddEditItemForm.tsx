import React, { useState, useEffect } from 'react';
import type { CartItem, AddCartItemData } from '../../types';

interface AddEditItemFormProps {
  item?: CartItem;
  onSave: (itemData: AddCartItemData) => void;
  onCancel: () => void;
}

const AddEditItemForm: React.FC<AddEditItemFormProps> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({name: '',quantity: 1,notes: '',category: '',itemImage: '',price: 0,});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        quantity: item.quantity,
        notes: item.notes || '',
        category: item.category,
        itemImage: item.itemImage,
        price: item.price,
      });
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    if (formData.price < 0) {
      newErrors.price = 'Price cannot be negative';
    }
    if (!formData.itemImage.trim()) {
      newErrors.itemImage = 'Image URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  const categories = ['Electronics','Clothing','Books','Home & Garden','Sports','Toys',
                      'Health & Beauty','Other'];

  return (
    <div style={{backgroundColor: 'white',padding: '1.5rem',border: '1px solid #e0e0e0',borderRadius: '8px',
      marginBottom: '1rem',}}>
      <h3 style={{ marginBottom: '1rem', color: '#333' }}>
        {item ? 'Edit Item' : 'Add New Item'}
      </h3>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Item Name *
            </label>
            <input type="text" name="name"value={formData.name}onChange={handleChange}
              style={{ width: '100%',padding: '0.5rem', border: `1px solid ${errors.name ? '#e74c3c' : '#ddd'}`,
                borderRadius: '4px',fontSize: '1rem',}}/>
            {errors.name && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.name}</span>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Category *
            </label>
            <select name="category" value={formData.category} onChange={handleChange}
              style={{width: '100%',padding: '0.5rem', border: `1px solid ${errors.category ? '#e74c3c' : '#ddd'}`,
                borderRadius: '4px',fontSize: '1rem',}}>
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.category}</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Quantity *
            </label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1"
              style={{width: '100%', padding: '0.5rem',border: `1px solid ${errors.quantity ? '#e74c3c' : '#ddd'}`,
                borderRadius: '4px', fontSize: '1rem',}}/>
            {errors.quantity && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.quantity}</span>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Price ($) *
            </label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" 
                  style={{width: '100%',padding: '0.5rem',border: `1px solid ${errors.price ? '#e74c3c' : '#ddd'}`,
                    borderRadius: '4px',fontSize: '1rem',}}/>
            {errors.price && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.price}</span>}
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Image URL *
          </label>
          <input type="url" name="itemImage" value={formData.itemImage} onChange={handleChange}
            placeholder="https://example.com/image.jpg" style={{ width: '100%', padding: '0.5rem',
              border: `1px solid ${errors.itemImage ? '#e74c3c' : '#ddd'}`, borderRadius: '4px',
              fontSize: '1rem',}}/>
          {errors.itemImage && <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>{errors.itemImage}</span>}
          
          {formData.itemImage && (
            <div style={{ marginTop: '0.5rem' }}>
              <img src={formData.itemImage}alt="Preview"
                style={{maxWidth: '100px',maxHeight: '100px',objectFit: 'cover',borderRadius: '4px',
                  border: '1px solid #ddd',}}
                onError={(e) => {(e.target as HTMLImageElement).style.display = 'none';}}/>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Notes (Optional)
          </label>
          <textarea name="notes" value={formData.notes}  onChange={handleChange} rows={3}
            style={{width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px',
              fontSize: '1rem', resize: 'vertical',}}/>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onCancel}
            style={{padding: '0.75rem 1.5rem',backgroundColor: '#95a5a6',color: 'white', border: 'none',
              borderRadius: '4px',cursor: 'pointer',fontSize: '1rem',}}>
            Cancel
          </button>
          <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#3498db',
              color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem',}}>
              {item ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditItemForm;