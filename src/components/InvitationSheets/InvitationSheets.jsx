import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gateImage from "../../assets/images/gate-view.jpg";
import webCont1 from "../../assets/images/WebCont1.png";
import webCont2 from "../../assets/images/WebCont2.png";
import "./InvitationSheets.css";

export default function InvitationSheets() {
  const [selectedImage, setSelectedImage] = useState(null);

  const cardAnimation = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="invitation-sheets-section" id="invitation-cards">
      {/* SECTION INTRO - CENTERED */}
      <div className="section-header">
        <span className="section-subtitle">॥ मङ्गलम् भगवान विष्णुः मङ्गलम् गरुडध्वजः ॥</span>
        <h2 className="section-title">शुभ विवाह निमंत्रण पत्र</h2>
        <div className="title-divider">
          <span className="gold-flourish">❧</span>
          <span className="feather">✦</span>
          <span className="gold-flourish">❧</span>
        </div>
      </div>

      <div className="invitation-layout-container">
        {/* ============================================================== */}
        {/* TOP: GATE VIEW IMAGE (PERFECTLY CENTERED)                      */}
        {/* ============================================================== */}
        <motion.div
          className="gate-view-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={cardAnimation}
        >
          <div
            className="gate-card-frame"
            onClick={() => setSelectedImage({ src: gateImage, alt: "शुभ विवाह का शुभारंभ" })}
            title="क्लिक करके बड़ा देखें"
          >
            <div className="card-inner-glow">
              <img
                src={gateImage}
                alt="शुभ विवाह का शुभारंभ - तोरण द्वार"
                className="gate-image-el"
                loading="lazy"
              />
            </div>
            <div className="card-hover-hint">
              <span>🔍 बड़ा करके देखें</span>
            </div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* BOTTOM: WEBCONT1 & WEBCONT2 SIDE-BY-SIDE IN 2 COLUMNS         */}
        {/* ============================================================== */}
        <div className="sheets-row-grid">
          {/* LEFT: WEBCONT1 (CONTENT 1) */}
          <motion.div
            className="sheet-column-item"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={cardAnimation}
          >
            <div
              className="sheet-card-frame"
              onClick={() => setSelectedImage({ src: webCont1, alt: "पावन परिणय आमंत्रण - Content 1" })}
              title="क्लिक करके बड़ा देखें"
            >
              <div className="card-inner-glow">
                <img
                  src={webCont1}
                  alt="पावन परिणय आमंत्रण - मनिष संग आरती"
                  className="sheet-image-el"
                  loading="lazy"
                />
              </div>
              <div className="card-hover-hint">
                <span>🔍 बड़ा करके देखें</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: WEBCONT2 (CONTENT 2) */}
          <motion.div
            className="sheet-column-item"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              ...cardAnimation,
              visible: { ...cardAnimation.visible, transition: { duration: 0.8, delay: 0.15, ease: "easeOut" } }
            }}
          >
            <div
              className="sheet-card-frame"
              onClick={() => setSelectedImage({ src: webCont2, alt: "मांगलिक कार्यक्रम - Content 2" })}
              title="क्लिक करके बड़ा देखें"
            >
              <div className="card-inner-glow">
                <img
                  src={webCont2}
                  alt="मांगलिक कार्यक्रम - विवाह समय सारणी"
                  className="sheet-image-el"
                  loading="lazy"
                />
              </div>
              <div className="card-hover-hint">
                <span>🔍 बड़ा करके देखें</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* HIGH RESOLUTION LIGHTBOX MODAL ON CLICK                        */}
      {/* ============================================================== */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close-btn"
                onClick={() => setSelectedImage(null)}
                aria-label="बंद करें"
              >
                ✕
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="lightbox-full-img"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
