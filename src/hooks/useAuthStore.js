import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../apis/calendarApi";
import { onChecking, onLogging, onLoggout, clearErrorMsg, onLogoutCalendar } from "../store";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMsg } = useSelector((state) => state.auth);

  const startLogging = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      // Hago la peticion a la api
      // Si sale bien la peticion
      const { data } = await calendarApi.post("/auth", { email, password });
      // Guardo el token en el localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-data", new Date().getTime());
      // Dispatch de la accion
      dispatch(onLogging({ name: data.name, id: data.uid }));
    } catch (error) {
      dispatch(onLoggout("Credenciales Incorrectas"));

      setTimeout(() => {
        dispatch(clearErrorMsg());
      }, 10);
    }
  };

  const startRegister = async ({ email, password, name }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post("/auth/new", {
        email,
        password,
        name,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-data", new Date().getTime());
      // Dispatch de la accion
      dispatch(onLogging({ name: data.name, id: data.uid }));
    } catch (error) {
      dispatch(
        onLoggout(error.response.data?.errors || error.response.data?.msg)
      );

      setTimeout(() => {
        dispatch(clearErrorMsg());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLoggout());

    try {
      const { data } = await calendarApi.get("auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogging({ name: data.name, uid: data.uid }));

    } catch (error) {
      localStorage.clear();
      dispatch(onLoggout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch ( onLoggout() );
    dispatch( onLogoutCalendar() );
}

  return {
    // Porpiedades
    errorMsg,
    status,
    user,

    // Metodos
    checkAuthToken,
    startLogging,
    startLogout,
    startRegister,
  };
};
