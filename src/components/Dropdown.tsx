import { useState } from "react";

export default function Dropdown({currencies, current, setCurrent}){
     const [open, setIsOpen] = useState(false);
  
     const handleVisibility =()=>{
        setIsOpen(!open);
     }
  return(
     <div className="dropdown">
  <button onClick={handleVisibility} className="dropdown-button">
    <img src={`../../public/flags/${current.slice(0,2).toLowerCase()}.webp`}/>
    {current}
    <svg className="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z"/></svg>
  </button>
  {open && (
  <div className="dropdown-menu">
    {currencies.map((currency)=>(
    <div onClick={()=>{
      setCurrent(currency.iso_code); 
      setIsOpen(false)
      }}
      className="dropdown-item">
      <img src={`../../public/flags/${currency.iso_code.slice(0,2).toLowerCase()}.webp`}/>
      {currency.iso_code}
    </div>
    ))}
  </div>
  )}
    </div>
  )
}