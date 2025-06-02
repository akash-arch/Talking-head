import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "../pages/Home";
import GenerateVideo from "../pages/generate-video/GenerateVideo";
import { JSX } from "react";
import Header from "../components/header/Header";
import { ROUTES } from "./route-constants";
import Home from "../pages/Home";

const AppRouter = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.GENERATE_VID} element={<GenerateVideo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
