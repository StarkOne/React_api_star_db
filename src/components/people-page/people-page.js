import React, { Component } from "react";
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import './people-page.css';
import SwapiServece from "../../services/swapi-service";
import Row from '../row';

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

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelered}
        getData={this.swapiService.getAllPeople}
        renderItem={({ name, gender, birthYear }) => `${name} (${gender}, ${birthYear})`}
      />
    );

    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson} />
    );

    if (this.state.hasError) {
      return <ErrorIndicator />
    }
    return (
      <Row left={itemList} right={personDetails} />
    );
  }
}