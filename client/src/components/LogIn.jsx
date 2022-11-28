import { Entry, Button } from "./ModulesForm";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { userFetch as uApi } from "../api/users.api";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Loader } from "./Loader";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UserContext from "../context/UserContext";

const MySwal = withReactContent(Swal);

export const LogIn = () => {
  const { state } = useLocation();

  const nav = useNavigate();

  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <div className="ali">
        <div className="form-cont">
          <Formik
            initialValues={{
              correo: "",
              contraseña: "",
            }}
            validationSchema={Yup.object({
              correo: Yup.string()
                .max(100, "El maximo numero de caracteres es de 100")
                .email("Correo inválido")
                .required("El correo es requerido"),

              contraseña: Yup.string()
                .min(8, "La contraseña debe tener minimo 8 caracteres")
                .max(32, `El maximo numero de caracteres es ${32}`)
                .required("La contraseña es requerida"),
            })}
            onSubmit={async (values) => {
              try {
                const res = await uApi.getUser(values);
                if (res?.status === 200) {
                  console.log("codigo aqui");
                  console.log(res);
                  setUser(res.data.user);
                  if (res.data.user.profile === 0) {
                    nav("/perfiles");
                  }else{
                    nav("/home");
                  }
                } else {
                  console.log(res);
                  MySwal.fire({
                    title: "Error",
                    text: res.response.data.message,
                    icon: "error",
                    timer: 3000,
                  });
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <div className="form-title">Iniciar sesión</div>
                <Entry
                  Id={"correo"}
                  Name={"Correo"}
                  Type={"email"}
                  ExtraProps={formik.getFieldProps("correo")}
                ></Entry>
                {formik.touched.correo && formik.errors.correo ? (
                  <div>{formik.errors.correo}</div>
                ) : null}
                <Entry
                  Id={"contraseña"}
                  Name={"Contraseña"}
                  Type={"password"}
                  ExtraProps={formik.getFieldProps("contraseña")}
                ></Entry>
                {formik.touched.contraseña && formik.errors.contraseña
                  ? (setLoading(false), (<div>{formik.errors.contraseña}</div>))
                  : null}
                <Button
                  disabled={formik.isSubmitting}
                  value={formik.isSubmitting ? setLoading(true) : "Entrar"}
                  type={"submit"}
                  btnclass={"prime-btn"}
                />
              </form>
            )}
          </Formik>
          <div><a href="signin">¿No tienes cuenta?</a></div>
        </div>
        {loading ? <Loader></Loader> : null}
      </div>
    </>
  );
};
