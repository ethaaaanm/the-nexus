import { useState, React } from "react";

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

  return (
    <div className="contact-container">
      <h2 className="about-connect-title">Connect with Our Team</h2>
      <h5 className="about-connect-inquiries">Questions? Comments? Concerns? Reach out to our team and we'd love to help you out!</h5>
      
      <form className="about-connect-form" target="_blank" action="https://formsubmit.co/contact.thenexusleague@gmail.com" method="POST">
      <input type="hidden" name="_blacklist" value="spammy pattern, banned term, phrase"/>
      <input type="hidden" name="_captcha" value="false"/>
      <input type="hidden" name="_next" value="https://ethaaaanm.github.io/the-nexus/submitted" />
      <div className="about-personal-info-row">
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
      </div>
        
        <input
          className="contact-subject-form"
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
        className="contact-message-form"
          name="message"
          placeholder="Message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="contact-submit-button">Send</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default ContactForm;
