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
        <form className="search-container" onSubmit={this.props.makeQuery}>
          <input className="search-field" type="text" value={this.props.searchField} onChange={this.props.updateField}
                 placeholder={"Search"}
                 ref={(input) => { this.searchBar = input; }}
          />
          <div className="search-button" onClick={this.props.makeQuery}>
            <i className="fa fa-search"/>
          </div>
        </form>
      </div>
    )
  }
}

export default Header;
