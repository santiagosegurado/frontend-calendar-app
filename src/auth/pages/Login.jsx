import React, { useEffect } from "react";
import { useAuthStore, useForm } from "../../hooks";
import "./Login.css";
import Swal from 'sweetalert2'

const loginForms = {
  loginEmail: "",
  loginPassword: "",
};

const registerForms = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const Login = () => {


  // Cusmtom Hooks
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginChange,
  } = useForm(loginForms);
  
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterChange,
  } = useForm(registerForms);

  const { startLogging, startRegister, errorMsg } = useAuthStore();

  // Handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    startLogging({ email: loginEmail, password: loginPassword });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (registerPassword !== registerPassword2) {
      Swal.fire('Error de Registro', 'Contraseñas no son iguales', 'error');
      return;
    }

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };

  // Hooks
  useEffect(() => {
    if (errorMsg !== undefined) {
      if (typeof errorMsg === 'string') {
        Swal.fire('Error en la autenticacion', errorMsg, 'error')
      }

      if (typeof errorMsg === 'object') {
        for (const key in errorMsg) {
          Swal.fire('Error en la autenticacion', errorMsg[key].msg, 'error');
        }
      }
    }
  }, [errorMsg])
  

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLoginSubmit} >
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginChange}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterChange}
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
