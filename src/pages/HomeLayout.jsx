import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
