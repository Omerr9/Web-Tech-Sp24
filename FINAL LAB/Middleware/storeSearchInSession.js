function storeSearchInSession(req, res, next) {
  if (!req.session.searches) {
    req.session.searches = [];
  }

  const searchQuery = req.query.query;
  if (searchQuery && !req.session.searches.includes(searchQuery)) {
    req.session.searches.push(searchQuery);
  }

  next();
}

module.exports = storeSearchInSession;