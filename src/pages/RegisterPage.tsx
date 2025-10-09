import type React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { clearError, registerUser } from "../features/auth/authSlice";
import LoadingSpinner from "../components/common/LoadingSpinner";

const RegisterPage: React.FC =()=>{
    const [ formData, setFormData ]= useState({email: '', password: '', name: '', surname: '', cellNumber: ''});
    const { isLoading, error, user } = useAppSelector((state)=> state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
            navigate('/');
        }
    }, [user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        dispatch(clearError());

        try {
            await dispatch(registerUser(formData)).unwrap();
            navigate('/'); 
        } catch (error) {
            //=== Again here my slicer will handle the error
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
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#ffffffff' }}>
                    Create Your Account
                </h2>
                {error && (
                    <div style={{backgroundColor: '#fee',color: '#c33',padding: '0.75rem',borderRadius: '4px',
                          marginBottom: '1rem',border: '1px solid #fcc',}}>
                            {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label id="lbl">First Name</label>
                        <input id="inputs" type="text" name="name" value={formData.name} onChange={handleChange}  required />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label id="lbl">Last Name</label>
                        <input id="inputs" type="text" name="surname" value={formData.surname} onChange={handleChange} required  />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label id="lbl">Email Address</label>
                        <input id="inputs" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label id="lbl">Cell Number</label>
                        <input id="inputs" type="tel" name="cellNumber" value={formData.cellNumber} onChange={handleChange} required />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label id="lbl">Password</label>
                        <input id="inputs" type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>

                    <button type="submit" disabled={isLoading} 
                           style={{width: '100%',padding: '0.75rem',backgroundColor: isLoading ? '#ccc' : '#3498db',
                                color: 'white',border: 'none',borderRadius: '4px',fontSize: '1rem',
                                cursor: isLoading ? 'not-allowed' : 'pointer', marginBottom: '1rem',}}>
                          {isLoading? 'Creating Account...': 'Register'}          
                    </button>
                </form>

                {isLoading && <LoadingSpinner size="small" />}

                <p style={{ textAlign: 'center', color: '#ffffffff' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#07293fff', textDecoration: 'none' }}>
                    Login here
                </Link>
                </p>

            </div>
        </div>
    )
}

export default RegisterPage



