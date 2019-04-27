import React, { Component } from "react";

import "./item-details.css";
import SwapiServece from "../../services/swapi-service";
import Spinner from "../spinner";

export default class ItemDetails extends Component {
  swapiService = new SwapiServece();

  state = {
    item: null,
    isLoading: false,
    image: null,
  };
  componentDidMount() {
    this.updateItem();
  }
  updateItem = () => {
    const { itemId, getData, getImageUrl } = this.props;
    console.log(itemId);
    if (!itemId) {
      return;
    }
    setTimeout(() => {
      getData(itemId).then(item => {
        this.setState({
          item,
          image: getImageUrl(item),
          isLoading: false
        });
      });
    }, 1000);
  };
  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({ isLoading: true });
      this.updateItem();
    }
  }
  render() {
    if (!this.state.item && !this.state.isLoading) {
      return <span>Select a item from a list</span>;
    }
    if (this.state.isLoading) {
      return <Spinner />;
    }
    const { id, name, gender, birthYear, eyeColor } = this.state.item;
    return (
      <div className="item-details card">
        <img
          className="item-image"
          src={this.state.image}
          alt={name}
        />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
