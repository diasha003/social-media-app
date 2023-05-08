import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    //console.log(req.header("Authorization"));
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).json({ message: "Access Denied" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    //console.log(verified);
    req.user = verified;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
