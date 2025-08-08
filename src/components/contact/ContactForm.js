import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { useLanguage } from '../../context/LanguageContext';
import Loader from '../loader/loader.js';
import './ContactForm.css';

const ContactForm = () => {
  // Create a ref for the form
  const form = useRef();
  const { t, language } = useLanguage();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getContactInfoString = (formRef) => {
    const formData = new FormData(formRef.current);
    const phone = formData.get("phone");
    const email = formData.get("email");
    const name = formData.get("name");
    const message = formData.get("message");

    const emailParams = {
      from_name: name,  // Sender's email
      mobile: phone,
      email: email,
      message: message
    };
    return emailParams;
  };

  // Handler to send email using EmailJS
  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const contactInfo = getContactInfoString(form);
     
    emailjs
      .send(
        "service_oudwv95", // Replace with your EmailJS service ID
        "template_gg9ru2g", // Replace with your EmailJS template ID
        contactInfo, 
        "huuTmLf5Z2_bn1-4T" // Replace with your EmailJS user/public key
      )
      .then(
        (result) => {
          setIsLoading(false);
          setMessage(t('contactUs.successMessage'));
          setTimeout(() => setMessage(""), 5000)
          // Optionally clear the form or display a success message
        },
        (error) => {
          setIsLoading(false);
          setError(t('contactUs.errorMessage'))
          setTimeout(() => setError(""), 5000)
        }
      );
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="contact-form-wrap">
        <div className="section-title text-center mb-60">
          <span className="sub-title articles-subtitle">
            {t('contactUs.heading')}
          </span>
          <h2 className="title articles-title">
            {t('contactUs.subHeading')}
            <br />
            {t('contactUs.question')}
          </h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            <form ref={form} onSubmit={sendEmail} className="contact-form">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="form-grp text-center">
                    <input
                      type="text"
                      name="phone"
                      placeholder={t('contactUs.phonePlaceholder')}
                      required
                      className="form-control contact-input"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="form-grp text-center">
                    <input
                      type="email"
                      name="email"
                      placeholder={t('contactUs.emailPlaceholder')}
                      required
                      className="form-control contact-input"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="form-grp text-center">
                    <input
                      type="text"
                      name="name"
                      placeholder={t('contactUs.namePlaceholder')}
                      required
                      className="form-control contact-input"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
              
              <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 col-sm-12">
                  <div className="form-grp text-center">
                    <textarea
                      name="message"
                      placeholder={t('contactUs.messagePlaceholder')}
                      required
                      rows="5"
                      className="form-control contact-textarea"
                      disabled={isLoading}
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-12">
                  <div className="form-btn text-center">
                    <button 
                      type="submit" 
                      className="btn contact-btn"
                      disabled={isLoading}
                    >
                      {isLoading ? t('contactUs.sending') : t('contactUs.submitButton')}
                    </button>
                  </div>
                </div>
              </div>
              
              {message && (
                <div className="row justify-content-center mt-3">
                  <div className="col-lg-8 col-md-10 col-sm-12">
                    <div style={{ fontSize: "16px", color: "#A9D15A", textAlign: "center" }}>
                      {message}
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="row justify-content-center mt-3">
                  <div className="col-lg-8 col-md-10 col-sm-12">
                    <div style={{ fontSize: "16px", color: "red", textAlign: "center" }}>
                      {error}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
