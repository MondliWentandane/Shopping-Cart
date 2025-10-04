import type React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { clearCart } from "../../features/cart/cartSlice";

const Header:React.FC = () =>{
    const {user} = useAppSelector((state)=> state.auth);
    const {items} = useAppSelector((state)=> state.cart);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () =>{
        dispatch(logout());
        dispatch(clearCart());
        navigate('/login');
    }

    if(!user){
        return null;
    }
    
    return(
        <header style={headerStyl}>
            <div style={divOneSty}>
                <div style={DivNavLinkSty}>
                    <Link to="/" style={LinksSty}> ShopApp</Link>
                    <nav style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                        <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
                           Cart {items.length}
                        </Link>
                        <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
                    </nav>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span>Welcome, {user.name}</span>
                    <button onClick={handleLogout} style={BtnSty}> Logout</button>
                </div>
            </div>
        </header>
    );
};

export default Header;

const headerStyl:React.CSSProperties={
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
}
const divOneSty:React.CSSProperties={
    display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
}
const DivNavLinkSty:React.CSSProperties={
    display: 'flex',
    alignItems: 'center', 
    gap: '2rem'
}
const LinksSty:React.CSSProperties={
    color: 'white', 
    textDecoration: 'none', 
    fontSize: '1.5rem', 
    fontWeight: 'bold'
}
const BtnSty:React.CSSProperties={
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',    
}
