import { useEffect, useState } from "react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export default function Chart({receiveCurrent, sendCurrent}) {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    async function fetchStat() {
      try {
        const response = await fetch(
          `https://api.frankfurter.dev/v2/rates?from=2026-01-01&group=week&base=${sendCurrent}&quotes=${receiveCurrent}`
        );

        if (!response.ok) {
          throw new Error("Something wrong");
        }

        const data = await response.json();
        setStats(data);

      } catch (error) {
        console.log(error.message);
      }
    }

    fetchStat();
  }, [sendCurrent, receiveCurrent]);

  const data = stats.map(stat => ({
    date: stat.date,
    rate: stat.rate,
  }));

  const rates = data.map(item => item.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);

  return (
    <div className="flex items-center flex-col mx-70 py-10 bg-neutral-900">
      <div className="flex justify-between w-full px-8 mb-8">
        <p className="text-neutral-400">{sendCurrent}/{receiveCurrent}</p>
        <div className="flex gap-2 text-neutral-400">
          <span>{stats.length > 0 ? (stats[stats.length - 1].rate) : '...'}</span>
          <span>&#8729;</span>
          <span>{stats.length > 0 ? (stats[stats.length - 1].date) : '...'}</span>
        </div>
      </div>
    <ResponsiveContainer width="95%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
            <stop 
              offset="0%" 
              stopColor="#adff2f" 
              stopOpacity={0.5}
            />
            <stop 
              offset="100%" 
              stopColor="#adff2f" 
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" tickFormatter={(date) => {
          const d = new Date(date);
          return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          }}/>
        <YAxis domain={['dataMin - 0.001', 'dataMax + 0.001']} ticks={[minRate, maxRate]} tickFormatter={(value) => value.toFixed(4)}/>
        <Area 
           type="monotone"
          dataKey="rate"
          stroke="#adff2f"
          fill="url(#neonGradient)"
        />
        <Tooltip contentStyle={{
          backgroundColor: "#171717",
          border: "none",
          borderRadius: "12px",
          padding: "12px",
          }}
          labelStyle={{
            color: "#a3a3a3",
            marginBottom: "5px",
          }}
          itemStyle={{
            color: "#adff2f",
          }}/>
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
}