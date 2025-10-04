import React from "react";

interface LoadingSpinnerProps{
    size?: 'small'| 'medium'| 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({size ='medium'}) =>{
    const sizeMap = {
        small: '20px',
        medium: '40px',
        large: '60px',
    }
    return(
        <div style={divOneSty}>
            <div style={{
                width: sizeMap[size],
                height: sizeMap[size],
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
            }} />
            <style>
                {`
                  @keyframes spin{
                    0% {transform: rotate(0deg);}
                    100% {transform: rotate(360deg);}
                  }
                `}
            </style>
        </div>
    )
}

export default LoadingSpinner;

const divOneSty:React.CSSProperties={
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '2rem'
}

