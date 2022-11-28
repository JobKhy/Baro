import React, { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { userFetch as uApi } from "../api/users.api";
import { Entry, Button } from "./ModulesForm";
import { useNavigate } from "react-router-dom";
import { Loader } from "./Loader";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const SignIn = () => {
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);

  return (
    <div className="ali">
      <div className="form-cont">
        <Formik
          initialValues={{
            nombre: "",
            correo: "",
            contraseña: "",
            contraseñaConfirmada: "",
          }}
          validationSchema={Yup.object({
            nombre: Yup.string()
              .min(3, "Nombre debe tener minimo 3 caracteres")
              .max(70, "El maximo numero de caracteres es de 70")
              .required("El nombre es requerido")
              .matches(/^[a-zA-Z\d ]+$/, "Solo letras"),
            correo: Yup.string()
              .max(100, "El maximo numero de caracteres es de 100")
              .email("Correo inválido")
              .required("El correo es requerido"),

            contraseña: Yup.string()
              .min(8, "La contraseña debe minimo 8 caracteres")
              .max(32, `El maximo numero de caracteres es ${32}`)
              .required("La contraseña es requerida")
              .matches(/^[a-zA-Z\d ]+$/, "Solo letras"),
            contraseñaConfirmada: Yup.string().test(
              "passwords-match",
              "Las contraseñas deben coincidir",
              function (value) {
                return this.parent.contraseña === value;
              }
            ),
          })}
          onSubmit={async (values) => {
            try {
              const res = await uApi.createUser(values);
              console.log(res);
              if (res?.status === 200) {
                MySwal.fire({
                  title: "Exitoso",
                  text: res.data.message,
                  icon: "success",
                  timer: 3000,
                  timerProgressBar: true,
                }).then(() => {
                  nav("/login");
                });
              } else {
                MySwal.fire({
                  title: "Error",
                  icon: "error",
                  text: res.response.data.message,
                });
              }
            } catch (e) {
              console.log(e);
            }
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div className="form-title">Crear cuenta</div>
              <Entry
                Id={"nombre"}
                Name={"Nombre"}
                Type={"text"}
                ExtraProps={formik.getFieldProps("nombre")}
              />
              {formik.touched.nombre && formik.errors.nombre
                ? (setLoading(false), (<div>{formik.errors.nombre}</div>))
                : null}
              <Entry
                Id={"correo"}
                Name={"Correo"}
                Type={"email"}
                ExtraProps={formik.getFieldProps("correo")}
              />
              {formik.touched.correo && formik.errors.correo
                ? (setLoading(false), (<div>{formik.errors.correo}</div>))
                : null}
              <Entry
                Id={"contraseña"}
                Name={"Contraseña"}
                Type={"password"}
                ExtraProps={formik.getFieldProps("contraseña")}
              />
              {formik.touched.contraseña && formik.errors.contraseña
                ? (setLoading(false), (<div>{formik.errors.contraseña}</div>))
                : null}
              <Entry
                Id={"contraseñaConfirmada"}
                Name={"Confirmar contraseña"}
                Type={"password"}
                ExtraProps={formik.getFieldProps("contraseñaConfirmada")}
              />
              {formik.touched.contraseñaConfirmada &&
              formik.errors.contraseñaConfirmada
                ? (setLoading(false),
                  (<div>{formik.errors.contraseñaConfirmada}</div>))
                : null}
              <Button
                disabled={formik.isSubmitting}
                value={formik.isSubmitting ? setLoading(true) : "Continuar"}
                type={"submit"}
                btnclass={"prime-btn"}
              />
            </form>
          )}
        </Formik>
        <div><a href="login">¿Ya tienes una cuenta?</a></div>
      </div>
      {/* {loading ? <Loader></Loader> : null} */}
    </div>
  );
};
