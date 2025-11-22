const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers['authorization'];

  if (!auth) {
    return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
  }

  // Support both formats: "Bearer <token>" or just "<token>"
  const token = auth.startsWith('Bearer ')
    ? auth.split(' ')[1]
    : auth;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Unauthorized, JWT token wrong or expired' });
  }
};
