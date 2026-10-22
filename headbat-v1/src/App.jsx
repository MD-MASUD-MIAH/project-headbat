import AOS from "aos";
import { useEffect } from "react";
import { RouterProvider } from "react-router";

import "aos/dist/aos.css";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { ContentProvider } from "./context/ContentContext";
import { router } from "./router/router";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <AuthProvider>
      <ContentProvider>
        <RouterProvider router={router} />
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;

