import React, { Component } from 'react';
import SwipeService from '../../services/swapi-service';
import Spinner from '../spinner';
import './random-planet.css';

export default class RandomPlanet extends Component {
  swapiServece = new SwipeService()
  state = {
    planet: {}
  }

  onPlanetLoader = (planet) => {
    this.setState({planet})
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * 25 + 2);
    this.swapiServece
      .getPlanet(id)
      .then(this.onPlanetLoader)
  }

  constructor() {
    super();
    this.updatePlanet();
  }

  render() {

    const { planet: {id, name, population, rotationPeriod, diameter} } = this.state;

    return (
      <div className="random-planet jumbotron rounded">
        <img className="planet-image"
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
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
      </div>

    );
  }
}
