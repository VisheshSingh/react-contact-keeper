import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to="/" component={Home}>
            {' '}
            Home{' '}
          </Link>
        </li>
        <li>
          <Link to="/about" component={About}>
            {' '}
            About{' '}
          </Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'
};

export default Navbar;
