import React, { Component } from 'react';

import './item-list.css';
import SwapiServece from '../../services/swapi-service';
import Spinner from '../spinner';

export default class ItemList extends Component {
  swapiServece = new SwapiServece();

  state = {
    peopleList: null,
  }
  
  componentDidMount() {
    this.swapiServece
        .getAllPeople()
        .then((peopleList) => {
          this.setState({
            peopleList,
          })
        })
  }
  propsOnItemSelected(id) {

  }
  renderItems(arr) {
    return arr.map(({id, name}) => {
      return (
        <li className="list-group-item" 
          key={id}
            onClick={()=> {
              this.props.onItemSelected(id)
            }}
          >
          {name}
        </li>
      );
    });
  }

  render() {
    const { peopleList } = this.state;
    if (!peopleList) {
      return <Spinner />
    }

    const items = this.renderItems(peopleList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}
