import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import './App.css';

const schema = Joi.object({
  registrationNumber: Joi.string().required().label('Registration Number'),
  password: Joi.string().min(6).required().label('Password'),
});

type FormData = {
  registrationNumber: string;
  password: string;
};

function App() {
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: joiResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setMessage(`Welcome, user ${data.registrationNumber}!`);
  };

  return (
    <div className="form-container">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label htmlFor="registrationNumber">Registration Number</label>
          <input id="registrationNumber" {...register('registrationNumber')} />
          {errors.registrationNumber && <span>{errors.registrationNumber.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register('password')} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button type="submit">Login</button>
      </form>

      {message && <p className="success-message">{message}</p>}
    </div>
  );
}

export default App;
