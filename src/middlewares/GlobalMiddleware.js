export const GlobalMiddleware = (req, res, next) => {
    req.locals.user = req.session.user; 
    next();
  };