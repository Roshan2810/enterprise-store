import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../../style/Carousel.css";

function CommonCarousel(props) {
  return (
    <Carousel showArrows={true}>
      {props.images.map((img, i) => (
        <div key={i} onClick={() => props.handleCarouselClick(i)}>
          <img src={img.url} alt={img.url} />
        </div>
      ))}
    </Carousel>
  );
}

export default CommonCarousel;
