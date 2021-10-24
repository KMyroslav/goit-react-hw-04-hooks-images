import { Component } from "react";
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
    fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.state.searchQuery}&page=${this.state.page}&per_page=12&key=23035178-c9501c24659a46c37914a5a12`
    )
      .then((r) => r.json())
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
