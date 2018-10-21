import React from "react";
import Button from "@material-ui/core/Button";
import { shallowEqual } from "shouldcomponentupdate-children";

const styles = {
  gridItemContainer: {
    backgroundColor: "#343b64",
    padding: "1.2rem",
    border: "none",
    borderRadius: 5
  },
  warning: {
    color: "#c3cdd0",
    fontSize: ".9rem",
    marginTop: ".8rem"
  }
};

class DeleteAccount extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowEqual(this.props, nextProps, this.state, nextState);
  }

  handleChange = event => this.setState({ password: event.target.value });

  // onButtonClick = () => {
  //   const { tag } = this.state;
  //   if (tag.length === 0) {
  //     return false;
  //   }
  //   fetch(`/add-custom-tag`, {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: window.localStorage.getItem("token")
  //     },
  //     body: JSON.stringify({
  //       _id: this.props.user._id,
  //       tag: tag
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(user => {
  //       if (user) {
  //         this.setState({ tag: "" });
  //         this.props.loadUser(user);
  //       }
  //     })
  //     .catch(err => console.log);
  // };

  render() {
    return (
      <div style={styles.gridItemContainer}>
        <div>Delete account</div>
        <div style={styles.warning}>
          Once you delete your account, there is no going back.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <Button
            variant="text"
            size="small"
            color="secondary"
            style={{ marginTop: "1.5rem" }}
            onClick={this.onButtonClick}
          >
            Delete account
          </Button>
        </div>
      </div>
    );
  }
}

export default DeleteAccount;
