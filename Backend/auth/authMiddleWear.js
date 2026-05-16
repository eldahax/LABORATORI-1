const jwt = require("jsonwebtoken");
const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET,);
      if (!decoded.user_id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(403).json({ error: "Forbidden" });
    }

 const userRoles = (req.user.roles || []).map(r =>
  r.toLowerCase().trim()
);
    const allowed = allowedRoles.map(r => r.toLowerCase().trim());

    const hasAccess = userRoles.some(role =>
      allowed.includes(role)
    );

    if (!hasAccess) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    next();
  };
};
module.exports = { protect, authorize };

