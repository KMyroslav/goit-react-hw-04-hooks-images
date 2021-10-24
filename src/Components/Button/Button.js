function Button({ fetchCards }) {
  return (
    <button type="button" className="Button" onClick={fetchCards}>
      Load More
    </button>
  );
}

export default Button;
