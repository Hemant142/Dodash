import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "dodash";
// Middleware

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. Not token provided " });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

//  Optional: Middleware to check for admin
export const isAdmin = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
