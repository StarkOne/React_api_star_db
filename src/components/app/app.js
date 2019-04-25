import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import PeoplePage from '../people-page';
import './app.css';
import ErrorIndicator from '../error-indicator';

export default class App extends Component {
  state = {
    hasError: false,
  }
  componentDidCatch() {
    this.setState({ hasError: true })
    console.log('componentDidCatch');
  }
  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }
    return (
      <div>
        <Header />
        <RandomPlanet />
        <PeoplePage />
        <PeoplePage />
        <PeoplePage />
      </div>
    );
  }
};