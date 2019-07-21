import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Login = () => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Email and password are necessary', 'danger');
    } else {
      console.log('Login submit');
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={onChange} />
        </div>
        <input
          type="submit"
          value="login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
