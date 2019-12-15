import React from 'react';
import ReactDOM from 'react-dom';
import ItemsCarousel from 'react-items-carousel';
import Carousel from './components/Carousel.jsx';
import Display from './components/Display.jsx';
import styles from './styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artWorks: [],
      artistName: null,
      selectedArtWork: null,
    };
    this.filterList = this.filterList.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3002/artists/8")
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          artWorks: responseData.artworks,
          artistName: `${responseData.firstName} ${responseData.lastName}`
        });
      })
  }

  filterList() {
    const filteredList = this.state.artWorks.filter((work) => {
      if (this.state.selectedArtWork && work.id === this.state.selectedArtWork.id) {
        return false;
      }
      return true;
    });
    return filteredList;
  }

  render() {
    if (this.state.artWorks.length !== 0) {
      return (
        <React.Fragment>
          <Carousel selectArtWork={work => this.setState({ selectedArtWork: work })} list={this.filterList()} artistName={this.state.artistName} />
        </React.Fragment>
      )
    }
    return <p>Loading</p>
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

export default App;