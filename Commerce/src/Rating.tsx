import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'

interface RatingProps {
    score: number
    numReviews: number
}

export const Rating = (props: RatingProps) => {
    const elements = []
    let rating = props.score;
    for(let i=0; i<5; i++) {
      if(rating > 0 && rating < 1) {
        elements.push(<FaStarHalfAlt />);
      } else if(rating > 0) {
        elements.push(<FaStar />);
      } else {
        elements.push(<FaRegStar />);
      }
      rating--;
    }

    return (
      <div style={{ margin: '10px 0px'}}>{elements} <span style={{ fontSize: '0.8em' }}>{props.numReviews} reviews</span></div>
    )
}