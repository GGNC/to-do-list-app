import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import AppLogo from "../assets/logos/app-logo.svg";
import Footer from "../components/Footer";

function LoginPage() {
  const [firstTime, setFirstTime] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen">
      <div className="container min-w-96 h-full w-full mx-auto flex flex-col flex-nowrap justify-start items-center">
        <div className="w-64 h-64 mt-20 m-1 bg-[#228be6] border-slate-200 border-2 rounded-full shadow-2xl shadow-gray-600 flex justify-center items-center">
          <img
            src={AppLogo}
            alt="App Logo"
            className="w-40 h-auto animate-scale"
          />
        </div>
        {firstTime ? (
          <>
            <div className="w-80 mt-8 flex flex-col items-start">
              <p className="-mb-4 p-0 font-extrabold text-2xl text-gray-700">
                Welcome to
              </p>
              <p className="inline-block m-0 p-0 font-extrabold text-7xl text-transparent bg-gradient-to-r from-[#fa5252] to-[#fd7e14] bg-clip-text drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                Taskpad
              </p>
            </div>
            <div className="w-96 mt-6 flex justify-center items-center gap-10">
              <Button
                className="w-40 h-14 flex justify-center items-center font-extrabold text-2xl border-4 border-slate-200 ring-4 ring-blue-700 shadow-2xl hover:ring-8 hover:ring-blue-500 hover:shadow-3xl transition-all"
                onClick={() => {
                  setFirstTime(false);
                  navigate("/signup");
                }}
                primary
                rounded
              >
                Sign up
              </Button>
              <Button
                className="w-40 h-14 flex justify-center items-center font-extrabold text-2xl border-4 border-slate-200 ring-4 ring-blue-700 shadow-2xl hover:ring-8 hover:ring-blue-500 hover:shadow-3xl transition-all"
                onClick={() => {
                  setFirstTime(false);
                  navigate("/login");
                }}
                primary
                rounded
              >
                Login
              </Button>
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
