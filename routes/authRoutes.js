module.exports = app => {
  app.get('/api/logout', (req, res) => {
    res.clearCookie('token');
    // res.send(req.user);
    res.redirect('/login');
  });
};
