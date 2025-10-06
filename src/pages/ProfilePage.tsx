import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { updateProfile } from '../features/auth/authSlice';

const ProfilePage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    email: user?.email || '',
    cellNumber: user?.cellNumber || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile({ userId: user!.id, userData: formData })).unwrap();
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      surname: user?.surname || '',
      email: user?.email || '',
      cellNumber: user?.cellNumber || '',
    });
    setIsEditing(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const totalCartValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#333' }}>My Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Edit Profile
          </button>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
      }}>
        {/* Profile Information */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <h3 style={{ color: '#333', marginBottom: '1.5rem' }}>Personal Information</h3>
          
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  First Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Cell Number
                </label>
                <input
                  type="tel"
                  name="cellNumber"
                  value={formData.cellNumber}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#95a5a6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Name:</strong> {user.name} {user.surname}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Email:</strong> {user.email}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Cell Number:</strong> {user.cellNumber}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>

        {/* Account Statistics */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <h3 style={{ color: '#333', marginBottom: '1.5rem' }}>Account Statistics</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong>Total Cart Items:</strong> {items.length}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Total Cart Value:</strong> ${totalCartValue.toFixed(2)}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Account Status:</strong> <span style={{ color: '#27ae60' }}>Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;