import { useEffect, useState } from "react";
import Chart from "./Chart";

export default function Stats(){
  const [stats, setStats] = useState([]);

    const yesterday = new Date(Date.now() - 86400000)
  .toISOString()
  .split("T")[0];  

    useEffect(()=> {
        async function  fetchStat(){
          try {
            const response = await fetch(
          `https://api.frankfurter.dev/v2/rates?from=${yesterday}&quotes=USD&base=EUR`
            );
            if (!response.ok){
              throw new Error("Something wrong");
            }
            const data = await response.json();
            setStats(data);
          }
          catch (error) {
            console.log(error.message);
          }
        }
        fetchStat();
      }, []);
  return (
    <>
    <p>Open {stats.length > 1 ? stats[1].rate : "..."}</p>
    <p>Last {stats.length > 1 ? stats[0].rate : "..."}</p>
    <p>
      Change {stats.length > 1 
        ? (stats[1].rate - stats[0].rate).toFixed(4) 
        : "..."}
    </p>
    <p>
      % Change {stats.length > 1 
        ? (((stats[1].rate - stats[0].rate) / stats[0].rate)* 100).toFixed(2) 
        : "..."}%
    </p>
    </>
  )
}