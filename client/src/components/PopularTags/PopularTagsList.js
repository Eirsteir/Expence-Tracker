import React from "react";
import PopularTagsItem from "./PopularTagsItem";

class PopularTagsList extends React.Component {
  // add to array with key=tag and initial value=0 [Food, 0]
  popularTags = [];
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

      this.popularTags.map((exp, i) => {
        if (this.popularTags[i][0] === tag) {
          return (this.popularTags[i][1] = this.popularTags[i][1] + amount);
        }
      });
    });
  };

  render() {
    const { currency } = this.props;
    this.getOrderedTags(this.props.tags);
    this.getPopularTags(this.props.expences);

    // sort popular tags by sum in decreasing order
    const sortedTags = this.popularTags.sort((a, b) => b[1] - a[1]).slice(0, 6);
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
                tag={this.popularTags[i][0]}
                amount={this.popularTags[i][1]}
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
