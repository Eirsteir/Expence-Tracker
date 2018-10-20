import React from "react";
import PopularTagsItem from "./PopularTagsItem";

const initialState = {
  popularTags: []
};

class PopularTagsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    return this.setState({ popularTags: this.popularTags });
  }

  // making sure the expences aren't added again when component is remounted but this.popularTags arrays remains the same
  componentWillUpdate() {
    return (this.popularTags = []);
  }

  // add to array with key=tag and initial value=0 [Food, 0]
  popularTags = []; // array.map returns a new array - do we need this?
  getOrderedTags = tags => {
    tags.map(tag => {
      return this.popularTags.push([tag, 0]);
    });
  };

  // loop expences and add amount to respective tag (key) in popular tags array
  getPopularTags = expences => {
    // tag: sum
    expences.map((exp, i) => {
      const tag = expences[i].tag;
      const amount = expences[i].amount;

      return this.popularTags.map((exp, i) => {
        if (this.popularTags[i][0] === tag) {
          return (this.popularTags[i][1] = this.popularTags[i][1] + amount);
        }
        return true;
      });
    });
  };

  render() {
    const { currency, tags, expences } = this.props;
    const { popularTags } = this.state;
    this.getOrderedTags(tags);
    this.getPopularTags(expences);

    // sort popular tags by sum in decreasing order
    const sortedTags = popularTags.sort((a, b) => b[1] - a[1]).slice(0, 6);
    return (
      <div
        style={{
          backgroundColor: "#343b64",
          color: "#fff",
          height: "18rem",
          padding: "1rem"
        }}
      >
        Popular tags
        <div style={{ marginTop: "1rem" }}>
          {sortedTags.map((exp, i) => {
            return (
              <PopularTagsItem
                key={i}
                tag={popularTags[i][0]}
                amount={popularTags[i][1]}
                currency={currency}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default PopularTagsList;
