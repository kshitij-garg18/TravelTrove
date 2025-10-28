import React from "react";
import { Link } from "react-router-dom";
import { Destination } from "../types/Destination";

interface Props {
  destination: Destination;
}

const DestinationCard: React.FC<Props> = ({ destination }) => {
  const image = destination.image || "/placeholder.jpg"; // put placeholder.jpg into public/
  return (
    <div className="destination-card" role="article">
      <img src={image} alt={destination.name} />
      <h3>{destination.name}</h3>
      <p>{destination.summary}</p>
      <Link to={`/destination/${destination.id}`}>View Details</Link>
    </div>
  );
};

export default DestinationCard;

