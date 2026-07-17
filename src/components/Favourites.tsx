export default function Favourites({favourites}){
  return (
    <>
    <ul className="ml-70 mt-10 flex flex-col gap-8">
      {favourites.map((fav)=>(
        <li className="px-8 py-6 flex rounded-md items-center justify-between max-w-56 bg-neutral-900" key={fav.id}><span className="text-sm text-neutral-500">{fav.base}/{fav.quote}</span><span className="text-lg">{(fav.rate).toFixed(4)}</span></li>
      ))}
    </ul>
    </>
  )
}