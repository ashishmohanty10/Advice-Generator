import React, { useEffect, useState } from "react";
import axios from "axios";
import MobileDivider from "/mobile.svg";
import DesktopDivider from "/desktop.svg";
import Icon from "/icon-dice.svg";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetch = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setError(null);
      })
      .catch((error) => {
        setError("Error while fetching data");
      });
  };

  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleScreen = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("window resize", handleScreen);

    return window.removeEventListener("window resize", handleScreen);
  });

  return (
    <div className="container w-full h-screen flex justify-center items-center">
      <div className="w-[500px] h-[300px] bg-darkGrayishBlue rounded-lg p-10 flex flex-col justify-evenly relative">
        <div>
          {data ? (
            <>
              <p className="text-neonGreen font-semibold text-sm text-center mb-5">
                ADVICE #{data.slip.id}
              </p>
              <p className="font-medium text-lightCyan text-xl text-center">
                {data.slip.advice}
              </p>
            </>
          ) : (
            <p>{error}</p>
          )}
        </div>

        <div>
          {screenSize < 400 ? (
            <img src={MobileDivider} />
          ) : (
            <img src={DesktopDivider} />
          )}
        </div>

        <button
          onClick={handleFetch}
          className="p-5 bg-neonGreen w-fit rounded-full absolute top-64 left-52"
        >
          <img src={Icon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default App;
