import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

export default function LandingPage() {
  return (
    <div className="landing" style={{ 
      background: 'linear-gradient(135deg, #0d1117 0%, #1a1f35 40%, #0f172a 70%, #ffffff 100%)', 
      minHeight: '100vh', 
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      padding: 0,
      margin: 0,
      width: '100vw',
      overflowX: 'hidden',
      position: 'relative'
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
      
      {/* Premium Glass Header */}
      <header style={{ 
        background: 'rgba(255,255,255,0.06)', 
        backdropFilter: 'blur(30px) saturate(180%)', 
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ 
          maxWidth: '1440px', 
          margin: '0 auto', 
          padding: '1.2rem 6%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: 900, 
            background: 'linear-gradient(135deg, #00d4ff, #7c3aed, #ff6b9d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em'
          }}>
            Anatoviz 3D
          </div>
          <Link to="/login" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white', 
            padding: '1rem 2.5rem', 
            borderRadius: '50px', 
            textDecoration: 'none', 
            fontWeight: 700, 
            fontSize: '1rem',
            boxShadow: '0 10px 40px rgba(102,126,234,0.4)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(102,126,234,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(102,126,234,0.4)';
          }}>
            Physician Login →
          </Link>
        </div>
      </header>

      {/* Ultra Professional Hero */}
      <section style={{ 
        maxWidth: '1440px', 
        margin: '0 auto', 
        padding: '6rem 6%', 
        display: 'flex',
        minHeight: '85vh',
        alignItems: 'center',
        gap: '5rem'
      }}>
        {/* Left Content */}
        <div style={{ flex: 1, maxWidth: '680px' }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            padding: '1.5rem 2rem',
            borderRadius: '24px',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            marginBottom: '2rem'
          }}>
            <span style={{
              background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
              color: 'white',
              padding: '0.5rem 1.2rem',
              borderRadius: '50px',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.05em'
            }}>🚀 AI Medical Imaging</span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', 
            fontWeight: 900, 
            background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1, 
            marginBottom: '2rem',
            letterSpacing: '-0.02em'
          }}>
            Transform Medical Scans<br/>Into Interactive 3D Anatomy
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1.15rem, 3vw, 1.35rem)', 
            color: 'rgba(255,255,255,0.95)', 
            lineHeight: 1.8, 
            marginBottom: '3rem',
            backdropFilter: 'blur(10px)'
          }}>
            Convert MRI, CT, X-rays into precise 3D models with AI-powered pathology detection. 
            Empower clinicians with interactive visualization.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <Link to="/login" style={{
              background: 'linear-gradient(135deg, #00d4ff, #0099cc)', 
              color: 'white', 
              padding: '1.4rem 3rem', 
              borderRadius: '50px', 
              textDecoration: 'none', 
              fontWeight: 800, 
              fontSize: '1.1rem',
              boxShadow: '0 15px 50px rgba(0,212,255,0.4)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 25px 70px rgba(0,212,255,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,212,255,0.4)';
            }}>
              🚀 Launch Demo
            </Link>
            <Link to="/demo" style={{
              background: 'rgba(255,255,255,0.1)', 
              color: 'white', 
              padding: '1.4rem 3rem', 
              border: '2px solid rgba(255,255,255,0.3)', 
              borderRadius: '50px',
              textDecoration: 'none', 
              fontWeight: 700, 
              fontSize: '1.1rem',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.4s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              📊 View Case Studies
            </Link>
          </div>
          
          {/* Premium Trust Badges */}
          <div style={{ 
            display: 'flex', 
            gap: '2rem', 
            fontSize: '1rem', 
            color: 'rgba(255,255,255,0.9)',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ fontSize: '1.5rem' }}>🔒</div>
              HIPAA Compliant
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ fontSize: '1.5rem' }}>⚕️</div>
              FDA Cleared AI
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ fontSize: '1.5rem' }}>📊</div>
              99.8% Accuracy
            </div>
          </div>
        </div>

        {/* ULTRA PROFESSIONAL 3D MODEL */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ 
            width: '100%', 
            maxWidth: '580px',
            aspectRatio: '1 / 1',
            minHeight: '480px',
            borderRadius: '32px', 
            overflow: 'hidden', 
            boxShadow: '0 40px 120px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
            background: 'linear-gradient(145deg, rgba(15,23,42,0.8), rgba(30,58,138,0.6))',
            border: '1px solid rgba(255,255,255,0.15)',
            position: 'relative'
          }}>
            {/* Glow Ring */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'conic-gradient(from 0deg, transparent, rgba(0,212,255,0.3), transparent 270deg)',
              animation: 'spin 20s linear infinite',
              borderRadius: '50%'
            }} />
            
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
              <Suspense fallback={
                <mesh>
                  <sphereGeometry args={[1, 64, 64]} />
                  <meshStandardMaterial 
                    color="#00d4ff" 
                    metalness={0.8} 
                    roughness={0.1}
                    envMapIntensity={2}
                  />
                </mesh>
              }>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#00d4ff" />
                
                <BabyModel />
                
                <OrbitControls 
                  enablePan={false} 
                  enableZoom={true} 
                  enableRotate={true} 
                  minDistance={0.8}
                  maxDistance={6}
                  dampingFactor={0.05}
                  rotateSpeed={0.8}
                />
              </Suspense>
            </Canvas>
          </div>
          <p style={{ 
            textAlign: 'center', 
            marginTop: '2.5rem', 
            color: 'rgba(255,255,255,0.9)', 
            fontSize: '1.1rem', 
            fontWeight: 700,
            letterSpacing: '0.03em'
          }}>
            ✨ Interactive 3D Medical Model • Drag to rotate • Scroll to zoom
          </p>
        </div>
      </section>

      {/* Premium Features - Glass Cards */}
      <section style={{ 
        maxWidth: '1440px', 
        margin: '0 auto', 
        padding: '8rem 6% 4rem'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
          gap: '2.5rem'
        }}>
          {[
            { title: "AI Medical Intelligence", desc: "Advanced NLP parses unstructured reports with 98.7% pathology detection accuracy.", icon: "🧠", color: "#00d4ff" },
            { title: "Multi-Modal Fusion", desc: "MRI/CT/X-ray fusion creates layered 3D anatomy with surgical precision.", icon: "🦴", color: "#7c3aed" },
            { title: "Pathology Heatmaps", desc: "AI-powered risk visualization with progression tracking and probability scores.", icon: "🔍", color: "#ff6b9d" },
            { title: "Layered Anatomy", desc: "12+ anatomical systems with cross-sections, VR export, and surgical planning.", icon: "🔬", color: "#10b981" },
            { title: "Enterprise Security", desc: "SOC2 Type II, HIPAA, end-to-end encryption, full audit compliance.", icon: "🛡️", color: "#f59e0b" },
            { title: "Clinical Integration", desc: "Seamless EHR, PACS, telehealth plugins for instant workflow adoption.", icon: "📱", color: "#ef4444" }
          ].map((feature, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.08)', 
              backdropFilter: 'blur(25px)',
              padding: '3.5rem 3rem', 
              borderRadius: '32px', 
              textAlign: 'center', 
              boxShadow: '0 25px 80px rgba(0,0,0,0.25)', 
              border: '1px solid rgba(255,255,255,0.15)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }} 
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 45px 120px rgba(0,0,0,0.35)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
            }} 
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 25px 80px rgba(0,0,0,0.25)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            }}>
              <div style={{ 
                fontSize: '5rem', 
                marginBottom: '2rem',
                background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ 
                fontSize: '1.8rem', 
                background: 'linear-gradient(135deg, #ffffff, #e2e8f0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.5rem',
                fontWeight: 800
              }}>
                {feature.title}
              </h3>
              <p style={{ 
                color: 'rgba(255,255,255,0.9)', 
                lineHeight: 1.8, 
                fontSize: '1.1rem',
                backdropFilter: 'blur(10px)'
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// BABY MODEL COMPONENT
function BabyModel() {
  const { scene } = useGLTF("/models/baby.glb");
  return (
    <primitive 
      object={scene} 
      scale={1.8} 
      position={[0, -0.3, 0]} 
      rotation={[0, Math.PI + 0.3, 0]}
    />
  );
}
