export function setRoutes(app) {
  const taskRoutes = require('./routes/taskRoutes');
  taskRoutes(app);
  const personRoutes = require('./routes/personRoutes');
  personRoutes(app);
}
