import type React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { fetchCartItems } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const HomePage: React.FC=()=>{
    const {user} = useAppSelector((state) => state.auth);
    const {items, isLoading} = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if(user) {
            dispatch(fetchCartItems(user.id))
        }
    }, [user, dispatch]);

    const totalItems = items.length;
    const totalValue = items.reduce((sum, item)=> sum + (item.price* item.quantity),0);

    const recentItems = items.slice(0,3);

    if (isLoading){
        return <LoadingSpinner />
    }

    return(
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1>Welcome back, {user?.name}!</h1>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>
                  Manage your shopping cart and tract your items
                </p>
            </div>

            <div style={{backgroundColor: 'white',padding: '1.5rem',borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',textAlign: 'center',}}>
                        <h3 style={{ color: '#3498db', marginBottom: '0.5rem' }}>
                            Total Items
                        </h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50' }}>
                            {totalItems}
                        </p>
            </div>

            <div style={{backgroundColor: 'white',padding: '1.5rem',borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',textAlign: 'center',}}>
                    <h3 style={{ color: '#27ae60', marginBottom: '0.5rem' }}>Total Value</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50' }}>
                        ${totalValue.toFixed(2)}
                    </p>
            </div>

            <div style={{backgroundColor: 'white',padding: '1.5rem',borderRadius: '8px',boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textAlign: 'center',}}>
                    <h3 style={{ color: '#e74c3c', marginBottom: '0.5rem' }}>Quick Actions</h3>
                    <Link to="/cart?action=add"
                        style={{display: 'inline-block',padding: '0.5rem 1rem',backgroundColor: '#3498db',
                        color: 'white',textDecoration: 'none',borderRadius: '4px',fontSize: '0.9rem',}}>
                        Add New Item
                    </Link>
            </div>

            <div style={{backgroundColor: 'white',padding: '1.5rem',borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ color: '#333' }}>Recent Items</h2>
                        <Link to="/cart"
                            style={{color: '#3498db',textDecoration: 'none',fontWeight: '500',}}>
                            View All Items
                        </Link>
                    </div>  

                    {recentItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                            <p style={{ marginBottom: '1rem' }}>No items in your cart yet.</p>
                            <Link to="/cart?action=add"
                              style={{padding: '0.75rem 1.5rem',backgroundColor: '#3498db',
                                color: 'white',textDecoration: 'none',borderRadius: '4px',fontWeight: '500',
                            }}>
                            Add Your First Item
                            </Link>
                        </div>
                        ) : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {recentItems.map((item) => (
                            <div key={item.id} style={{display: 'flex', alignItems: 'center',padding: '1rem',
                                border: '1px solid #e0e0e0',borderRadius: '6px',backgroundColor: '#fafafa',
                                }}>
                                <img src={item.itemImage}alt={item.name}
                                   style={{ width: '50px',height: '50px',objectFit: 'cover', borderRadius: '4px',
                                    marginRight: '1rem',}} onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50?text=No+Image';
                                }}/>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>{item.name}</h4>
                                    <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>
                                        {item.category} • Qty: {item.quantity} • ${item.price}
                                    </p>
                                </div>
                                <div style={{ color: '#27ae60', fontWeight: 'bold' }}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
      </div>
    )
}        

export default HomePage;
