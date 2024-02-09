import React, { useState } from 'react';
import { handleForgotPassword } from '../../services/authService';

const  ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleForgotPassword(email);
  };

  return (
    <div>
      <h2>Esqueceu sua senha?</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
