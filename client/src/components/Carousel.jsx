import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import CarouselCard from './CarouselCard.jsx';
import styles from '../styles.css';

class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItemIndex: 0
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="artistName">{this.props.artistName}</div>
        <div style={{ "maxWidth": "95%", "margin": "0 auto" }}>
          <ItemsCarousel
            requestToChangeActive={index => {
              this.setState({ activeItemIndex: index })
            }}
            enablePlaceholder={true}
            activeItemIndex={this.state.activeItemIndex}
            numberOfCards={7}
            gutter={20}
            leftChevron={<button className="chevron">{'<'}</button>}
            rightChevron={<button className="chevron">{'>'}</button>}
            outsideChevron
            chevronWidth={40}
            classes={{
              leftChevronWrapper: "leftChevronWrapper",
              rightChevronWrapper:"rightChevronWrapper"
            }}
          >
            {this.props.list.map((work) => {
              return (
                <CarouselCard selectArtWork={this.props.selectArtWork} work={work} />
              );
            })}
          </ItemsCarousel>
        </div>
      </React.Fragment>
    )
  }
}

export default Carousel;