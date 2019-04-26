import React, { Component } from "react";
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import './people-page.css';
import SwapiServece from "../../services/swapi-service";

export default class PeoplePage extends Component {
  swapiService = new SwapiServece;
  state = {
    selectedPerson: null,
    hasError: false,
  }
  onPersonSelered = (id) => {
    this.setState((state) => {
      const { selectedPerson } = state;
      return {
        selectedPerson: id,
      }
    });
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }
    return (
      <div className="row mb2">
        <div className="col-md-6 mb-2">
          <ItemList 
            onItemSelected={this.onPersonSelered}
            getData={this.swapiService.getAllPeople}  
            renderItem={({ name, gender, birthYear }) => `${name} (${gender}, ${birthYear})`} 
          />
        </div>
        <div className="col-md-6 mb-2">
          <PersonDetails personId={this.state.selectedPerson} />
        </div>
      </div>
    );
  }
}