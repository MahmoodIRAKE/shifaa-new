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

      {/* Contact Info Area */}
      <section className="contact-area">
        <div className="container">
          <div className="contact-box-wrapper">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 col-sm-9">
                <ContactInfo 
                  icon="far fa-map"
                  title={t('contact.officeAddress')}
                  description={t('contact.officeAddressDesc')}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-9">
                <ContactInfo 
                  icon="fas fa-phone"
                  title={t('contact.phoneNumber')}
                  description={t('contact.phoneNumberDesc')}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-9">
                <ContactInfo 
                  icon="fas fa-globe"
                  title={t('contact.webConnect')}
                  description={t('contact.webConnectDesc')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Area */}
      <section className="contact-form-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <ContactMap />
            </div>
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
