import React, { Component } from "react";

import "./person-details.css";
import SwapiServece from "../../services/swapi-service";
import Spinner from "../spinner";

export default class PersonDetails extends Component {
  swapiService = new SwapiServece();

  state = {
    person: null,
    isLoading: false
  };
  componentDidMount() {
    this.updatePerson();
  }
  updatePerson = () => {
    const { personId } = this.props;
    if (!personId) {
      return;
    }
    setTimeout(() => {
      this.swapiService.getPerson(personId).then(person => {
        this.setState({
          person,
          isLoading: false
        });
      });
    }, 1000);
  };
  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (this.props.personId !== prevProps.personId) {
      this.setState({ isLoading: true });
      this.updatePerson();
    }
  }
  render() {
    if (!this.state.person && !this.state.isLoading) {
      return <span>Select a person from a list</span>;
    }
    if (this.state.isLoading) {
      return <Spinner />;
    }
    const { id, name, gender, birthYear, eyeColor } = this.state.person;
    return (
      <div className="person-details card">
        <img
          className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
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
