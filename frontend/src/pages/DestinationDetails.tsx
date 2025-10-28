import React from "react";
import { useParams } from "react-router-dom";

/**
 * Temporary destination details page.
 * Will later fetch full details and reviews from backend.
 */

const DestinationDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="container">
      <h2>Destination Details (temporary)</h2>
      <p>Showing details for destination id: <strong>{id}</strong></p>
      <div style={{ background: "white", padding: 12, borderRadius: 6 }}>
        <p>This is a placeholder page. We will add images, description, reviews and ratings later.</p>
      </div>
    </div>
  );
};

export default DestinationDetails;

