import React from "react";
import logo from "../../assets/images/MA_nobackground_logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo-box">
          <img src={logo} alt="मनिष एवं आरती" className="footer-logo" />
        </div>

        <h3 className="footer-names">मनिष संग आरती</h3>
        <p className="footer-blessing">॥ पावन परिणय व दाम्पत्य जीवन की मधुर बेला ॥</p>

        <div className="footer-divider">
          <span className="flourish">❧</span>
          <span className="star">✦</span>
          <span className="flourish">❧</span>
        </div>

        <p className="footer-date-venue">
          9 दिसम्बर 2026 • होटल पंकज वाटिका, रक्सौल
        </p>

        <p className="footer-welcome-note">
          आपकी स्नेहिल उपस्थिति ही हमारा सबसे बड़ा उपहार है
        </p>

        <div className="footer-shloka">
          ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
        </div>
      </div>
    </footer>
  );
};

export default Footer;
