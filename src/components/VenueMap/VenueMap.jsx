import React from "react";
import { motion } from "framer-motion";
import { FaLocationArrow, FaMapMarkerAlt } from "react-icons/fa";
import "./VenueMap.css";

const VenueMap = () => {
  const mapQueryUrl = "https://www.google.com/maps/search/?api=1&query=26.9735875,84.8497597";
  const embedMapUrl = "https://maps.google.com/maps?q=26.9735875,84.8497597&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section className="venue-map-section" id="venue">
      <motion.div
        className="venue-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="venue-top-label">विवाह स्थल • VENUE</span>
        <h2 className="venue-main-title font-cursive">Where We Celebrate</h2>
        <div className="title-divider">
          <span className="feather">✦</span>
        </div>
        <div className="venue-address-box">
          <p className="venue-name-hi">होटल पंकज वाटिका (Hotel Pankaj Vatika)</p>
          {/* <p className="venue-full-address">
            <FaMapMarkerAlt className="marker-icon" />
            Pankaj Chowk, Main Road, Raxaul, East Champaran-845305, Bihar
          </p> */}
          <p className="venue-full-address-hi">
            पंकज चौक, मेन रोड, रक्सौल, पूर्वी चम्पारण - 845305, बिहार
          </p>
        </div>
      </motion.div>

      <motion.div
        className="map-frame-wrapper"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, delay: 0.15 }}
      >
        <div className="map-frame-outer">
          <iframe
            title="विवाह स्थल मानचित्र - होटल पंकज वाटिका, रक्सौल"
            src={embedMapUrl}
            className="google-map-iframe"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>

      <motion.div
        className="directions-action-box"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25 }}
      >
        <a
          href={mapQueryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="directions-btn"
          title="Google Maps पर रास्ता देखें"
        >
          <FaLocationArrow className="btn-icon" />
          <span>Get Directions</span>
        </a>
      </motion.div>
    </section>
  );
};

export default VenueMap;

