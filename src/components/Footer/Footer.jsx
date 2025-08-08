import React, { useState, useRef, useEffect } from "react";
import './footer.css'
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const FooterMobile = ({id}) => {
    const [activeMenu, setActiveMenu] = useState("homePage");
    const { t } = useLanguage();
    const navigation = useNavigate();
    const footerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.1
            }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setActiveMenu(sectionId);
        }
    }

    function openInstagram() {
        window.open("https://www.instagram.com/shifaa.online/", "_blank");
    }

    function openFacebook() {
        window.open("https://www.facebook.com/profile.php?id=61568774203434", "_blank");
    }

    return <>
        <div 
            className={`footer-section-mobile ${isVisible ? 'footer-fade-in visible' : 'footer-fade-in'}`} 
            id={id}
            ref={footerRef}
        >
            <div className="footer-content-mobile">
                <div className="contact-info-mobile">
                    <a href="mailto:support@shifaa2.com" className="contact-item-mobile email-item">
                        <div className="icon-container">
                            <i className="icon-email" />
                        </div>
                        <span className="contact-text">support@shifaa2.com</span>
                    </a>
                    
                    <a href="tel:+972512551008" className="contact-item-mobile phone-item">
                        <div className="icon-container">
                            <i className="icon-phone" />
                        </div>
                        <span className="contact-text">+972-51-255-1008</span>
                    </a>
                </div>

                <div className="footer-divider" />

                <div className="social-section-mobile">
                    <div className="social-buttons">
                        <button 
                            className="social-button facebook" 
                            onClick={openFacebook}
                            aria-label="Facebook"
                        >
                            <div className="icon-facebook" />
                        </button>
                        
                        <button 
                            className="social-button instagram" 
                            onClick={openInstagram}
                            aria-label="Instagram"
                        >
                            <div className="icon-instagram" />
                        </button>
                    </div>

                    <span className="copyright-text">{t('footer.allRightsReserved')}</span>

                    <div className="policy-links">
                        <button 
                            className="policy-link" 
                            onClick={() => navigation("/policy-privacy")}
                        >
                            {t('footer.privacyPolicy')}
                        </button>
                        <div className="policy-divider" />
                        <button 
                            className="policy-link" 
                            onClick={() => navigation("/policy")}
                        >
                            {t('footer.termsOfService')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default FooterMobile;