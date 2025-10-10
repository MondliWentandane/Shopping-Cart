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
        return (
        <header style={headerStyl}>
            <div style={divOneSty}>
                <div style={DivNavLinkSty}>
                    <Link to="/" style={LinksSty}> Shopping Cart</Link>
                </div>
            </div>
        </header>
        )
    }
    
    return(
        <header style={headerStyl}>
            <div style={divOneSty}>
              <Link to="/" style={LinksSty}> ShopApp</Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={DivNavLinkSty}>
                        <nav style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/" id="btns">Home</Link>
                            <Link to="/cart" id="btns">
                            Cart {items.length}
                            </Link>
                            <Link to="/profile" id="btns">Profile</Link>
                        </nav>
                    </div>
                    <button onClick={handleLogout} id="logout"> Logout</button>
                    <span>{user.name} {user.surname}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;

const headerStyl:React.CSSProperties={
    width: "100%",
    backgroundColor: 'rgba(11, 31, 245, 0.66)',
    position: "static",
    flex: 6

}
const divOneSty:React.CSSProperties={
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: "0.4rem",
        marginLeft: "0.7rem",
        width: "97%",
        height: "3.2rem"
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
