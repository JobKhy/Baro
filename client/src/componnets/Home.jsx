import { Item, UserPf, Reciente, NavBar } from "./ModulesForm"

export const Home = () => {

  const list = (document.querySelectorAll('.list'));
  function activeLink() {
    list.forEach((item) =>
      item.classList.remove('active'));
    this.classList.add('active')
  }
  list.forEach((item) =>
    item.addEventListener('click', activeLink));

  return (
    <>
      <div className="home-body">
        <NavBar></NavBar>
        <div className="Balance">
          <UserPf User={"Gus of war"}></UserPf>
          <div className="BalanceDisp">
            <div className="BalanceCant">

            </div>
            <div className="BalanceMenu">
              <Item secc={'gasto'} icons={'fa-solid fa-arrow-right-to-bracket'} />
              <Item secc={'ingreso'} icons={'fa-regular fa-square-caret-down'} />
              <Item secc={'mas'} icons={'fa-solid fa-ellipsis'} />
            </div>
          </div>
        </div>
        <div className="GasRec">
          <h1>Gastos recientes</h1>
          <div className="GasCont">
            <ul>
              <Reciente gasto={"Mensualidad Gym"} icons={'fa-solid fa-dumbbell'} value={800} date={'12/3/22'}/>
              <Reciente gasto={"Comida con Amigos"} icons={'fa-solid fa-bowl-food'} value={600} date={'6/3/22'}/>
              <Reciente gasto={"Agua"} icons={'fa-solid fa-faucet-drip'} value={235} date={'3/3/22'}/>
              <Reciente gasto={"Internet"} icons={'fa-solid fa-wifi'} value={759} date={'2/3/22'}/>
              <Reciente gasto={"Visita a familiares"} icons={'fa-solid fa-bus-simple'} value={40} date={'22/2/22'}/>
            </ul>
          </div>
            
        </div>
      </div>
    </>
  )
}

/* hola */