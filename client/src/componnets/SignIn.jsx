import * as Yup from "yup";
import { Form, Formik } from "formik";
import { createUser } from "../api/users.api";
import { Entry, Button } from "./ModulesForm";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const nav = useNavigate();
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
              .required("El nombre es requerido"),
            correo: Yup.string()
              .max(100, "El maximo numero de caracteres es de 100")
              .email("Correo inválido")
              .required("El correo es requerido"),

            contraseña: Yup.string()
              .min(8, "La contraseña debe ser mas larga")
              .max(32, `El maximo numero de caracteres es ${32}`)
              .required("La contraseña es requerida"),
            contraseñaConfirmada: Yup.string().test(
              "passwords-match",
              "Las contraseñas deben coincidir",
              function (value) {
                return this.parent.contraseña === value;
              }
            ),
          })}
          onSubmit={async (values) => {
            const data = await createUser({
              nombre: values.nombre,
              correo: values.correo,
              contraseña: values.contraseña,
            });
            console.log(data);
            nav("/", { state:  data });
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
              ></Entry>
              {formik.touched.nombre && formik.errors.nombre ? (
                <div>{formik.errors.nombre}</div>
              ) : null}
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
              <Entry
                Id={"contraseñaConfirmada"}
                Name={"Confirmar contraseña"}
                Type={"password"}
                ExtraProps={formik.getFieldProps("contraseñaConfirmada")}
              ></Entry>
              {formik.touched.contraseñaConfirmada &&
              formik.errors.contraseñaConfirmada ? (
                <div>{formik.errors.contraseñaConfirmada}</div>
              ) : null}
              <Button
                disabled={formik.isSubmitting}
                value={formik.isSubmitting ? "Cargando..." : "Continuar"}
                type={"submit"}
                btnclass={"prime-btn"}
              />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
