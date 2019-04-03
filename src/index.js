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
        "http://admin.thunderstage.com/barcode/events.json",
        {
          headers: { Authorization: "Basic  ZGVtbzk6ZGVtb2RlbW8=" }
        },
        {
          auth: {
            username: "demo9",
            password: "demodemo"
          }
        }
      )
      .then(response => {
        console.log("Data: ", response.data);
        alert(response);
      })
      // .then(response => {
      // this.setState({
      // posts: response.data,
      // isLoading: false
      // });
      //})
      .catch(error => {
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
