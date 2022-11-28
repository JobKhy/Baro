import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { userFetch as uApi, userFetch } from "../api/users.api";
import {
  NavBar,
  SubSet,
  UserConfg,
  EntrySet,
  SetPerfil,
  GasFrec,
  DiaFacFre,
  SubAcc,
  Button,
} from "./ModulesForm";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

//Para cambio de pestaña
export const Config = () => {
  const btnperf = () => {
    document.querySelector("#PerfSettings").style.display = "block";
    document.querySelector("#GasSettings").style.display = "none";
    document.querySelector("#AccountSettings").style.display = "none";
  };
  const btngas = () => {
    document.querySelector("#PerfSettings").style.display = "none";
    document.querySelector("#GasSettings").style.display = "block";
    document.querySelector("#AccountSettings").style.display = "none";
  };
  const btnacc = () => {
    document.querySelector("#PerfSettings").style.display = "none";
    document.querySelector("#AccountSettings").style.display = "block";
    document.querySelector("#GasSettings").style.display = "none";
  };
  //STATES
  const btnlistperiod = (e) => {
    let lista = document.querySelector(".PeriodList");
    let flecha = document.querySelector(".PeriodList i");
    lista.classList.toggle("select");
    let alto = 0;
    let listperiod = lista.nextElementSibling;
    flecha.style.rotate = "90deg";
    if (listperiod.clientHeight == "0") {
      flecha.style.rotate = "180deg";
      alto = listperiod.scrollHeight - 2;
    }
    listperiod.style.height = alto + "px";
    if (
      e.target.textContent == "Periodos" ||
      e.target.textContent == "Diario" ||
      e.target.textContent == "Semanal" ||
      e.target.textContent == "Quincenal"
    ) {
      if (e.target.textContent == "Periodos") {
        setPeriodo("Eligiendo...");
      } else {
        setPeriodo(e.target.textContent);
      }
    } else {
      setPeriodo("Eligiendo...");
    }
    //IDENTIFICADOR DE ENTRADA DE GASTO
  };
  const btndiasfac = () => {
    let diafacts = document.querySelector(".DiaFacFre");
    let listfacts = document.querySelector(".ListFrec");
    diafacts.style.display = "block";
    listfacts.style.display = "none";
  };
  const btnlistfrec = () => {
    let diafacts = document.querySelector(".DiaFacFre");
    let listfacts = document.querySelector(".ListFrec");
    diafacts.style.display = "none";
    listfacts.style.display = "block";
  };
  const [periodo, setPeriodo] = useState("");
  const [image, setImage] = useState(undefined);
  const [preview, setPreview] = useState(undefined);
  const [show, setShow] = useState(false);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(undefined);
    }
  }, [image]);

  const nav = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const res = await uApi.checkSession();
      if (res?.status === 200) {
        setUser(res.data.user);
        console.log(res.data.user);
      } else {
        nav("/login");
      }
    }
    if (!user) {
      fetchUser();
    }
  }, []);

  const [showPerf, setShowPerf] = useState(false);

  const perfiles = [
    {
      nombre: "Estudiante",
      icons: "fa-solid fa-school",
      desc: `Un perfil idea para todo tiempo de estudiante de que este cursando el nivel medio superior, cuenta con los gastos comunes de estos ademas de tener de posibilidad de adicionar los que el estudiante quiera`,
    },
    {
      nombre: "Trabajador",
      icons: "fa-solid fa-briefcase",
      desc: "",
    },
    { nombre: "Independiente", icons: "fa-solid fa-house", desc: "" },
    { nombre: "Otro", icons: "fa-solid fa-user", desc: "" },
  ];

  const [opt, setOpt] = useState(1);

  return (
    <div className="home-body-w">
      <NavBar initialActive={3}></NavBar>
      <div className="colGraph">
        <div className="typeOfGraph">
          <h1>Configuración</h1>
        </div>
        <div className="Config">
          <div className="PagSet">
            <div className="Perfil">
              <UserConfg
                User={user?.name}
                image={
                  user?.photo
                    ? `./assets/uploads/PFP/${user.photo}`
                    : "./assets/PFP.4330773c.png"
                }
                profile={perfiles[parseInt(user?.profile) - 1]?.nombre}
              />
            </div>
            <div className="SubSet">
              <SubSet name={"Perfil"} icons={"fa-solid fa-user"} e={btnperf} />
              <div className="Line"></div>
              <SubSet
                name={"Gastos"}
                icons={"fa-solid fa-chart-simple"}
                e={btngas}
              />
              <div className="Line"></div>
              <SubSet name={"Cuenta"} icons={"fa-solid fa-person"} e={btnacc} />
            </div>
          </div>
          <div className="PerfSettings" id="PerfSettings">
            <div className="PerfTitle">
            <h1>Perfil</h1>
            </div>
            <div className="PerfBody">
              <div className="PerfLeft">
                <div className="PerfData">
                  <EntrySet
                    Id={"name"}
                    Name={"Nombre"}
                    Type={"text"}
                    initialValue={user?.name}
                  />
                </div>
                <div className="PerfImg">
                  <div className="ConUserPf-Set">
                    <div className="Confcircle-Set">
                      <img
                        className="ConfcircleImg-Set"
                        src={preview ? preview : "./assets/PFP.4330773c.png"}
                      ></img>
                    </div>
                  </div>
                  <div className="SetPhoto">
                    <p>Cambiar Foto</p>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const res = await uApi.updatePhoto(formData);
                        if (res.status === 200) {
                          MySwal.fire({
                            icon: "success",
                            title: "Foto de perfil actualizada",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          setUser((prev) => ({
                            ...prev,
                            photo: res.data.filename,
                          }));
                        } else {
                          MySwal.fire({
                            icon: "error",
                            title: "Error al actualizar foto de perfil",
                            text: res.response.data.message,
                            showConfirmButton: false,
                            timer: 1500,
                          });
                        }
                        setShow(false);
                      }}
                    >
                      <input
                        type={"file"}
                        className="SetPhotoIn"
                        name="profilePic"
                        accept="image/jpeg, image/png"
                        required
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            if (
                              file.type === "image/jpeg" ||
                              file.type === "image/png"
                            ) {
                              setImage(file);
                              setShow(true);
                            } else {
                              alert(
                                "Solo se permiten imagenes en formato .jpg o .png"
                              );
                              setImage(undefined);
                              setShow(false);
                              e.target.value = "";
                            }
                          } else {
                            setImage(undefined);
                            setShow(false);
                          }
                        }}
                      />
                      {show ? (
                        <button className="SetPhotoBtn" type="submit">
                          Aplicar
                        </button>
                      ) : null}
                    </form>
                  </div>
                </div>
              </div>
              {showPerf ? (
                <div className="PerfType" id="SelectType">
                  <h1>¿A que tipo de perfil quieres cambiar?</h1>
                  <div className="TypeBody">
                    <SetPerfil
                      icon={"fa-solid fa-school"}
                      perfil={"Estudiante"}
                    />
                    <SetPerfil
                      icon={"fa-solid fa-briefcase"}
                      perfil={"Trabajador"}
                    />
                    <SetPerfil
                      icon={"fa-solid fa-house"}
                      perfil={"Sin oficio"}
                    />
                    <SetPerfil icon={"fa-solid fa-user"} perfil={"Otro"} />
                    <button
                      className="BtnChangeType"
                      onClick={() => setShowPerf(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="PerfType" id="YourType">
                  <h1>Tu tipo de perfil actual es </h1>
                  <div className="TypeBody">
                    <SetPerfil
                      icon={perfiles[parseInt(user?.profile) - 1]?.icons}
                      perfil={perfiles[parseInt(user?.profile) - 1]?.nombre}
                    />
                    <div className="DesYourType">
                      <h2 className="DesYourType-Title">Descripción</h2>
                      <p>{perfiles[parseInt(user?.profile) - 1]?.desc}</p>
                    </div>
                    <div className="AlertYourType">
                      <h2 className="AlertYourType-Title">Alerta</h2>
                      <p className="AlertYourType-Des">
                        Si cambia de perfil va a perder todos sus gastos
                        frecuentes
                      </p>
                    </div>
                    <button
                      className="BtnChangeType"
                      onClick={() => setShowPerf(true)}
                    >
                      Cambiar Perfil
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="GasSettings" id="GasSettings">
            <div>
              <h1>Gastos</h1>
            </div>
            <div className="ListFrec">
              <GasFrec
                name={"Gas"}
                balance={"500"}
                des={"Gasto de consumo de agua de la casa de don juan"}
                date={"14/04/2024"}
                periodo={periodo}
                e={btnlistperiod}
                e2={btndiasfac}
              />
              <GasFrec
                name={"Gas"}
                balance={"500"}
                des={"Gasto de consumo de agua de la casa de don juan"}
                date={"14/04/2024"}
                periodo={periodo}
                e={btnlistperiod}
              />
              <GasFrec
                name={"Gas"}
                balance={"500"}
                des={"Gasto de consumo de agua de la casa de don juan"}
                date={"14/04/2024"}
                periodo={periodo}
                e={btnlistperiod}
              />
            </div>
            <div className="DiaFacFre">
              <div className="TitleListaGasFre">
                Días de Facturación de Agua
              </div>
              <DiaFacFre padre={"Agua"} cantidad={"5000"} date={"12/07/2022"} />
              <DiaFacFre padre={"Agua"} cantidad={"5000"} date={"12/07/2022"} />
              <DiaFacFre padre={"Agua"} cantidad={"5000"} date={"12/07/2022"} />
              <DiaFacFre padre={"Agua"} cantidad={"5000"} date={"12/07/2022"} />
              <DiaFacFre padre={"Agua"} cantidad={"5000"} date={"12/07/2022"} />
              <DiaFacFre padre={"Agua"} cantidad={"5000"} date={"12/07/2022"} />
              <DiaFacFre padre={"Agua"} cantidad={"5000"} date={"12/07/2022"} />
              <DiaFacFre padre={"Agua"} cantidad={"5000"} date={"12/07/2022"} />
              <DiaFacFre padre={"Agua"} cantidad={"5000"} date={"12/07/2022"} />
              <DiaFacFre padre={"Agua"} cantidad={"5000"} date={"12/07/2022"} />
              <DiaFacFre padre={"Agua"} cantidad={"5000"} date={"12/07/2022"} />
              <DiaFacFre padre={"Agua"} cantidad={"5000"} date={"12/07/2022"} />
              <div className="BtnReturn">
                <button className="BtnReturnFre" onClick={btnlistfrec}>
                  Regresar a configuración de gastos frecuentes
                  <i className="fa-solid fa-reply"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="AccountSettings" id="AccountSettings">
            <div>
              <h1>Cuenta</h1>
            </div>
            <div className="ContainerAcc">
              <div className="AccountBody">
                <SubAcc
                  name={"Vaciar Datos"}
                  icons={"fa-solid fa-inbox"}
                  e={() => setOpt(1)}
                />
                <div className="LineAcc"></div>
                <SubAcc
                  name={"Términos y Condiciones"}
                  icons={"fa-solid fa-book"}
                  e={() => setOpt(2)}
                />
                <div className="LineAcc"></div>
                <SubAcc
                  name={"Borrar Cuenta"}
                  icons={"fa-solid fa-fire"}
                  e={() => setOpt(3)}
                />
              </div>
              <div className="ContainerResultsAcc">
                {opt === 1 ? (
                  <div className="ContainerVaciar">
                    <h2>Vaciar Datos</h2>
                    <br></br>
                    <h3>Advertencia</h3>
                    <p>
                      Si confirmas esta operación se eliminaran todos los
                      registros que tengas hasta el momento, además de esto se
                      borraran los gastos frecuentes, asi como sus
                      configuraciones.
                    </p>
                    <br></br>
                    <h3>Resumen</h3>
                    <p>
                      Es comenzar desde cero. Perfecto para poder aplicarse en
                      el cambio radical de tus gastos
                    </p>
                    <div className="BtnsVaciar">
                      {/* <div className="SetDat">
                        <button className="BtnSetDat">Cancelar</button>
                      </div> */}
                      <div
                        className="SetDat"
                        onClick={() => {
                          MySwal.fire({
                            title: "¿Estas seguro?",
                            text: "No podras revertir esta acción",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Si, estoy seguro",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              const res = await userFetch.cleanAccount();
                              if (res.status === 200) {
                                MySwal.fire({
                                  icon: "success",
                                  title: "¡Listo!",
                                  text: res.data.message,
                                  timer: 2000,
                                  showConfirmButton: false,
                                  timerProgressBar: true,
                                });
                              } else {
                                MySwal.fire({
                                  icon: "error",
                                  title: "¡Error!",
                                  text: res.response.data.message,
                                  timer: 2000,
                                  showConfirmButton: false,
                                  timerProgressBar: true,
                                });
                              }
                            }
                          });
                        }}
                      >
                        <button className="BtnSetDat">Cambiar</button>
                      </div>
                    </div>
                  </div>
                ) : null}
                {opt === 2 ? (
                  <div className="ContainerTerminos">
                    <h2>Terminos y Condiciones</h2>
                    <br></br>
                    <p>
                      En esta parte podrás tener acceso a los Términos y
                      Condiciones de la empresa Euclid Tech. Esto con el
                      proposito de conozcas mejor la forma de trabajar de
                      nosotros, estamos agradecidos de poder brindar productos
                      de calidad por medio del software.
                    </p>
                    <br></br>
                    <h3>Para mas detalle</h3>
                    <p>
                      Puedes vistiar los siguientes links para ver los terminos
                      y condiciones a detalle
                    </p>
                  </div>
                ) : null}
                {opt === 3 ? (
                  <div className="ContainerDelete">
                    <h2>Eliminar Cuenta</h2>
                    <br></br>
                    <h3>Advertencia</h3>
                    <p>
                      Esta acción es irreversible, eliminara tu cuenta por
                      completo sin nunguna posibilidad de acceder a ella.
                    </p>
                    <br></br>
                    <h3>Sin Embargo</h3>
                    <p>
                      En Baro podrás realizar mas cuentas si asi lo deseas,
                      evidentemente vacias.
                    </p>
                    <div className="BtnsDelete">
                      <div className="SetDat">
                        <button
                          className="BtnSetDat"
                          onClick={async () => {
                            const steps = ["1", "2"];
                            const Queue = MySwal.mixin({
                              progressSteps: steps,
                              confirmButtonText: "Siguiente >",
                              showClass: { backdrop: "swal2-noanimation" },
                              hideClass: { backdrop: "swal2-noanimation" },
                            });
                            await Queue.fire({
                              title: "¿Estas seguro?",
                              text: "No podras revertir esta acción",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Si, estoy seguro",
                              cancelButtonText: "Cancelar",
                              currentProgressStep: "0",
                              showClass: { backdrop: "swal2-noanimation" },
                            });
                            await Queue.fire({
                              title: "Ingresa tu contraseña",
                              input: "password",
                              inputAttributes: {
                                autocapitalize: "off",
                              },
                              showCancelButton: true,
                              confirmButtonText: "Siguiente",
                              showLoaderOnConfirm: true,
                              preConfirm: async (password) => {
                                const res = await userFetch.deleteAccount({
                                  password,
                                });
                                if (res.status === 200) {
                                  MySwal.fire({
                                    icon: "success",
                                    title: "¡Listo!",
                                    text: res.data.message,
                                    timer: 2000,
                                    showConfirmButton: false,
                                    timerProgressBar: true,
                                  }).then(()=>{
                                    setUser(null);
                                    nav("/")
                                  })
                                } else {
                                  MySwal.fire({
                                    icon: "error",
                                    title: "¡Error!",
                                    text: res.response.data.message,
                                    timer: 2000,
                                    showConfirmButton: false,
                                    timerProgressBar: true,
                                  });
                                }
                              },
                              currentProgressStep: "1",
                            });
                          }}
                        >
                          Confirmar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
