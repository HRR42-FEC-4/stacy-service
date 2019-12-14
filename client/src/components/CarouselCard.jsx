import React from 'react';
import styles from '../styles.css';

const CarouselCard = function (props) {
  return (
    <div
      className="card"
      onClick={() => props.selectArtWork(props.work)}
    >

      <div className="imageContainer">
        <img className="image" src={props.work.imgUrl} />
      </div>
      <p style={{ margin: 0, marginTop: '10px' }}>{props.work.title}</p>
    </div>
  )
}

export default CarouselCard;