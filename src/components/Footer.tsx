import React from 'react';

interface FooterProps {
  extra?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ extra }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Powered by NHTSA Vehicle API{extra}
        </p>
      </div>
    </footer>
  );
};

export default Footer;