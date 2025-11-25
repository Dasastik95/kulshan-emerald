import { Link } from "react-router-dom";

const PropertyCard = ({ id, title, image, description }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <Link to={`/listings/${id}`}>
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;