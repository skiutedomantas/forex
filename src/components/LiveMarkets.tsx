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

  return(
    <>
    <div className="overflow-hidden before:content-['\2022_LIVE_MARKET'] before:text-black before:top-22.5 before:z-1000 before:left-0 before:px-6 before:py-2.5 before:bg-neongreen before:absolute">
      <ul className="flex text-sm animate-carousel">
      {pairs.map((pair)=>{
         const oldPair = changes?.find(
        (item) => item.quote === pair.quote
        );

        const difference = oldPair
        ? (((pair.rate - oldPair.rate) / oldPair.rate) * 100).toFixed(2)
        : null;
        return (
          <li className="flex gap-2 bg-neutral-800 px-6 py-3 border-l border-neutral-600" key={`${pair.base}${pair.quote}`}><span className="text-neutral-500">{pair.base}/{pair.quote}</span> <span>{pair.rate}</span> <span className={difference >= 0 ? 'text-neongreen' : "text-red-600"}>{difference}%</span></li>
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
          <li className="flex gap-2 bg-neutral-800 px-6 py-3 border-l border-neutral-600" aria-hidden key={`${pair.base}${pair.quote}`}><span className="text-neutral-500">{pair.base}/{pair.quote}</span> <span>{pair.rate}</span> <span className={difference >= 0 ? 'text-neongreen' : "text-red-600"}>{difference}%</span></li>
        )
      })}
      </ul>
    </div>
    </>
  )
}