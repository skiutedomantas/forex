import { useEffect, useState } from "react";
import logo from "../assets/images/logo.svg";

export default function Header(){
  const [amount, setAmount] = useState();
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
            setAmount(data.length);
          }
          catch (error) {
            console.log(error.message);
          }
        }
        fetchCurrencies();
      }, []);
  return(
    <>
    <header className="flex justify-between mx-8 py-8 ">
      <img src={logo} alt="" />
      <ul className="flex gap-4 text-neutral-400">
        <li>{amount} Currencies</li>
        <li><span>&#8729;</span></li>
        <li>EOD</li>
        <li><span>&#8729;</span></li>
        <li>ECB DATA</li>
      </ul>
    </header>
    </>
  )
}