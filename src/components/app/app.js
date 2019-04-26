import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import PeoplePage from '../people-page';
import './app.css';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';


export default class App extends Component {
  swapiService = new SwapiService;
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
        
        <div className="row mb2">
          <div className="col-md-6 mb-2">
            <ItemList 
              onItemSelected={this.onPersonSelered}
              getData={this.swapiService.getAllPlanets} 
              renderItem={(item) => item.name} 
            />
          </div>
          <div className="col-md-6 mb-2">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6 mb-2">
            <ItemList 
              onItemSelected={this.onPersonSelered} 
              getData={this.swapiService.getAllStarships}
              renderItem={(item) => (<span>{item.name} <button className="btn btn-primary">!</button></span>)} 
          />
          </div>
          <div className="col-md-6 mb-2">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>
        
      </div>
    );
  }
};