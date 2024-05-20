import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { setLocalStorageKeyValue } from "../services/localstorageService";
import { login } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setloginData } = useContext(AuthContext);
  const { setLoginToken } = useContext(AuthContext);
  const [isApiError, setIsApiError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email: email, password: password };
    const response = await login(user);
    if (response?.data?.success) {
      setloginData(response?.data?.data);
      console.log(response?.data?.data)
      setLoginToken(response?.data?.data?.token);
      reloadPage();
    } else {
      setIsApiError(true);
      setErrorMsg(response?.response?.data?.message);
      // console.log(response?.response?.data?.message)
    }
    // setLocalStorageKeyValue('authData', JSON.stringify(user))
    // Add your authentication logic here
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 bg-opacity-0 py-12 px-4 sm:px-6 lg:px-8 opacity-75">
      <div
        style={{
          backgroundImage: `url(${require("../Photos/petroimg.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          filter: "brightness(30%)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, 
        }}
      ></div>
      <div className=" h-96 flex items-center justify-center bg-gray-50 bg-opacity-100 py-12 px-4 sm:px-6 lg:px-8 rounded-xl">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-black-500">
              Sign in to your Account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm  space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email Id
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email Id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {isApiError ? (
                <span className="font-medium text-sm text-danger">
                  {" "}
                  {errorMsg}
                </span>
              ) : null}
            </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-800 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div> 

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-[#0265cf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
