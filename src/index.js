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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Basic  ZGVtbzk6ZGVtb2RlbW8="
        }
      })
      .then(response => {
        this.setState({
          posts: response.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.message);
        console.log(error.stack);
        console.log(error.config);
      });
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
                    <strong>Seating Chart:</strong> {seating_chart}
                  </p>
                  <hr />
                </div>
              );
            })
          ) : (
            <div id="loading">
              <img src="_loading.gif" alt="loading" />
              <p>loading...</p>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
