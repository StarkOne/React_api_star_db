import React, { Component } from "react";
import SwipeService from "../../services/swapi-service";
import Spinner from "../spinner";
import "./random-planet.css";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {
  swapiServece = new SwipeService();
  state = {
    planet: {},
    loading: true
  };

  onPlanetLoader = planet => {
    this.setState({
      planet,
      loading: false,
      error: false
    });
  };
  onError = err => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 15 + 3);
    this.swapiServece
      .getPlanet(id)
      .then(this.onPlanetLoader)
      .catch(this.onError);
  };

  componentDidMount() {
    console.log("didMount");
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 4000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { planet, loading, error } = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;
  return (
    <React.Fragment>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
