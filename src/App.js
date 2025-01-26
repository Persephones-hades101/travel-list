import { useState } from "react"
import Logo from "./Logo"
import Form from "./Form"
import PackingList from "./PackingList"
import Stats from "./Stats"

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

export default App;
