



export const getEnvVariables = () => {
  
  //! Esta generando error
  // Para obtener las varibles de entorno en Vite
  // import.meta.env;

  // La devuelvo
  return {
    // Resuelto
    VITE_API_URL: import.meta.env.VITE_API_URL,
    ...import.meta.env,
  };
};
