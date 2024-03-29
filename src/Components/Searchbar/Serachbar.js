import { useState } from "react";

function Searchbar({ onQueryUpdate }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onQueryUpdate(searchQuery.trim());
    setSearchQuery("");
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
        />
      </form>
    </header>
  );
}

// class Searchbar extends Component {
//   state = {
//     searchQuery: "",
//   };

//   handleChange = (e) => {
//     this.setState({ searchQuery: e.currentTarget.value });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.onQueryUpdate(this.state.searchQuery.trim());
//     this.setState({ searchQuery: "" });
//   };

//   render() {
//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={this.handleSubmit}>
//           <button type="submit" className="SearchForm-button">
//             <span className="SearchForm-button-label">Search</span>
//           </button>

//           <input
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onInput={this.handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

export default Searchbar;
