import LiveMarkets from "./components/LiveMarkets";
import Header from "./components/Header";
import Rate from "./components/Rate";
import "./App.css";
function App() {

  return (
    <>
    <div className="bg-black h-screen text-white font-[Jetbrains]">
    <Header></Header>
    <LiveMarkets></LiveMarkets>
    <Rate></Rate>
    </div>
    </>
  )
}

export default App
