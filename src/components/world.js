import React from "react";

export default class Header extends React.Component {

  
    constructor(props) {
      super(props);
      this.state = {favoritecolor: "Hell"};
    }
    componentDidMount() {
      setTimeout(() => {
        this.setState({favoritecolor: "yellow"})
      }, 1000)
    }
    render() {
      return (
        <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      );
    }
  }