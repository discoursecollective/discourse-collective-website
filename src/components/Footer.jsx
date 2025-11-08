import React from 'react';
import { FaInstagram, FaTiktok, FaXTwitter, FaEnvelope } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="max-w-6xl mx-auto px-5 pb-10 border-t border-slate-200 pt-6">
      <div className="flex items-center justify-between flex-wrap gap-6">
        
        {/* Social Media and Contact */}
        <div className="flex items-center flex-wrap gap-6">
          
          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/discourse.collective"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-pink-100 hover:text-pink-600 transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@discourse.collective"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-black hover:text-white transition-colors duration-200"
                aria-label="Follow us on TikTok"
              >
                <FaTiktok className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/Dcollective2025"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-black hover:text-white transition-colors duration-200"
                aria-label="Follow us on X (Twitter)"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Email Contact */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:info@discoursecollective.co.uk"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200"
            >
              <FaEnvelope className="w-4 h-4" />
              info@discoursecollective.co.uk
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-sm text-slate-500">
          © 2025 Discourse Collective
        </div>
      </div>
    </footer>
  );
};

export default Footer;