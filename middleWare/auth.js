const jwt = require("jsonwebtoken");
const config = require("../config");

const authentication = async (req, res, next) => {
  //   console.log(req.headers);
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      res.json({ message: "Authentication failed", status: false });
    } else {
      const decode = jwt.verify(token, config.JWT_TOKEN_KEY, null);
      // console.log('11', decode.name)
      req.data = decode;
      next();
    }
  } catch (error) {
    res.json({ message: "Authentication failed", status: false });
    // console.log('17', error)
  }
};

module.exports = authentication;
