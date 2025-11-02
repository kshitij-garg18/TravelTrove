const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get token from header (Bearer token) or from Authorization header directly
  const authHeader = req.header("Authorization");
  let token = null;

  if (authHeader) {
    // Support both "Bearer <token>" and just "<token>"
    token = authHeader.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "")
      : authHeader;
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    req.user = {
      id: decoded.userId,
      userId: decoded.userId,
      email: decoded.email,
    };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };
