import { useState, useEffect } from "react";
import fetchImages from "./Services/fetchImages";
import Searchbar from "./Components/Searchbar/Serachbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";
import Loader from "react-loader-spinner";
import Modal from "./Components/Modal/modal";

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);
  const [bigPicture, setBigPicture] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchCards();
    // eslint-disable-next-line
  }, [searchQuery]);

  const fetchCards = () => {
    setStatus("pending");
    fetchImages(searchQuery, page)
      .then((r) => {
        setCards((prevState) => [...prevState, ...r.hits]);
        setPage((prevState) => prevState + 1);
        setStatus("resolved");
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => console.log(error));
  };

  const onQueryUpdate = (searchQuery) => {
    setCards([]);
    setSearchQuery(searchQuery);
    setPage(1);
    setStatus("idle");
  };

  const toggleModal = (picture) => {
    setShowModal((prevState) => !prevState);
    setBigPicture(picture);
  };

  return (
    <div className="App">
      <Searchbar onQueryUpdate={onQueryUpdate} />
      <ImageGallery cards={cards} toggleModal={toggleModal} />
      {status === "pending" && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      )}
      {status === "resolved" && (
        <Button searchQuery={searchQuery} page={page} fetchCards={fetchCards} />
      )}
      {showModal && <Modal toggleModal={toggleModal} bigPicture={bigPicture} />}
    </div>
  );
}

export default App;
