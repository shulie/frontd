import React from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }
  carouselNext() {
    this.slick.slickNext();
  }
  carouselPrev() {
    this.slick.slickPrev();
  }
  carouselGo(number) {
    this.slick.slickGoTo(number)
  }
  render() {
    const me = this;
    const {children, ...props } = me.props;
    return (
      <div className="dh-carousel">
        <Slick  {...props} ref={s => this.slick = s}>
          { children }
        </Slick>
      </div>
    );
  }
}
export default Carousel;