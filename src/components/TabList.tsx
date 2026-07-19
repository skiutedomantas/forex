
export default function TabList({favourites, setActiveTab, activeTab}){
  return (
    <>
    <nav className="ml-70 mt-8">
      <ul className="flex gap-8 text-neutral-500">
        <li><button onClick={()=> setActiveTab('history')} className={`uppercase ${activeTab === 'history' ? 'border-b border-neongreen text-neutral-200 pb-2' : 'border-0 cursor-pointer'}`}>History</button></li>
        <li><button onClick={()=> setActiveTab('favourites')} className={`uppercase ${activeTab === 'favourites' ? 'border-b border-neongreen text-neutral-200 pb-2' : 'border-0 cursor-pointer'}`}><span className="rounded-full py-1.5 px-3 text-black bg-neongreen">{favourites?.length ?? 0}</span> Favorites</button></li>
      </ul>
    </nav>
    </>
  )
}