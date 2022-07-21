import React, { useState } from 'react';
import "./Register.scss"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from "react-router";
import Button from '../Button';
import userService from '../../services/users';


const Register = () => {

	const history = useHistory();
	const [error, setError] = useState(false);

	const createUser = async (valores) => {
		try {
			delete valores.passwordVerification;
			const data = await userService.postUser(valores)

			if (data.status === 201) {
				let user = { username: valores.email, password: valores.password };
				authUser(user)

				localStorage.setItem('name', valores.name)
				localStorage.setItem('lastname', valores.lastname)
				localStorage.setItem('email', valores.email)


				const email = {
					email: valores.email,
					content: `<body style="width: 100%;">
					<table style="border-collapse:collapse;border:0;border-spacing:0; ">
						<tr>
							<td>
								<h1
									style="width:100%;border-collapse:collapse;border:0;border-spacing:0; font-family: Poppins; margin-bottom: 0; color: #263238;">
									¡Hola
									${valores.name}!</h1>
								<p
									style="width:100%;border-collapse:collapse;border:0;border-spacing:0; font-family: Poppins; margin-top: 6px; color: #263238;">
									Tu
									cuenta se ha creado exitosamente</p>
								<b
									style="width:100%;border-collapse:collapse;border:0;border-spacing:0; font-family: Poppins; color: #263238;">Gracias
									por elegir Digital Booking</b>
							</td>
						</tr>
						<tr style="width:100%;border-collapse:collapse;border:0;border-spacing:0; background-color:#FFFBE2;">
							<td>
								<a href="http://digitalbookingpig1.click/">
									<img src="
							https://pig1bucket.s3.amazonaws.com/imagenes%20producto/logo.png" alt="Logo Digital Booking"
										style="width: 120px; margin: 10px;" />
								</a>
							</td>
						</tr>
					</table>
				</body>`,
					subject: "Te damos la bienvenida a Digital Booking"
				}

				const dataEmail = await userService.sendEmail(email)

			}

		} catch (error) {
			console.log("aca", error)
			setError(true)
		}

	}

	const authUser = async (user) => {
		try {
			const token = await userService.authUser(user)
			if (token) {
				localStorage.setItem('token', token.data.jwt)
				localStorage.setItem('id', token.data.id)
				localStorage.setItem('rol', token.data.rol.name)
				history.push("/")
			}

		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<div className="register-container">
				<h3 className="register-title">Crear cuenta</h3>
				<Formik
					initialValues={{
						name: "",
						lastname: "",
						email: "",
						password: "",
						passwordVerification: ""
					}}
					validate={(valores) => {
						let errores = {};

						// Validacion nombre
						if (!valores.name) {
							errores.name = 'Por favor ingresa un nombre'
						} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(valores.name)) {
							errores.name = 'El nombre solo puede contener letras y espacios'
						}
						// Validacion apellido
						if (!valores.lastname) {
							errores.lastname = 'Por favor ingresa un apellido'
						} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(valores.lastname)) {
							errores.lastname = 'El apellido solo puede contener letras y espacios'
						}
						// Validacion correo
						if (!valores.email) {
							errores.email = 'Por favor ingresa un correo electronico'
						} else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i.test(valores.email)) {
							errores.email = 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.'
						}
						//Validacion contraseña
						if (!valores.password) {
							errores.password = 'Por favor ingresa una contraseña'
						} else if (!/^[a-zA-Z0-9_.+-]{6,}$/i.test(valores.password)) {
							errores.password = 'La contraseña debe tener al menos 6 caracteres.'
						}
						//Validacion verificacion contraseñas
						if (!valores.passwordVerification) {
							errores.passwordVerification = 'Por favor repita su contraseña'
						} else if (valores.password !== valores.passwordVerification) {
							errores.passwordVerification = 'Las contraseñas no son iguales'
						}
						return errores;
					}}
					onSubmit={async (valores) => {
						createUser(valores);
					}}
				>
					{({ errors }) => (
						<Form className="register-form" data-testid="form">
							<div className="register-form-name">
								{/* Form nombre */}
								<div>
									<label className='register-form-label' htmlFor="name">Nombre</label>
									<Field
										className="register-form-input"
										type="text"
										id="name"
										name="name"
										data-testid="field-name"
									/>
									<ErrorMessage name="name" render={msg => <div className="error">{msg}</div>} />
								</div>
								<div>
									{/* Form apellido */}

									<label className='register-form-label' htmlFor="lastname">Apellido</label>
									<Field
										className="register-form-input"
										type="text"
										id="lastname"
										name="lastname"
									/>
									<ErrorMessage name="lastname" render={msg => <div className="error">{msg}</div>} />
								</div>
							</div>
							{/* Form correo */}

							<label className='register-form-label' htmlFor="email">Correo electronico</label>
							<Field
								className="register-form-input"
								type="email"
								id="email"
								name="email"
							/>
							<ErrorMessage name="email" render={msg => <div className="error">{msg}</div>} />

							{/* Form contraseña */}

							<label className='register-form-label' htmlFor="password">Contraseña</label>
							<Field
								className="register-form-input"
								type="password"
								id="password"
								name="password"
							/>
							<ErrorMessage name="password" render={msg => <div className="error">{msg}</div>} />

							{/* Form verificacion contraseña */}

							<label className='register-form-label' htmlFor="passwordVerification">Confirmar Contraseña</label>
							<Field
								className="register-form-input"
								type="password"
								id="passwordVerification"
								name="passwordVerification"
							/>
							<ErrorMessage name="passwordVerification" render={msg => <div className="error">{msg}</div>} />
							{error ? <p className="form-error">Lamentablemente no ha podido registrarse. Por favor intente más tarde</p> : null}

							{/* Boton Submit */}
							<Button data-testid="button" variant="button-full" className="register-form-submit" type="submit">Crear cuenta</Button>
						</Form>
					)}
				</Formik>

				<p className="register-subtext">¿Ya tienes una cuenta? <span className="register-subtext-link" onClick={() => history.push("/login")}>Ingrese aqui</span></p>

			</div>
		</>
	);
}


export default Register