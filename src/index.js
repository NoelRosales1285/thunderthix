import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  state = {
    posts: [],
    isLoading: true,
    errors: null
  };

  getPosts() {
    axios
      .get("https://admin.thunderstage.com/barcode/events.json", {
        params: {},
        auth: {
          username: "demo9",
          password: "demodemo"
        }
      })
      .then(response => {
        this.setState({
          posts: response.data,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    const { isLoading, posts } = this.state;
    return (
      <React.Fragment>
        <h2>Events</h2>
        <div>
          {!isLoading ? (
            posts.map(post => {
              const { id, name, seating_chart } = post;
              return (
                <div key={id}>
                  <p>
                    <strong>User ID:</strong> {id}
                  </p>
                  <p>
                    <strong>Name:</strong> {name}
                  </p>
                  <p>
                    <strong>Email:</strong> {seating_chart}
                  </p>
                  <hr />
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
