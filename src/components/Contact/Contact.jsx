import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import ContactWires from "../canvas/ContactWires.jsx";
import FloatingIcons from "../canvas/FloatingIcons.jsx";
import { FaWhatsapp } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    emailjs
      .send(
        "service_lpm9of4",
        "template_6qay6ma",
        { from_name: formData.name, from_email: formData.email, message: formData.message },
        "9vO-3ztAsmAGYi_cZ"
      )
      .then(
        () => {
          showToast("success", "Message sent successfully");
          setFormData({ name: "", email: "", message: "" });
          setLoading(false);
        },
        () => {
          showToast("error", "Something went wrong. Please try again.");
          setLoading(false);
        }
      );
  };

  const openWhatsApp = () => {
    const phone = "923114277133";
    const message = encodeURIComponent(
      "Hi Zohaib! I found your portfolio and would like to discuss a project."
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <section id="contact" className="ct-section">
      <ContactWires />
      <FloatingIcons />

      <div className="ct-inner">
        {/* Left — heading + info */}
        <div className="ct-left">
          <div className="ct-eyebrow">
            <span className="eyebrow-line" />
            Get In Touch
          </div>

          <h2 className="ct-title">
            <span className="ct-t-solid">Let's</span>
            <span className="ct-t-stroke">build</span>
            <span className="ct-t-faint">something</span>
          </h2>

          <p className="ct-desc">
            Have a project in mind or want to explore how we can work together?
            Drop a message and I'll get back to you.
          </p>

          <div className="ct-info">
            <a href="mailto:hzuhaib57@gmail.com" className="ct-info-item">
              <span className="ct-info-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
              </span>
              <div>
                <p className="ct-info-label">Email</p>
                <p className="ct-info-val">hzuhaib57@gmail.com</p>
              </div>
            </a>

            <a href="tel:+923114277133" className="ct-info-item">
              <span className="ct-info-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.51-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </span>
              <div>
                <p className="ct-info-label">Phone</p>
                <p className="ct-info-val">+92 311 4277133</p>
              </div>
            </a>

            <button className="ct-wa-btn" onClick={openWhatsApp}>
              <FaWhatsapp />
              Chat on WhatsApp
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Right — form */}
        <div className="ct-form-wrap">
          <div className="ct-form-header">
            <span className="ct-form-dot ct-dot-red" />
            <span className="ct-form-dot ct-dot-yellow" />
            <span className="ct-form-dot ct-dot-green" />
            <span className="ct-form-title-bar">message.send()</span>
          </div>

          <form className="ct-form" onSubmit={handleSubmit}>
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-name">Your Name</label>
              <input
                id="ct-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="John Doe"
                className="ct-input"
              />
            </div>

            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-email">Email Address</label>
              <input
                id="ct-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="john@example.com"
                className="ct-input"
              />
            </div>

            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-message">Message</label>
              <textarea
                id="ct-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Tell me about your project..."
                className="ct-input ct-textarea"
              />
            </div>

            <button type="submit" disabled={loading} className="ct-submit">
              {loading ? (
                <span className="ct-spinner" />
              ) : (
                <>
                  Send Message
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <div className={`ct-toast ct-toast-${toast.type}`}>
          {toast.type === "success" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          )}
          {toast.message}
        </div>
      )}

      {/* WhatsApp FAB */}
      <button className="ct-wa-fab" onClick={openWhatsApp} aria-label="Chat on WhatsApp">
        <FaWhatsapp />
      </button>
    </section>
  );
};

export default Contact;