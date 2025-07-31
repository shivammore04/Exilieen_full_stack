import React, { useState, useEffect } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  // NEW: State to hold validation errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // ... (This useEffect is unchanged)
  }, []);

  // UPDATED: handleChange now includes real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // --- Real-time validation logic ---
    let error = "";
    if (name === "name") {
      if (!value.trim()) {
        error = "Name is required.";
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        error = "Name can only contain alphabets and spaces.";
      }
    } else if (name === "email") {
      if (!value.trim()) {
        error = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Please enter a valid email address.";
      }
    } else if (name === "subject" && !value.trim()) {
      error = "Subject is required.";
    } else if (name === "message" && !value.trim()) {
      error = "Message is required.";
    }
    
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  // NEW: Function to validate the entire form before submitting
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim() || !/^[A-Za-z\s]+$/.test(formData.name)) newErrors.name = "Please enter a valid name (alphabets and spaces only).";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    
    setErrors(newErrors);
    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // UPDATED: Check for validation before submitting
    if (!validateForm()) {
      setStatus("❌ Please fix the errors before submitting.");
      return;
    }

    setStatus("Sending...");
    try {
      // ... (Your existing fetch logic is unchanged)
      const response = await fetch("https://exilieen-full-stack.onrender.com/contact", { /* ... */ });
      // ... (rest of your submit logic)
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="contact-section">
      <div className="contact-container">
        {/* ... (Your existing contact info and map are unchanged) ... */}
        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {/* NEW: Error message display */}
              {errors.name && <p className="error-message">{errors.name}</p>}
              
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {/* NEW: Error message display */}
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            {/* NEW: Error message display */}
            {errors.subject && <p className="error-message">{errors.subject}</p>}

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            {/* NEW: Error message display */}
            {errors.message && <p className="error-message">{errors.message}</p>}

            <button type="submit">Send Message</button>
            <p className="status-msg">{status}</p>
          </form>
        </div>
        {/* ... (Your chatbot box is unchanged) ... */}
      </div>
    </div>
  );
};

export default Contact;