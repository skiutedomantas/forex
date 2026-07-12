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
    <div className="rate-wrapper">
      <div>
    <h2>Check the Rate</h2>
    <div className="main-rate-container">
    <div className="exchange-container">
    <div className="send-container">
      <h3>Send</h3>
      <div className="numbers-container">
        <input className="input-amount" type="number" value={amount} onChange={(e)=> setAmount(e.target.value)} />
        <Dropdown current={sendCurrent} setCurrent={setSendCurrent} currencies={currencies}></Dropdown>
      </div>
    </div>
    <button className="exchange-button" onClick={()=>{
        setSendCurrent(receiveCurrent);
        setReceiveCurrent(sendCurrent);
      }}>
      <img src={exchange} alt="exchange-icon"  />
    </button>
    <div className="receive-container">
      <h3>Receive</h3>
      <div className="numbers-container">
        <p className="amount">{rate ? (amount*rate).toFixed(2): '...'}</p>
        <Dropdown current={receiveCurrent} setCurrent={setReceiveCurrent} currencies={currencies}></Dropdown>
      </div>
    </div>
      </div>
    <div className="container-below">
      <p>1 {sendCurrent} = {rate ? (rate.toFixed(4)) : '...'}{receiveCurrent} </p>
      <div>
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