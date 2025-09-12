import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader-backdrop">
      <div className="ai-loader-container">
        <DotLottieReact
          src="/src/assets/NewLoader.lottie"
          loop
          autoplay
          style={{ background: "transparent" }}
        />
        <p>Generating your video, please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
