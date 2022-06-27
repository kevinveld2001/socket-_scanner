import PhoneConnector from "../components/phoneConnector"


export default function Home() {
  return (
    <div className="md:mx-40 mx-3 mt-3">
      <div className="bg-blue-100 border-blue-300 border-2 rounded p-3 my-2">
        Hieronder kun je een qr code scannen met je mobiel vervolgens kun je met je mobiel andere qr codes scannen en deze zullen dan op je pc te zien zijn.
      </div>
      <PhoneConnector/>

    </div>
  )
}
