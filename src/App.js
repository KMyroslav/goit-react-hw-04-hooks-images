import { Component } from "react";
import fetchImages from "./Services/fetchImages";
import Searchbar from "./Components/Searchbar/Serachbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";
import Loader from "react-loader-spinner";
import Modal from "./Components/Modal/modal";

class App extends Component {
  state = {
    cards: [],
    searchQuery: "",
    page: 1,
    status: "idle",
    showModal: false,
    bigPicture: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchCards();
    }
  }

  fetchCards = () => {
    this.setState({ status: "pending" });
    fetchImages(this.state.searchQuery, this.state.page)
      .then((r) => {
        this.setState((prevState) => ({
          cards: [...prevState.cards, ...r.hits],
          page: this.state.page + 1,
          status: "resolved",
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => console.log(error));
  };

  onQueryUpdate = (searchQuery) => {
    this.setState({
      cards: [],
      searchQuery: searchQuery,
      page: 1,
      status: "idle",
    });
  };

  toggleModal = (picture) => {
    this.setState({ showModal: !this.state.showModal, bigPicture: picture });
  };

  render() {
    const { cards, searchQuery, page, status, showModal, bigPicture } =
      this.state;
    return (
      <div className="App">
        <Searchbar onQueryUpdate={this.onQueryUpdate} />
        <ImageGallery cards={cards} toggleModal={this.toggleModal} />
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
          <Button
            searchQuery={searchQuery}
            page={page}
            fetchCards={this.fetchCards}
          />
        )}
        {showModal && (
          <Modal toggleModal={this.toggleModal} bigPicture={bigPicture} />
        )}
      </div>
    );
  }
}

export default App;
