import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="logo">Contact Admin</h2>
        <p>Need access? Send us a message.</p>

        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" required />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea rows={4} placeholder="Tell us about your request..." />
          </div>

          <button className="login-btn" type="submit">
            Send Message
          </button>
        </form>

        <p className="login-footer">
          Back to <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
}
