import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Doctor / Medical Professional");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    navigate("/dashboard");
  };

  return (
    <div className="login-page" style={{ 
      background: 'linear-gradient(135deg, #0d1117 0%, #1a1f35 40%, #0f172a 70%, #ffffff 100%)', 
      minHeight: '100vh', 
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      padding: '2rem 0',
      margin: 0,
      width: '100vw',
      overflowX: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Animated Background Particles */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120,119,198,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,119,198,0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120,219,255,0.2) 0%, transparent 50%)'
      }} />

      {/* ULTRA PROFESSIONAL LOGIN CARD */}
      <div style={{ 
        background: 'rgba(255,255,255,0.08)', 
        backdropFilter: 'blur(35px) saturate(180%)',
        padding: '4rem 3.5rem', 
        borderRadius: '32px', 
        boxShadow: '0 40px 120px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)', 
        border: '1px solid rgba(255,255,255,0.15)',
        maxWidth: '480px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Logo Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2.5rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 900, 
            background: 'linear-gradient(135deg, #00d4ff, #7c3aed, #ff6b9d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
            margin: 0,
            lineHeight: 1.1
          }}>
            Anatoviz 3D
          </h2>
          <p style={{ 
            color: 'rgba(255,255,255,0.7)', 
            fontSize: '1.1rem', 
            margin: '0.5rem 0 0 0',
            fontWeight: 400
          }}>
            AI-powered medical visualization
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Email Input */}
          <div style={{
            background: 'rgba(255,255,255,0.05)', 
            backdropFilter: 'blur(20px)',
            padding: '1.5rem 1.8rem', 
            borderRadius: '20px', 
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease'
          }}>
            <label style={{ 
              display: 'block', 
              color: 'rgba(255,255,255,0.9)', 
              fontSize: '0.95rem', 
              fontWeight: 600,
              marginBottom: '0.8rem',
              letterSpacing: '0.02em'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doctor@hospital.com"
              required
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.95)',
                fontSize: '1.1rem',
                width: '100%',
                outline: 'none',
                fontFamily: 'inherit',
                fontWeight: 400
              }}
              onFocus={(e) => {
                e.target.parentElement!.style.borderColor = 'rgba(0,212,255,0.6)';
                e.target.parentElement!.style.boxShadow = '0 0 0 4px rgba(0,212,255,0.1)';
                e.target.parentElement!.style.background = 'rgba(255,255,255,0.08)';
              }}
              onBlur={(e) => {
                e.target.parentElement!.style.borderColor = 'rgba(255,255,255,0.1)';
                e.target.parentElement!.style.boxShadow = 'none';
                e.target.parentElement!.style.background = 'rgba(255,255,255,0.05)';
              }}
            />
          </div>

          {/* Password Input */}
          <div style={{
            background: 'rgba(255,255,255,0.05)', 
            backdropFilter: 'blur(20px)',
            padding: '1.5rem 1.8rem', 
            borderRadius: '20px', 
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease'
          }}>
            <label style={{ 
              display: 'block', 
              color: 'rgba(255,255,255,0.9)', 
              fontSize: '0.95rem', 
              fontWeight: 600,
              marginBottom: '0.8rem',
              letterSpacing: '0.02em'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.95)',
                fontSize: '1.1rem',
                width: '100%',
                outline: 'none',
                fontFamily: 'inherit',
                fontWeight: 400
              }}
              onFocus={(e) => {
                e.target.parentElement!.style.borderColor = 'rgba(0,212,255,0.6)';
                e.target.parentElement!.style.boxShadow = '0 0 0 4px rgba(0,212,255,0.1)';
                e.target.parentElement!.style.background = 'rgba(255,255,255,0.08)';
              }}
              onBlur={(e) => {
                e.target.parentElement!.style.borderColor = 'rgba(255,255,255,0.1)';
                e.target.parentElement!.style.boxShadow = 'none';
                e.target.parentElement!.style.background = 'rgba(255,255,255,0.05)';
              }}
            />
          </div>

          {/* Role Selection */}
          <div style={{
            background: 'rgba(255,255,255,0.05)', 
            backdropFilter: 'blur(20px)',
            padding: '1.5rem 1.8rem', 
            borderRadius: '20px', 
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease'
          }}>
            <label style={{ 
              display: 'block', 
              color: 'rgba(255,255,255,0.9)', 
              fontSize: '0.95rem', 
              fontWeight: 600,
              marginBottom: '0.8rem',
              letterSpacing: '0.02em'
            }}>
              Professional Role
            </label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                color: 'rgba(255,255,255,0.95)',
                fontSize: '1.1rem',
                padding: '1rem 1.2rem',
                width: '100%',
                outline: 'none',
                fontFamily: 'inherit',
                fontWeight: 500,
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjcpIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K")',
                backgroundPosition: 'right 1rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '12px'
              }}
            >
              <option>Doctor / Medical Professional</option>
              <option>Medical Student</option>
              <option>Patient / Caregiver</option>
              <option>Medical Researcher</option>
            </select>
          </div>

          {/* PREMIUM LOGIN BUTTON */}
          <button 
            type="submit" 
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #0099cc)', 
              color: 'white', 
              padding: '1.6rem 3rem', 
              borderRadius: '24px', 
              border: 'none',
              fontWeight: 800, 
              fontSize: '1.15rem',
              cursor: 'pointer',
              boxShadow: '0 20px 60px rgba(0,212,255,0.4)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontFamily: 'inherit'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,212,255,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,212,255,0.4)';
            }}
          >
            🚀 Enter Medical Dashboard
          </button>
        </form>

        {/* Premium Footer */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2.5rem', 
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.95rem'
        }}>
          <p>
            Need enterprise access?{' '}
            <Link to="/contact" style={{
              color: '#00d4ff',
              textDecoration: 'none',
              fontWeight: 600,
              position: 'relative'
            }}
            onMouseEnter={(e) => e.currentTarget.style.textShadow = '0 0 10px rgba(0,212,255,0.5)'}
            onMouseLeave={(e) => e.currentTarget.style.textShadow = 'none'}
            >
              Contact Admin →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
