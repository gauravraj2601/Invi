import React from "react";
import { motion } from "framer-motion";
import coupleImage from "../../assets/images/123a-mFf66JLV.jpeg";
import "./CoupleSection.css";

const CoupleSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="couple-section" id="couple">
      <div className="section-header">
        <span className="section-subtitle">॥ दो आत्माओं का पावन बंधन ॥</span>
        <h2 className="section-title">शाही दम्पति का परिचय</h2>
        <div className="title-divider">
          <span className="feather">✦</span>
        </div>
        <p className="couple-quote">
          "प्रेम केवल एक साथ बिताए पलों की गिनती नहीं, बल्कि हर दिन एक-दूसरे से और अधिक स्नेह करने का पवित्र संकल्प है।"
        </p>
      </div>

      <div className="couple-container">
        {/* Groom Card */}
        <motion.div
          className="couple-card groom-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
        >
          <div className="card-decor top"></div>
          <div className="avatar-wrapper">
            <div className="avatar-initial">म</div>
          </div>
          <span className="card-role">वर (दूल्हा)</span>
          <h3 className="couple-name">मनिष व्याहुत</h3>
          <p className="parents-info">सुपुत्र श्रीमती सावित्री देवी एवं श्री किशोरी प्रसाद</p>
          <div className="card-divider"></div>
          <p className="couple-desc">
            शांत, विचारशील और स्नेहपूर्ण व्यक्तित्व। मनिष जीवन के इस नए सफर में आरती के साथ प्रेम, विश्वास और खुशियों से भरा संसार बसाने के लिए उत्सुक हैं।
          </p>
          <div className="card-decor bottom"></div>
        </motion.div>

        {/* Center Image */}
        <motion.div
          className="couple-center-image"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="gold-frame">
            <div className="inner-frame"></div>
            <img
              src={coupleImage}
              alt="मनिष एवं आरती"
              className="couple-portrait"
            />
            <div className="corner-decor top-right"></div>
            <div className="corner-decor bottom-left"></div>
          </div>
        </motion.div>

        {/* Bride Card */}
        <motion.div
          className="couple-card bride-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
        >
          <div className="card-decor top"></div>
          <div className="avatar-wrapper">
            <div className="avatar-initial">आ</div>
          </div>
          <span className="card-role">वधू (दुल्हन)</span>
          <h3 className="couple-name">आरती कुमारी</h3>
          <p className="parents-info">सुपुत्री श्रीमती माया देवी एवं श्री रामशंकर प्रसाद</p>
          <div className="card-divider"></div>
          <p className="couple-desc">
            सहज, स्नेहमयी और सकारात्मक ऊर्जा की धनी। आरती अपने माधुर्य और आत्मीयता से सबके जीवन में उमंग और खुशियाँ बिखेरती हैं।
          </p>
          <div className="card-decor bottom"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleSection;
