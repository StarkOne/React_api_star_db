import React, { Component } from "react";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import "./people-page.css";
import SwapiServece from "../../services/swapi-service";
import Row from "../row";

import ErrorBoundry from "../error-boundry";

export default class PeoplePage extends Component {
  swapiService = new SwapiServece();

  state = {
    selectedPerson: null
  };
  onPersonSelered = id => {
    this.setState(state => {
      return {
        selectedPerson: id
      };
    });
  };

  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelered}
        getData={this.swapiService.getAllPeople}
      >
        {i => `${i.name} (${i.birthYear})`}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails personId={this.state.selectedPerson} />
      </ErrorBoundry>
    );

    return <Row left={itemList} right={personDetails} />;
  }
}
