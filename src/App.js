import { useState } from "react"
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];


// root Component
function App() {
  const [items, setItems] = useState([])

  // function to add items into the item state array
  function handleAddItem(item) {
    setItems((items) => [...items, item])
  }

  // function to delete items from the item state array
  function handleDelete(itemIdToBeDeleted) {
    setItems((items) => items.filter(item => item.id !== itemIdToBeDeleted))
  }

  // function to update the packed value of item in the items state array
  function handleUpdatePackedStatus(itemIdToBeUpdated) {
    setItems((items) => items.map(item => item.id === itemIdToBeUpdated ? { ...item, packed: !item.packed } : item))
  }

  function handleClearList() {
    if (window.confirm("Are you sure you want to clear the list?")) {
      setItems([]);
    }
  }

  return (
    <div className='app' >
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList itemsList={items} onDeleteItems={handleDelete} onUpdateItems={handleUpdatePackedStatus} onClearList={handleClearList} />
      <Stats items={items} />
    </div>
  );
}


// Logo Component
function Logo() {
  return <h1>🌴 Far Away 🧳</h1>
}



// Form Component
function Form({ onAddItems }) {
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

// Packing List Component
function PackingList({ itemsList, onDeleteItems, onUpdateItems, onClearList }) {
  const [sortBy, setSortBy] = useState("input")

  let sortedItems;
  if (sortBy === "input") sortedItems = itemsList
  else if (sortBy === "description") sortedItems = itemsList.slice().sort((a, b) => a.description.localeCompare(b.description))
  else sortedItems = itemsList.slice().sort((a, b) => Number(a.packed) - Number(b.packed))


  function handleClearListButton() {
    onClearList()
  }

  return (
    <div className="list">
      <ul>
        {
          sortedItems.map((item) => (
            <Item item={item} key={item.id} onDeleteItems={onDeleteItems} onUpdateItems={onUpdateItems} />
          ))
        }
      </ul>
      <div className="action">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleClearListButton}>Clear List</button>
      </div>
    </div>

  )
}


// Items component (it is used a a child component in Packinglist Component) 
function Item({ item, onDeleteItems, onUpdateItems }) {
  // function to handle clicking X button
  function handleClick() {
    onDeleteItems(item.id)
  }
  function handleCheckBoxChange() {
    onUpdateItems(item.id)
  }
  return <li>
    <input type="checkbox" value={item.packed} onChange={handleCheckBoxChange} />
    <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
    <button onClick={handleClick}>❌</button>
  </li>
}



function Stats({ items }) {
  if (!items.length) return (
    <footer className="stats">
      <em>
        Start adding items to your packing list
      </em>
    </footer>
  )
  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const percentage = Math.round(numPacked / numItems * 100)

  return (
    <footer className='stats'>
      <em>
        {
          percentage === 100
            ? "You got everything! Ready to go ✈️"
            : `You have ${numItems} items on your list,and you have already packed ${numPacked}(${percentage}%`
        }
      </em>
    </footer>
  )
}





export default App;
