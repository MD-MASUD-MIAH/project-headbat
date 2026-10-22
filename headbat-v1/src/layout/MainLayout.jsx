import { Outlet } from "react-router";
import ContactFooter from "../components/ContactFooter";
import Header from "../components/home/Header";
import SmoothScroll from "../components/SmoothScroll";
import ScrollToTop from "../components/ScrollToTop";

const MainLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <SmoothScroll>
        <Header />
        <Outlet />
        <ContactFooter />
      </SmoothScroll>
    </div>
  );
};

export default MainLayout;
