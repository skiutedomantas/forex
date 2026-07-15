import { useEffect, useState } from "react";

export default function Stats(){
  const [stats, setStats] = useState([]);

    const yesterday = new Date(Date.now() - 86400000)
  .toISOString()
  .split("T")[0];  

    useEffect(()=> {
        async function  fetchStat(){
          try {
            const response = await fetch(
          `https://api.frankfurter.dev/v2/rates?from=${yesterday}&quotes=EUR&base=USD`
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

  const change =
    stats.length > 1
    ? (stats[1].rate - stats[0].rate).toFixed(4)
    : null;

  const percentChange =
    stats.length > 1
    ? (((stats[1].rate - stats[0].rate) / stats[0].rate) * 100).toFixed(2)
    : null;
  return (
    <>
    <div className="flex gap-4 my-12 ml-68">
      <div className="flex flex-col bg-neutral-900 p-6 rounded-2xl w-40  ">
        <p className="uppercase text-neutral-500 font-light text-md">Open</p>
        <p className="text-xl">{stats.length > 1 ? stats[1].rate : "..."}</p>
      </div>
      <div className="flex flex-col bg-neutral-900 p-6 rounded-2xl w-40  ">
        <p className="uppercase text-neutral-500 font-light text-md">Last</p>
        <p className="text-xl">{stats.length > 1 ? stats[0].rate : "..."}</p>
      </div>
      <div className="flex flex-col bg-neutral-900 p-6 rounded-2xl w-40  ">
        <p className="uppercase text-neutral-500 font-light text-md">Change</p>
        <p className={`text-xl ${change > 0 ? 'text-neongreen' : 'text-red-600'}`}>
          {change > 0 ? '+' : ''}
          {change}
        </p>
      </div>
      <div className="flex flex-col bg-neutral-900 p-6 rounded-2xl w-40  ">
        <p className="uppercase text-neutral-500 font-light text-md">% Change</p>
        <p className={`text-xl flex items-center gap-1 ${percentChange > 0 ? 'text-neongreen' : 'text-red-600'}`}>
          <svg className={ percentChange > 0 ? ('-rotate-90 fill-neongreen w-4 h-3') : ('rotate-90 fill-red-600 w-4 h-3') } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>
          {percentChange > 0 ? '+' : ''}
          {percentChange}%
        </p>
      </div>
    </div>
    </>
  )
}