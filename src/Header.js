import React, {Component} from 'react';
import './Header.css';

class Header extends Component {

  componentDidMount() {
    this.searchBar.focus();
  }

  render() {
    return (
      <div className="App-header">
        <h1 className="App-title align-header">Flickr Public Feed</h1>
        <div className="search-container">
          <form onSubmit={this.props.makeQuery}>
            <input className="search-field" type="text" value={this.props.searchField} onChange={this.props.updateField}
                   placeholder={"Search"}
                   ref={(input) => { this.searchBar = input; }}
            />
            <button type="submit">
              <i className="fa fa-search"/>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Header;
