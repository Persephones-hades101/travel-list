import { useState } from "react";
import Item from "./Items";
// Packing List Component
export default function PackingList({ itemsList, onDeleteItems, onUpdateItems, onClearList }) {
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
