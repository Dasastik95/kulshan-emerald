import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <Carousel showThumbs={false} infiniteLoop autoPlay>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Property image ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;