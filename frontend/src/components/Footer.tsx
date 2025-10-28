import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="Footer-page">
      <h2>Footer</h2>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Footer</button>
      </form>
    </div>
  );
};

export default Footer;
