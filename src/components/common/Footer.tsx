import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{backgroundColor: '#2c3e50',color: '#ecf0f1', padding: '1rem 2rem 1rem',}}>
      <div style={{maxWidth: '1200px', margin: '0 auto',}}>
        <div style={{display: 'grid',gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem', marginBottom: '2rem',}}>
          {/* About Section */}
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem',color: '#3498db',}}>
              About Us
            </h3>
            <p style={{ lineHeight: '1.6', fontSize: '0.9rem',color: '#f2f7faff',}}>
              Your trusted online shopping destination. We provide quality products
              and excellent customer service.
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h3 style={{ 
              marginBottom: '1rem', 
              fontSize: '1.2rem',
              color: '#3498db',
            }}>
              Customer Service
            </h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              margin: 0,
            }}>
              <li style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#feffffff' }}>
                Contact Us
              </li>
              <li style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#f5f7f8ff' }}>
                Shipping Information
              </li>
              <li style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#fdfeffff' }}>
                Returns & Exchanges
              </li>
              <li style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ffffffff' }}>
                FAQ
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{ 
              marginBottom: '1rem', 
              fontSize: '1.2rem',
              color: '#36a6f1ff',
            }}>
              Contact
            </h3>
            <div style={{ fontSize: '0.9rem', color: '#fcfcfcff', lineHeight: '1.8' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>
                📧 support@example.com
              </p>
              <p style={{ margin: '0 0 0.5rem 0' }}>
                 +27 (0) 12 345 6789
              </p>
              <p style={{ margin: '0' }}>
                 Pretoria, South Africa
              </p>
            </div>
          </div>
        </div>

        {/**   Here is my bottom part of the footer ==== */}
        <div style={{ borderTop: '1px solid #eaf1f8ff',paddingTop: '0.5rem', marginTop: '1rem',
          display: 'flex',justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ margin: 0, fontSize: '0.9rem',color: '#faffffff',}}>
            © {currentYear} Your Store. All rights reserved.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a 
              href="#" style={{ color: '#ffffffff', textDecoration: 'none',fontSize: '0.9rem',}}
              onMouseOver={(e) => e.currentTarget.style.color = '#3498db'}onMouseOut={(e) => e.currentTarget.style.color = '#95a5a6'}
            >
              Privacy Policy
            </a>
            <a href="#" style={{ color: '#fcfcfcff', textDecoration: 'none',fontSize: '0.9rem',}}
              onMouseOver={(e) => e.currentTarget.style.color = '#3498db'}
              onMouseOut={(e) => e.currentTarget.style.color = '#95a5a6'}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;