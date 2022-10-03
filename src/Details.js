import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ThemeContext from "./ThemeContext";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

class Details extends React.Component {
  state = { loading: true, showModal: false };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();
    this.setState({ loading: false, ...json.pets[0] });
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }

    const { name, animal, breed, city, state, description, images, showModal } =
      this.state;

    return (
      <div className="details">
        <div>
          <Carousel images={images} />
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <button
            onClick={this.toggleModal}
            style={{ backgroundColor: this.props.themeColor }}
          >
            Adopt {name}
          </button>
          <p>{description}</p>
          {showModal && (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <a href="https://bit.ly/pet-adopt">Yes</a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

const WrapperDetails = () => {
  const [themeColor] = useContext(ThemeContext);
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details themeColor={themeColor} params={params} />
    </ErrorBoundary>
  );
};

export default WrapperDetails;
