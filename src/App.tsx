import LiveMarkets from "./components/LiveMarkets";
import Header from "./components/Header";
import Rate from "./components/Rate";
import "./App.css";
import Stats from "./components/Stats";
import Chart from "./components/Chart";
function App() {

  return (
    <>
    <div className="text-white font-[Jetbrains]">
    <Header></Header>
    <LiveMarkets></LiveMarkets>
    <Rate></Rate>
    <Stats></Stats>
    <Chart></Chart>
    </div>
    </>
  )
}

export default App
