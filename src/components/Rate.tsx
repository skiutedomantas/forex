import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import exchange from '../assets/images/icon-exchange.svg';

export default function Rate({sendCurrent, setSendCurrent, receiveCurrent, setReceiveCurrent, rate, handleFavourite, favourites}){
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1000);

    const isFavourite = favourites.some(
    item => item.id === `${sendCurrent}/${receiveCurrent}`
  );

    useEffect(()=> {
      async function  fetchCurrencies(){
        try {
          const response = await fetch(
            "https://api.frankfurter.dev/v2/currencies"
          );
          if (!response.ok){
            throw new Error("Something wrong");
          }
          const data = await response.json();
          setCurrencies(data);
        }
        catch (error) {
          console.log(error.message);
        }
      }
      fetchCurrencies();
    }, []);
  return(
    <>
    <div className="flex flex-col items-center">
      <div>
    <h2 className="uppercase font-light mt-8 mb-2 ">Check the Rate</h2>
    <div className="bg-neutral-900 flex flex-col p-8 rounded-md ">
    <div className="flex content-between gap-8 items-center">
    <div className="bg-neutral-800 border border-neutral-600 rounded-md p-8 min-w-sm">
      <h3 className="uppercase m-0 text-neutral-500 font-light text-sm">Send</h3>
      <div className="flex items-end justify-between">
        <input className="text-white text-3xl max-w-[200px] mt-4 focus:outline-0" type="number" value={amount} onChange={(e)=> setAmount(e.target.value)} />
        <Dropdown current={sendCurrent} setCurrent={setSendCurrent} currencies={currencies}></Dropdown>
      </div>
    </div>
    <button className="bg-neutral-800 h-16 w-16 rounded p-0 cursor-pointer flex justify-center items-center" onClick={()=>{
        setSendCurrent(receiveCurrent);
        setReceiveCurrent(sendCurrent);
      }}>
      <img className="h-5 w-5" src={exchange} alt="exchange-icon"  />
    </button>
    <div className="bg-neutral-800 border border-neutral-600 rounded-md p-8 min-w-sm">
      <h3 className="uppercase m-0 text-neutral-500 font-light text-sm">Receive</h3>
      <div className="flex items-end justify-between">
        <p className="text-3xl text-neongreen m-0 mt-4">{rate ? (amount*rate).toFixed(2): '...'}</p>
        <Dropdown current={receiveCurrent} setCurrent={setReceiveCurrent} currencies={currencies}></Dropdown>
      </div>
    </div>
      </div>
    <div className="flex items-center justify-between mt-6 border-t border-dashed border-neutral-700 pt-6">
      <p>1 {sendCurrent} = {rate ? (rate.toFixed(4)) : '...'}{receiveCurrent} </p>
      <div className="flex gap-8 items-center">
        <button onClick={handleFavourite} className={`pr-4 pl-3 py-2 rounded-md border-neongreen border flex gap-2 items-center cursor-pointer ${isFavourite ? "bg-neongreen text-black" : "bg-neutral-900 text-neutral-50"}`}>
          <svg className={`h-5 w-5 ${isFavourite ? "fill-black": "fill-neutral-50"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>
          {isFavourite ? 'Favorited': "Favorite"}</button>
        <p>Log Conversion</p>
      </div>
    </div>
    </div>
      </div>
    </div>
    </>
  )
}