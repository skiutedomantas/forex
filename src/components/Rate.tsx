import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import exchange from '../assets/images/icon-exchange.svg';

export default function Rate(){
    const [currencies, setCurrencies] = useState([]);
    const [sendCurrent, setSendCurrent] = useState('USD');
    const [receiveCurrent, setReceiveCurrent] = useState('EUR');
    const [rate, setRate] = useState(null);
    const [amount, setAmount] = useState(1000);


  
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

    useEffect(()=> {
      async function  fetchRates(){
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
    <div className="flex justify-between mt-4">
      <p>1 {sendCurrent} = {rate ? (rate.toFixed(4)) : '...'}{receiveCurrent} </p>
      <div className="flex gap-8">
        <p>Favorited</p>
        <p>Log Conversion</p>
      </div>
    </div>
    </div>
      </div>
    </div>
    </>
  )
}