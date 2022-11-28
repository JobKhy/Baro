import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./Home";
import { Index } from "./Index";
import { LogIn } from "./LogIn";
import { SignIn } from "./SignIn";
import { Perfiles } from "./Perfiles";
import { Graficas } from "./Graficas";
import { Frecuentes } from "./Frecuentes";
import { Config } from "./Config";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { userFetch as uApi } from "../api/users.api";

export const App = () => {
  const nav = useNavigate();

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchUser() {
      const res = await uApi.checkSession();
      if (res?.status === 200) {
        setUser(res.data.user);
        console.log(res.data.user);
        console.log("XD")
        if (res.data.user.profile === 0) {
          nav("/perfiles");
        }
      } 
    }
    if (!user) {
      fetchUser();
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="login" element={<LogIn />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="home" element={<Home />} />
      <Route path="/perfiles" element={<Perfiles />} />
      <Route path="graficas" element={<Graficas />} />
      <Route path="frecuentes" element={<Frecuentes />} />
      <Route path="config" element={<Config />} />
    </Routes>
  );
};

export default App;
