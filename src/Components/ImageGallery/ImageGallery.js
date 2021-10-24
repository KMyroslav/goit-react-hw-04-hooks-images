import React from "react";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

function ImageGallery({ cards, toggleModal }) {
  return (
    <ul className="ImageGallery">
      {cards.map((el) => ImageGalleryItem(el, toggleModal))}
    </ul>
  );
}

export default ImageGallery;
