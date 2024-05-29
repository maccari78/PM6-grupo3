import React from "react";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Iniciar Sesión
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
