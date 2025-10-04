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
        <div style={mainSty}>
            <div style={formSty}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
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
                        <label style={labelSty}>First Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputSty} required />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={labelSty}>Last Name</label>
                        <input type="text" name="surname" value={formData.surname} onChange={handleChange} required style={inputSty} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={labelSty}>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputSty} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={labelSty}>Cell Number</label>
                        <input type="tel" name="cellNumber" value={formData.cellNumber} onChange={handleChange} required style={inputSty} />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={labelSty}>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required style={inputSty} />
                    </div>

                    <button type="submit" disabled={isLoading} 
                           style={{width: '100%',padding: '0.75rem',backgroundColor: isLoading ? '#ccc' : '#3498db',
                                color: 'white',border: 'none',borderRadius: '4px',fontSize: '1rem',
                                cursor: isLoading ? 'not-allowed' : 'pointer', marginBottom: '1rem',}}>
                          {isLoading? 'Creating Account...': 'Register'}          
                    </button>
                </form>

                {isLoading && <LoadingSpinner size="small" />}

                <p style={{ textAlign: 'center', color: '#666' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#3498db', textDecoration: 'none' }}>
                    Login here
                </Link>
                </p>

            </div>
        </div>
    )
}

export default RegisterPage

const mainSty:React.CSSProperties={
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
}
const formSty:React.CSSProperties={
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
}
const labelSty:React.CSSProperties={
    display: 'block', 
    marginBottom: '0.5rem', 
    fontWeight: '500'
}
const inputSty: React.CSSProperties={
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
}

