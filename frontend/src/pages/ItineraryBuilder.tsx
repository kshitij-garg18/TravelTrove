import React from "react";

const ItineraryBuilder: React.FC = () => {
  return (
    <div className="ItineraryBuilder-page">
      <h2>ItineraryBuilder</h2>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">ItineraryBuilder</button>
      </form>
    </div>
  );
};

export default ItineraryBuilder;
