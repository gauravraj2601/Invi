import { motion } from "framer-motion";
import logo from "../../assets/images/MA_nobackground_logo.png";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-content">
        <motion.div
          className="hero-details"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="logo-container">
            <img src={logo} alt="मनिष एवं आरती" className="hero-logo" />
          </div>

          <motion.div
            className="save-the-date"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            शुभ परिणयोत्सव
          </motion.div>

          <h1 className="hero-title">
            <span className="name">मनिष</span>
            <span className="ampersand">संग</span>
            <span className="name">आरती</span>
          </h1>

          <div className="divider-gold">
            <span className="dot"></span>
            <span className="line"></span>
            <span className="heart">♥</span>
            <span className="line"></span>
            <span className="dot"></span>
          </div>

          <motion.div
            className="hero-wedding-details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="hero-date">बुधवार, 9 दिसम्बर 2026</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-down-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <span className="scroll-text">नीचे स्क्रॉल करें</span>
        <div className="arrow-down"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
