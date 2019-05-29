import React from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

const style = {
  height: 80,
  width: 200,
  border: "3px solid green",
  margin: 6,
  padding: 8
};

const baseUrl = "https://demo.thunderstage.com/api/public_events";

const getUsers = async page => {
  try {
    return await axios.get(baseUrl + "?page=" + page);
  } catch (error) {
    console.error(error);
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    items: Array.from({ length: 20 }),
    page: 1,
    res: [],
    hasMore: true
  };
  componentWillMount() {
    getUsers(this.state.page).then(res => {
      this.fetchMoreData();
    });
  }

  fetchMoreData = () => {
    console.log("feching...page:", this.state.page);
    getUsers(this.state.page).then(res => {
      this.setState({
        res: this.state.res.concat(Array.from(res.data.objects)),
        page: this.state.page + 1,
        hasMore: res.data.total_pages > this.state.page
      });
    });
  };

  render() {
    return (
      <div>
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.state.res.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
        >
          <Grid container spacing={40}>
            {this.state.res.map((i, index) => (
              <Grid key={index * 10} item>
                <div style={style} key={index}>
                  <mark>{i.id}</mark> <br />
                  {i.name}
                  <br />
                  {i.seating_chart_id}
                </div>
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
