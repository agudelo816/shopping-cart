import React from "react";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
    };
  }

  componentDidMount() {
    this.loadCartFromLocalStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartItems !== this.state.cartItems) {
      this.saveCartToLocalStorage();
    }
  }

  loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem("shoppingCart");
    if (cart) {
      this.setState({ cartItems: JSON.parse(cart) });
    }
  };

  saveCartToLocalStorage = () => {
    const { cartItems } = this.state;
    localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
  };

  addItemToCart = (item) => {
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, item],
    }));
  };

  removeItemFromCart = (itemId) => {
    this.setState((prevState) => ({
      cartItems: prevState.cartItems.filter((item) => item.id !== itemId),
    }));
  };

  render() {
    return (
      <div>
        <h2>Shopping Cart</h2>
        <ul>
          {this.state.cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x ${item.price}
              <button onClick={() => this.removeItemFromCart(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() =>
            this.addItemToCart({
              id: Date.now(),
              name: "New Item",
              quantity: 1,
              price: 10,
            })
          }
        >
          Add Random Item
        </button>
      </div>
    );
  }
}

export default ShoppingCart;
