import React from 'react';

interface FooterProps {
  extra?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ extra }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Powered by NHTSA Vehicle API</p>
        {extra && <div className="footer-extra">{extra}</div>}
      </div>
    </footer>
  );
};

export default Footer;