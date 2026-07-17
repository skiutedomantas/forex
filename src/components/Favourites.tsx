import { useEffect, useState } from "react";

export default function Favourites({ favourites }) {
  const [rates, setRates] = useState({});

  useEffect(() => {
    async function fetchRates() {
      const newRates = {};

      for (const fav of favourites) {
        try {
          const response = await fetch(
            `https://api.frankfurter.dev/v2/rates?base=${fav.base}&quotes=${fav.quote}`
          );

          if (!response.ok) {
            throw new Error("Something went wrong");
          }

          const data = await response.json();

          newRates[fav.id] = data[0].rate;
        } catch (error) {
          console.log(error.message);
        }
      }

      setRates(newRates);
    }

    if (favourites.length > 0) {
      fetchRates();
    }
  }, [favourites]);

  return (
    <ul className="ml-70 mt-10 flex flex-col gap-8">
      {favourites.map((fav) => (
        <li
          key={fav.id}
          className="px-8 py-6 flex rounded-md items-center justify-between max-w-56 bg-neutral-900"
        >
          <span className="text-sm text-neutral-500">
            {fav.base}/{fav.quote}
          </span>

          <span className="text-lg">
            {rates[fav.id] ?? "..."}
          </span>
        </li>
      ))}
    </ul>
  );
}