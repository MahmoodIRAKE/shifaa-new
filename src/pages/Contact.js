import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import ContactMap from '../components/contact/ContactMap';
import BreadcrumbArea from '../components/common/BreadcrumbArea';
import '../assets/css/style.css';
import '../assets/css/responsive.css';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="main-area fix">
      {/* Breadcrumb Area */}
      <BreadcrumbArea 
        title={t('contact.title')} 
        breadcrumbs={[
          { name: t('nav.home'), link: '/' },
          { name: t('contact.title'), link: '/contact' }
        ]}
      />



      {/* Contact Form Area */}
      <section className="contact-form-area">
        <div className="container">
          <div className="row">
  
            <div className="col-xl-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
