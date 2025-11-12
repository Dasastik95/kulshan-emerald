import { useEffect, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const ImageCarousel = ({ images = [], className = "", autoPlay = true, autoPlayInterval = 5000 }: ImageCarouselProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), autoPlayInterval);
    return () => clearInterval(t);
  }, [images.length, autoPlay, autoPlayInterval]);

  if (!images || images.length === 0) {
    return (
      <div className={`w-full h-64 bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground">No images</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-72 sm:h-96 overflow-hidden rounded-md bg-black">
        <img
          src={images[index]}
          alt={`slide-${index}`}
          className="w-full h-full object-cover transition-transform duration-500"
        />
      </div>

      {/* Prev/Next */}
      {images.length > 1 && (
        <>
          <button
            aria-label="previous"
            onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-md"
          >
            ‹
          </button>
          <button
            aria-label="next"
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-md"
          >
            ›
          </button>

          {/* Thumbnails */}
          <div className="mt-3 flex gap-2 justify-center">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-16 h-10 overflow-hidden rounded-sm ring-2 ${i === index ? "ring-primary" : "ring-transparent"}`}
              >
                <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;