import { Entry, Button } from "./ModulesForm";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { createUser } from "../api/users.api";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
  const nav = useNavigate();
  return (
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
              .min(8, "La contraseña debe ser mas larga")
              .max(32, `El maximo numero de caracteres es ${32}`)
              .required("La contraseña es requerida"),
          })}
          onSubmit={async (values) => {
            const data = await createUser({
              correo: values.correo,
              contraseña: values.contraseña,
            });
            console.log(data);
            //how to redirect and send information to the next page?
            nav("/home", { state: { data } });
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
              {formik.touched.contraseña && formik.errors.contraseña ? (
                <div>{formik.errors.contraseña}</div>
              ) : null}
              <Button
                disabled={formik.isSubmitting}
                value={formik.isSubmitting ? "Cargando..." : "Entrar"} 
                type={"submit"}
                btnclass={"prime-btn"} />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
