import React from "react";

const Groups: React.FC = () => {
  return (
    <div className="Groups-page">
      <h2>Groups</h2>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Groups</button>
      </form>
    </div>
  );
};

export default Groups;
