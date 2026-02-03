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
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "9vO-3ztAsmAGYi_cZ"
      )
      .then(
        () => {
          showToast("success", "Message sent successfully 🚀");
          setFormData({ name: "", email: "", message: "" });
          setLoading(false);
        },
        () => {
          showToast("error", "Something went wrong. Please try again ❌");
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
    <section id="contact" className="contact-section">
      <ContactWires />
      <FloatingIcons />

      <div className="contact-content">
        <h2>Let's Connect</h2>
        <p>Have a project in mind or just want to say hi? Send me a message!</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="name" value={formData.name} onChange={handleChange} required disabled={loading} placeholder=" " />
            <label>Your Name</label>
            <span className="highlight"></span>
          </div>
          <div className="form-group">
            <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={loading} placeholder=" " />
            <label>Your Email</label>
            <span className="highlight"></span>
          </div>
          <div className="form-group">
            <textarea name="message" value={formData.message} onChange={handleChange} required disabled={loading} placeholder=" "></textarea>
            <label>Your Message</label>
            <span className="highlight"></span>
          </div>

          <button type="submit" disabled={loading} className="send-btn">
            {loading ? <span className="spinner"></span> : "Send Message"}
          </button>
        </form>
      </div>

      {toast.show && <div className={`toast ${toast.type}`}>{toast.message}</div>}

      <button className="whatsapp-float" onClick={openWhatsApp}>
        <FaWhatsapp />
      </button>
    </section>
  );
};

export default Contact;
