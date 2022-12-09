(function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env = {
    backend_url: '${BACKEND_URL}',
    apropos_url: '${APROPOS_URL}',

    env_file_loaded: true
  }
}(this));