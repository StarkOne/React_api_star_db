import React, { Component } from "react";
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import "./people-page.css";
import SwapiServece from "../../services/swapi-service";
import Row from "../row";

import ErrorBoundry from "../error-boundry";

export default class PeoplePage extends Component {
  swapiService = new SwapiServece();

  state = {
    selectedPerson: null,
  };
  onPersonSelered = (selectedPerson) => {
    this.setState({ selectedPerson });
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

    const itemDet = (
      <ErrorBoundry>
        <ItemDetails 
          itemId={this.state.selectedPerson} 
          getData={this.swapiService.getPerson}
          getImageUrl={this.swapiService.getStarshipImage}
        />
      </ErrorBoundry>
    );

    return <Row left={itemList} right={itemDet} />;
  }
}
