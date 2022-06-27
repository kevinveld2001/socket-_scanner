import PhoneConnector from "../components/phoneConnector"
import { useState } from 'react';

let globalSetScanList;
let globalScanList;


export default function Home() {
  return (
    <div className="md:mx-40 mx-3 mt-3">
      <div className="bg-blue-100 border-blue-300 border-2 rounded p-3 my-2">
        Hieronder kun je een qr code scannen met je mobiel vervolgens kun je met je mobiel andere qr codes scannen en deze zullen dan op je pc te zien zijn.
      </div>
      <PhoneConnector scanListener={(scan)=>{
        globalSetScanList([...globalScanList, {text: scan, id:globalScanList.length}])}}/>
      <ScanList/>
    </div>
  )
}

function ScanList() {
  const [scanList, setScanList] = useState([]);
  globalSetScanList = setScanList;
  globalScanList = scanList;
  return <div>
    {scanList.map((scan => <p key={scan.id}>{scan.text}</p>))}
  </div>
}
