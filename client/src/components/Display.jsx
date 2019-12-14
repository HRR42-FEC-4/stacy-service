import React from 'react';

class Display extends React.Component {

  render() {
    return (
      <div>
        <img src={this.props.work.imgUrl} />
        <p>{this.props.work.title}</p>
      </div>
    )
  }
}

export default Display;