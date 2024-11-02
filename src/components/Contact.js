import React from 'react';
import './Contact.css'; // Import the CSS file

const Contact = () => {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.</p>
            <form className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
            <div className="contact-info">
                <h2>Contact Information</h2>
                <p>If you prefer to reach us directly, here’s how:</p>
                <p><strong>Email:</strong> <a href="mailto:info@example.com">info@example.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+1234567890">+1 234 567 890</a></p>
                <p><strong>Address:</strong> 123 News Lane, Suite 100, City, Country</p>
            </div>
        </div>
    );
};

export default Contact;
