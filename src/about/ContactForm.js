import { useState } from "react";
import { db } from "../firebaseConfig";  
import { collection, addDoc } from "firebase/firestore";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(""); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        timestamp: new Date(),
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
      setStatus("Message sent successfully!");
    } catch (error) {
      console.error("Error submitting message:", error);
      setStatus("Error sending message. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      <h2>Connect with Our Team</h2>
      <form action="https://formsubmit.co/contact.thenexusleague@gmail.com" method="POST" onSubmit={handleSubmit} className="contact-form" >
        <input
          type="text"
          name="name"
          placeholder="First & Last Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
        />
        
        <button type="submit">Send Message</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default ContactForm;
