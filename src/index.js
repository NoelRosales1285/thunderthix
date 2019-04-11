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
      .get(
        "https://admin.thunderstage.com/barcode/events.json",
        { crossdomain: true },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Max-Age": "86400",
            "Access-Control-Allow-Headers":
              "Content-Type, Authorization, X-Requested-With"
          }
        }
      )
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
