export default function TabList({favourites}){
  return (
    <>
    <nav className="ml-70 mt-8">
      <ul className="flex gap-8 uppercase text-neutral-500">
        <li>History</li>
        <li><span>{favourites?.length ?? 0}</span> Favorites</li>
      </ul>
    </nav>
    </>
  )
}