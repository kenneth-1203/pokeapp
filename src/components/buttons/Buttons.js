import React, { Component } from "react";

export default class Buttons extends Component {
  render() {
    const { changePage } = this.props;

    return (
      <div className="buttons">
        <button type="button" className="btn btn-light" onClick={() => changePage("previous")}>
          Previous
        </button>
        <button type="button" className="btn btn-light" onClick={() => changePage("next")}>
          Next
        </button>
      </div>
    );
  }
}
