import React from "react";

function ImageGalleryItem(card, toggleModal) {
  return (
    <li className="ImageGalleryItem" key={card.id}>
      <img
        src={card.webformatURL}
        alt={`${card.tags}`}
        className="ImageGalleryItem-image"
        onClick={() => toggleModal(card.largeImageURL)}
      />
    </li>
  );
}

export default ImageGalleryItem;
