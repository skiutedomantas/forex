import { useEffect, useState } from "react"

export default function LiveMarkets(){

  const [pairs, setPairs] = useState([]);
  const [changes, setChanges] = useState();

  const yesterday = new Date(Date.now() - 86400000)
  .toISOString()
  .split("T")[0];  

  useEffect(()=> {
    async function  fetchPairs(){
      try {
        const response = await fetch(
          "https://api.frankfurter.dev/v2/rates?quotes=USD,GBP,JPY,AUD,CHF,CAD,NZD"
        );
        if (!response.ok){
          throw new Error("Something wrong");
        }
        const data = await response.json();
        setPairs(data);
      }
      catch (error) {
        console.log(error.message);
      }
    }
    fetchPairs();
  }, []);

    useEffect(()=> {
    async function  fetchChanges(){
      try {
        const response = await fetch(
          `https://api.frankfurter.dev/v2/rates?from=${yesterday}&quotes=USD,GBP,JPY,AUD,CHF,CAD,NZD`
        );
        if (!response.ok){
          throw new Error("Something wrong");
        }
        const data = await response.json();
        setChanges(data);
      }
      catch (error) {
        console.log(error.message);
      }
    }
    fetchChanges();
  }, []);
    const previousDayRate = changes ? changes[1].rate : null;
    const todayDayRate = changes? changes[0].rate : null;
    const change = ((todayDayRate * 100 / previousDayRate) - 100).toFixed(2);


  return(
    <>
    <div className="live-market-container">
      <ul>
      {pairs.map((pair)=>{
         const oldPair = changes?.find(
        (item) => item.quote === pair.quote
        );

        const difference = oldPair
        ? (((pair.rate - oldPair.rate) / oldPair.rate) * 100).toFixed(2)
        : null;
        return (
          <li key={`${pair.base}${pair.quote}`}><span className="pair">{pair.base}/{pair.quote}</span> <span className="rate">{pair.rate}</span> <span className={difference >= 0 ? 'positive' : "negative"}>{difference}%</span></li>
        )
      })}
      {pairs.map((pair)=>{
         const oldPair = changes?.find(
        (item) => item.quote === pair.quote
        );

        const difference = oldPair
        ? (((pair.rate - oldPair.rate) / oldPair.rate) * 100).toFixed(2)
        : null;
        return (
          <li aria-hidden key={`${pair.base}${pair.quote}`}><span className="pair">{pair.base}/{pair.quote}</span> <span className="rate">{pair.rate}</span> <span className={difference >= 0 ? 'positive' : "negative"}>{difference}%</span></li>
        )
      })}
      </ul>
    </div>
    </>
  )
}