class NotFound {
  static sendNotFound(req, res, next) {
    return res
      .status(404)
      .send({ message: 'La ressource spécifiée est introuvable', status: 404 });
  }
}

export default NotFound;
