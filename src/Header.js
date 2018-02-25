import React, {Component} from 'react';
import './Header.css';

class Header extends Component {

  componentDidMount() {
    this.searchBar.focus();
  }

  render() {
    return (
      <div className="App-header">
        <div className="App-title align-header">Flickr Public Feed</div>
        <div className="search-container">
          <input className="search-field" type="text" value={this.props.searchField} onChange={this.props.updateField}
                 placeholder={"Search"}
                 ref={(input) => { this.searchBar = input; }}
          />
          <div className="search-button" onClick={this.props.makeQuery}>
            <i className="fa fa-search"/>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
