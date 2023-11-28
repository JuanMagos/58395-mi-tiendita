const ItemCount = ({ stock, setCount, count }) => {
  const onAdd = () => {
    if (count === stock) return;
    setCount(count + 1);
  };

  const onSubtract = () => {
    if (count === 0) return;
    setCount(count - 1);
  };
  return (
    <div>
      <button onClick={onSubtract}>-</button>
      <span>{count}</span>
      {count === stock ? null : <button onClick={onAdd}>+</button>}
    </div>
  );
};

export default ItemCount;
