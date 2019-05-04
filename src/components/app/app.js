import React, { Component } from "react";
import Header from "../header";
import RandomPlanet from "../random-planet";
import PeoplePage from "../people-page";
import "./app.css";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {
  swapiService = new SwapiService();
  state = {
    hasError: false
  };
  componentDidCatch() {
    this.setState({ hasError: true });
    console.log("componentDidCatch");
  }
  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    return (
      <div>
        <Header />
        <RandomPlanet />
        <PeoplePage />
      </div>
    );
  }
}
