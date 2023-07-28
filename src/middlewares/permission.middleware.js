export const ristrictedTo = (...roles) => {
  return (req, res, next) => {
    const { role } = res.locals.user;
    if (roles.includes(role)) {
      return next();
    }
    return !next();
  };
};
