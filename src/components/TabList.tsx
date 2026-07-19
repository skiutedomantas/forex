
export default function TabList({favourites, setActiveTab, activeTab}){
  return (
    <>
    <nav className="ml-70 mt-8">
      <ul className="flex gap-8 uppercase text-neutral-500">
        <li><button onClick={()=> setActiveTab('history')} className={activeTab === 'history' ? 'border-b border-neongreen text-neutral-200 pb-2' : 'border-0 cursor-pointer'}>History</button></li>
        <li><button onClick={()=> setActiveTab('favourites')} className={activeTab === 'favourites' ? 'border-b border-neongreen text-neutral-200 pb-2' : 'border-0 cursor-pointer'}><span>{favourites?.length ?? 0}</span> Favorites</button></li>
      </ul>
    </nav>
    </>
  )
}