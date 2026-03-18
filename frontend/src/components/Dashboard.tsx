import { useRef, useState } from "react";
import AnatomyViewer from "../viewer/AnatomyViewer";
import { parseReportText } from "../parser/reportParser";
import type { MuscleFinding, ParsedReport, Severity } from "../parser/reportParser";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

type System = "full" | "muscular" | "skeletal" | "nerves";
type ViewMode = "doctor" | "patient";

export default function Dashboard() {
  // ✅ YOUR ORIGINAL LOGIC - UNCHANGED
  const [system, setSystem] = useState<System>("full");
  const [highlights, setHighlights] = useState<MuscleFinding[]>([]);
  const [patientText, setPatientText] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("doctor");
  const inputRef = useRef<HTMLInputElement>(null);

  const { logout, role } = useAuth();
  const navigate = useNavigate();

  const handleUpload = () => inputRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed: ParsedReport = parseReportText(String(reader.result));
        setSystem(parsed.system);
        setHighlights(parsed.findings);
        setPatientText(parsed.patientText);
      } catch (err) {
        console.error("Failed to parse report", err);
        setPatientText("Error parsing report. Please check the file format.");
        setHighlights([]);
      }
    };
    reader.onerror = () => {
      setPatientText("Failed to read file.");
    };
    reader.readAsText(file);
  };

  const getDisplayText = () => {
    if (viewMode === "patient") {
      return patientText
        .replace(/MRI/g, "scan")
        .replace(/pathology/g, "problem")
        .replace(/degenerative/g, "worn-out")
        .replace(/compression/g, "pressure")
        .replace(/severe/gi, "serious")
        .replace(/moderate/gi, "moderate")
        .replace(/mild/gi, "mild")
        .replace(/disc herniation/gi, "disc bulge")
        .replace(/stenosis/gi, "narrowing");
    }
    return patientText;
  };

  const getFindingLabel = (meshName: string, severity: Severity) => {
    if (viewMode === "patient") {
      const simpleNames: Record<string, string> = {
        Cervical_Nerves: "Neck nerves",
        Thoracic_Spinal_Nerves: "Mid-back nerves",
        Lumbar_Nerve_Roots: "Lower back nerves",
        L1_LumbarVertebra: "Lower spine bone",
        Sacrum: "Tailbone area",
      };

      const simpleSeverity =
        severity === "SEVERE"
          ? "Serious"
          : severity === "MODERATE"
          ? "Moderate"
          : severity === "MILD"
          ? "Mild"
          : "Normal";

      return `${simpleNames[meshName] || meshName.replace(/_/g, " ")} — ${simpleSeverity}`;
    }
    return `${meshName} — ${severity}`;
  };

  const exportToPdf = () => {
    alert("Exporting report as PDF (stub).");
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0d1117 0%, #1a1f35 40%, #0f172a 70%, #ffffff 100%)', 
      minHeight: '100vh', 
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex'
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

      {/* ✅ YOUR ORIGINAL STRUCTURE - Just styled */}
      <aside style={{ 
        width: '440px',
        background: 'rgba(255,255,255,0.08)', 
        backdropFilter: 'blur(40px) saturate(180%)',
        padding: '3rem 2.5rem',
        boxShadow: '12px 0 80px rgba(0,0,0,0.35)', 
        borderRight: '1px solid rgba(255,255,255,0.18)',
        height: '100vh',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          <h2 style={{ 
            fontSize: '2.4rem', 
            fontWeight: 900, 
            background: 'linear-gradient(135deg, #00d4ff, #7c3aed, #ff6b9d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            Anatoviz 3D
          </h2>
          
          {/* View Mode Toggle */}
          <div style={{
            display: 'flex', gap: '1rem', marginTop: '2rem',
            background: 'rgba(255,255,255,0.06)', padding: '1rem', 
            borderRadius: '20px', border: '1px solid rgba(255,255,255,0.15)'
          }}>
            <button
              style={{
                flex: 1, padding: '1rem 1.5rem', borderRadius: '16px',
                background: viewMode === "doctor" ? 'linear-gradient(135deg, #00d4ff, #0099cc)' : 'rgba(255,255,255,0.08)',
                color: viewMode === "doctor" ? 'white' : 'rgba(255,255,255,0.85)',
                border: 'none', fontWeight: 700, cursor: 'pointer'
              }}
              onClick={() => setViewMode("doctor")}
            >
              👨‍⚕️ Doctor
            </button>
            <button
              style={{
                flex: 1, padding: '1rem 1.5rem', borderRadius: '16px',
                background: viewMode === "patient" ? 'linear-gradient(135deg, #00d4ff, #0099cc)' : 'rgba(255,255,255,0.08)',
                color: viewMode === "patient" ? 'white' : 'rgba(255,255,255,0.85)',
                border: 'none', fontWeight: 700, cursor: 'pointer'
              }}
              onClick={() => setViewMode("patient")}
            >
              👤 Patient
            </button>
          </div>
        </div>

        {/* Upload Section */}
        <div style={{ background: 'rgba(255,255,255,0.06)', padding: '2rem', borderRadius: '24px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.15)' }}>
          <h4 style={{ color: 'rgba(255,255,255,0.95)', marginBottom: '0.5rem' }}>Upload MRI / Medical Report</h4>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>Supports MRI, CT, X-ray images and PDF reports.</p>
          <button 
            style={{
              width: '100%', background: 'linear-gradient(135deg, #00d4ff, #0099cc)', 
              color: 'white', padding: '1.2rem', borderRadius: '20px', 
              border: 'none', fontWeight: 700, cursor: 'pointer'
            }}
            onClick={handleUpload}
          >
            🧠 Upload Scan / Report
          </button>
          <input ref={inputRef} type="file" accept=".txt,.pdf,.dcm,image/*" hidden onChange={handleFile} />
        </div>

        {/* System Buttons */}
        <div style={{ marginBottom: '2rem' }}>
          {(["full", "muscular", "skeletal", "nerves"] as System[]).map((s) => (
            <button
              key={s}
              style={{
                width: '100%', marginBottom: '1rem', padding: '1.2rem', 
                borderRadius: '20px', background: system === s ? 'linear-gradient(135deg, #00d4ff, #0099cc)' : 'rgba(255,255,255,0.06)',
                color: system === s ? 'white' : 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.2)',
                fontWeight: 700, cursor: 'pointer'
              }}
              onClick={() => setSystem(s)}
            >
              {s === "full" ? "Full Body" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Report Section */}
        <div style={{ background: 'rgba(255,255,255,0.06)', padding: '2rem', borderRadius: '24px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.15)' }}>
          <h4 style={{ color: 'rgba(255,255,255,0.95)', marginBottom: '1rem' }}>
            {viewMode === "doctor" ? "Clinical Summary" : "What We Found"}
          </h4>
          <div style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
            {getDisplayText() ||
              (viewMode === "doctor"
                ? "Upload MRI report to begin analysis"
                : "Upload your scan report to see results")}
          </div>
        </div>

        {/* Highlights Section */}
        {highlights.length > 0 && (
          <div style={{ background: 'rgba(255,255,255,0.06)', padding: '2rem', borderRadius: '24px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.15)' }}>
            <h4 style={{ color: 'rgba(255,255,255,0.95)', marginBottom: '1.5rem' }}>
              {viewMode === "doctor" ? "Pathology Highlights" : "Problem Areas"}
            </h4>
            {highlights.map((h) => {
              const severityClass = h.severity.toLowerCase();
              return (
                <div
                  key={h.meshName}
                  style={{
                    padding: '1rem', marginBottom: '1rem', borderRadius: '16px',
                    background: 'rgba(255,255,255,0.1)', cursor: 'pointer',
                    border: `2px solid ${severityClass === 'severe' ? '#ff4444' : severityClass === 'moderate' ? '#ffaa00' : '#44ff44'}30`
                  }}
                  onClick={() => {
                    setSystem(
                      h.meshName.includes("Nerves") ? "nerves" :
                      h.meshName.includes("Vertebra") || h.meshName.includes("Sacrum") ? "skeletal" : "full"
                    );
                  }}
                >
                  {getFindingLabel(h.meshName, h.severity)}
                </div>
              );
            })}
          </div>
        )}

        {/* Logout */}
        <button
          style={{
            width: '100%', background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white', padding: '1.2rem', borderRadius: '20px',
            border: 'none', fontWeight: 700, cursor: 'pointer'
          }}
          onClick={() => { logout(); navigate("/login"); }}
        >
          Logout
        </button>
      </aside>

      {/* Main Viewer */}
      <main style={{ flex: 1, padding: '3rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '24px',
          marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <span style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1.1rem', fontWeight: 600 }}>
            {viewMode === "doctor" ? "👨‍⚕️ Doctor Mode" : "👤 Patient Mode"} • {role}
          </span>
          <button style={{
            background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white',
            padding: '1rem 2rem', borderRadius: '20px', border: 'none',
            fontWeight: 700, cursor: 'pointer'
          }} onClick={exportToPdf}>
            📄 Export PDF
          </button>
        </div>
        <AnatomyViewer system={system} highlights={highlights} />
      </main>
    </div>
  );
}
