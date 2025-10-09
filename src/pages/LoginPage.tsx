import type React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { clearError, loginUser } from "../features/auth/authSlice";
import LoadingSpinner from "../components/common/LoadingSpinner";

const LoginPage:React.FC =()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoading, error, user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
            navigate('/');
        }
    },[user, navigate]);

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        dispatch(clearError());

        try {
            await dispatch(loginUser({email, password})).unwrap();
            navigate('/')
        } catch (error: any) {
            //== Remember the error will handled by the slice
        }
    };

    return(
        <div id="div1Sty">
            <div id="introDiv">
                <h1>Customer-Focused</h1>
                <h3>We make shopping simple and enjoyable</h3> <br />
                <p>browse, add to your cart, and enjoy a <strong>seamless checkout experience....</strong> ,
                    shop better — your <strong>personal</strong> cart
                    tracker for everything you need. <strong>“No more guesswork"</strong> — add items, set prices, and watch your 
                    total update instantly!”</p>

            </div>
            <div id="theForm">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#ffffffff' }}>Login to Your Account</h2>
                {error && (
                    <div style={{backgroundColor: '#fee',color: '#c33',padding: '0.75rem',borderRadius: '4px',
                          marginBottom: '1rem',border: '1px solid #fcc',}}> 
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label id="lbl">Email Address</label>
                        <input id="inputs" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label id="lbl">Password</label>
                        <input id="inputs" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" disabled={isLoading} id="btn">
                        {isLoading? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {isLoading && <LoadingSpinner size="small" />}
                <p style={{textAlign: 'center', color: '#ffffffff'}}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#11259bff', textDecoration: 'none' }}>Register here</Link>
                </p>
            </div>
        </div>
    );

};

export default LoginPage;


