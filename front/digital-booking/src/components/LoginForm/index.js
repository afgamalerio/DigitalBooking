import React, { useState } from 'react';
import './LoginForm.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from "react-router";
import Button from '../Button';
import userService from '../../services/users';
import { getSession } from '../../services/auth';

const LoginForm = ({reservationLogin}) => {

  const history = useHistory();
  const [error, setError] = useState(false);

  const authUser = async (values) => {
    try {
      const data = await userService.authUser(values)
      if (data.status === 200) {
        let user = data.data;
        localStorage.setItem('token', user.jwt)

        let mail = getSession()

        localStorage.setItem('email', mail.data.sub)
        localStorage.setItem('name', user.name)
        localStorage.setItem('lastname', user.lastname)
        localStorage.setItem('id', user.id)
        localStorage.setItem('rol', user.rol.name)
        
        reservationLogin ? 
        history.goBack() :
        history.push("/")
      }


    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  return (

    <div className="login-container">
      <h1 className="login-title">Iniciar sesión</h1>
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}

        validate={values => {
          let errors = {};
          // email validation
          if (!values.username) { errors.username = 'Por favor ingresa un correo electronico'; }
          else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)) {
            errors.username = 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.';
          }
          // Password validation
          if (!values.password) {
            errors.password = 'Por favor ingresa una contraseña'
          } else if (!/^[a-zA-Z0-9_.+-]{6,}$/.test(values.password)) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
          }
          return errors;
        }}


        onSubmit={async (values) => {
          authUser(values);
        }}
      >

        {({ isSubmitting }) => (

          <Form className="login-form">
            <label className="login-form-label" htmlFor="username" data-testid="username">Correo electrónico</label>
            <Field className="login-form-input" type="email" name="username" id="username" />
            <ErrorMessage name="username" render={msg => <div className="error">{msg}</div>} />
            <label className="login-form-label" data-testid="password">Contraseña</label>
            <Field className="login-form-input" type="password" name="password" />
            <ErrorMessage name="password" render={msg => <div className="error">{msg}</div>} />

            {error ? <p className="form-error">Lamentablemente no ha podido iniciar sesión. Por favor intente más tarde</p> : null}
            <Button variant="button-full" className="login-form-submit" type="submit">Ingresar</Button>
          </Form>

        )}
      </Formik>
      <p className="login-subtext">¿Aún no tenes cuenta? <span className="login-subtext-link" onClick={() => history.push("/signup")}>Registrate</span></p>
    </div>
  );
};

export default LoginForm;