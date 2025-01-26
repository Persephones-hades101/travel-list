
// Items component (it is used a a child component in Packinglist Component) 
export default function Item({ item, onDeleteItems, onUpdateItems }) {
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

