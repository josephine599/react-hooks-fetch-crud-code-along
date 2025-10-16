import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  const { id, name, category, isInCart } = item;

  function handleAddToCartClick() {
    fetch(`http://localhost:4000/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isInCart: !isInCart }),
    })
      .then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem));
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${id}`, {
      method: "DELETE",
    }).then(() => onDeleteItem(item));
  }

  return (
    <li className={isInCart ? "in-cart" : ""}>
      <span>{name}</span>
      <span className="category">{category}</span>
      <button
        className={isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
