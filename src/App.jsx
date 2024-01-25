import React, { useState, useEffect } from "react";
import Axios from "axios";
import ICON from "./assets/icon-dice.svg";
import MobileDivider from "./assets/pattern-divider-mobile.svg";
import DesktopDivider from "./assets/desktop.svg";

const App = () => {
  const [advice, setAdvice] = useState();
  const [id, setId] = useState();
  useEffect(() => {
    Axios.get("https://api.adviceslip.com/advice").then((res) => {
      setAdvice(res.data.slip.advice);
      setId(res.data.slip.id);
    });
  }, [advice]);

  async function handleAdvice() {
    Axios.get("https://api.adviceslip.com/advice").then((res) => {
      setId(res.data.slip.id);
      setAdvice(res.data.slip.advice);
    });
  }

  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="container flex items-center justify-center w-full h-screen">
        <div className="bg-darkGrayishBlue w-[350px] h-[250px] md:w-[600px] rounded-lg relative">
          <div className="flex flex-col items-center justify-center p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold tracking-[.25rem] text-neonGreen">
                ADVICE #{id}
              </h3>
            </div>

            <div className="mb-2 text-2xl font-bold text-center text-lightCyan">
              "{advice}"
            </div>

            <div className="mb-5">
              {screenSize < 400 ? (
                <img src={MobileDivider} alt="" />
              ) : (
                <img src={DesktopDivider} alt="" />
              )}
            </div>

            <div className="relative group top-2" onClick={handleAdvice}>
              <div className="absolute duration-200 rounded-full -inset-0 bg-neonGreen group-hover:blur "></div>
              <button className="relative p-5 transform rounded-full cursor-pointer bg-neonGreen">
                <img src={ICON} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
