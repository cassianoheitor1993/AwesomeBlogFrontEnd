import React from 'react';
import './About.css'; // Import the CSS file

const About = () => {
    return (
        <div className="about-page">
            <h1>About Us</h1>
            <p>Welcome to our amazing blog news application!</p>
            
            <h2>Our Mission</h2>
            <p>Our mission is to provide our readers with timely, accurate, and engaging news coverage that empowers them to make informed decisions. We strive to be a reliable source of information in a rapidly changing world.</p>

            <h2>Who We Are</h2>
            <p>We are a team of passionate developers, writers, and editors dedicated to delivering the latest news and trends across various topics. Our diverse backgrounds and expertise allow us to cover a wide range of subjects, ensuring that there is something for everyone.</p>

            <h2>What We Offer</h2>
            <ul>
                <li><strong>Timely News Updates:</strong> Stay informed with our up-to-date articles covering current events, technology, health, lifestyle, and more.</li>
                <li><strong>In-Depth Analysis:</strong> Dive deeper into the stories that matter with our thoughtful analyses and commentary.</li>
                <li><strong>Interviews with Experts:</strong> Gain insights from industry leaders and experts through our exclusive interviews.</li>
                <li><strong>Community Engagement:</strong> We value our readers’ opinions and encourage discussions in the comments section of our articles.</li>
            </ul>

            <h2>Our Values</h2>
            <p>Integrity, transparency, and inclusiveness are at the heart of what we do. We are committed to delivering high-quality journalism that respects our readers' right to information while upholding ethical standards.</p>

            <h2>Join Us</h2>
            <p>We invite you to explore our articles, engage with our community, and share your thoughts with us. Your feedback is invaluable as we strive to improve and expand our offerings. Together, we can foster a space for informed discussions and knowledge sharing.</p>

            <h2>Contact Us</h2>
            <p>If you have any questions, suggestions, or feedback, feel free to reach out to us at <a href="mailto:info@example.com">info@example.com</a>. We’d love to hear from you!</p>

            <p>Stay tuned for exciting articles, insightful interviews, and much more!</p>
        </div>
    );
};

export default About;
