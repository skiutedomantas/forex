import LiveMarkets from "./components/LiveMarkets";
import Header from "./components/Header";
import Rate from "./components/Rate";
import "./App.css";
import Stats from "./components/Stats";
import Chart from "./components/Chart";
import { useEffect, useState } from "react";
import TabList from "./components/TabList";
function App() {

  const [sendCurrent, setSendCurrent] = useState('USD');
  const [receiveCurrent, setReceiveCurrent] = useState('EUR');
  const [rate, setRate] = useState(null);
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });  
  
    const handleFavourite = () => {
  setFavourites(prev => {
    const id = `${sendCurrent}/${receiveCurrent}`;
    const exists = prev.some(item => item.id === id);

    if (exists) {
      return prev.filter(item => item.id !== id);
    } else {
      return [
        ...prev,
        {
          base: sendCurrent,
          quote: receiveCurrent,
          id,
        },
      ];
    }
  });
};

  useEffect(()=>{
    function addToStorage(){
    localStorage.setItem("favourites", JSON.stringify(favourites));
    }
    addToStorage();

  }, [favourites]);

  useEffect(()=> {
        async function fetchRates(){
          try {
            const response = await fetch(
              `https://api.frankfurter.dev/v2/rates?base=${sendCurrent}&quotes=${receiveCurrent}`
            );
            if (!response.ok){
              throw new Error("Something wrong");
            }
            const data = await response.json();
            setRate(data[0].rate);
          }
          catch (error) {
            console.log(error.message);
          }
        }
        fetchRates();
      }, [sendCurrent, receiveCurrent]);
  
  return (
    <>
    <div className="text-white font-[Jetbrains]">
    <Header></Header>
    <LiveMarkets></LiveMarkets>
    <Rate favourites={favourites} handleFavourite={handleFavourite} sendCurrent={sendCurrent} setSendCurrent={setSendCurrent} receiveCurrent={receiveCurrent} setReceiveCurrent={setReceiveCurrent} rate={rate}></Rate>
    <TabList favourites={favourites}/>
    <Stats sendCurrent={sendCurrent} receiveCurrent={receiveCurrent}></Stats>
    <Chart sendCurrent={sendCurrent} receiveCurrent={receiveCurrent}></Chart>
    </div>
    </>
  )
}
export default App
