import { useState } from "react";

// Form Component
export default function Form({ onAddItems }) {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)




  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!description) return;
    const newItem = { description, quantity, id: Date.now(), packed: false }
    // console.log(newItem)
    onAddItems(newItem)
    setDescription("")
    setQuantity(1)
  }


  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want for your 😊 Trip?</h3>
      <select value={quantity} onChange={(e) => { setQuantity(Number(e.target.value)) }}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((val) => (
          <option value={val} key={val}>{val}</option>
        ))}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} />
      <button >Add</button>
    </form>
  )
}