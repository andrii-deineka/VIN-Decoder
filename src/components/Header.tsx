import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="nav-brand">
            <Link to="/" className="nav-link brand-link">VIN Decoder</Link>
          </div>
          <ul className="nav-list">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/variables"
                className={`nav-link ${location.pathname.startsWith('/variables') ? 'active' : ''}`}
              >
                Variables
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;