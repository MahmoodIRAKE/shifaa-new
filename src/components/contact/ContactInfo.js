import React from 'react';

const ContactInfo = ({ icon, title, description }) => {
  return (
    <div className="contact-box">
      <div className="contact-icon">
        <span className="overlay-icon"><i className="fas fa-check"></i></span>
        <i className={icon}></i>
      </div>
      <div className="contact-content">
        <h5 className="title">{title}</h5>
        <p className="contact-desc">{description}</p>
      </div>
    </div>
  );
};

export default ContactInfo;
