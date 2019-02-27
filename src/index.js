import axios from "axios";
import React from "react";
import { render } from "react-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    axios
      .get(`https://admin.thunderstage.com/barcode/events.json`)
      .then(respond => {
        const events = respond.data;
        this.setState({
          events
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Lists</h1>
        <div>
          <ul>
            {this.state.events.map((event, i) => (
              <Messages key={i} message={event} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

class Messages extends React.Component {
  render() {
    const listStyle = {
      marginBottom: 20
    };
    const nameStyle = {
      fontWeight: 900,
      fontSize: 20
    };
    return (
      <div>
        <li style={listStyle}>
          <div style={nameStyle}>{this.props.message.name}</div>
          <div>{this.props.message.seating_chart}</div>
        </li>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
