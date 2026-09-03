import applicationRoutes from './applications.routes.js';
import Application from './applications.model.js';
import * as applicationService from './applications.service.js';
import * as applicationController from './applications.controller.js';

export { applicationRoutes, Application, applicationService, applicationController };
export default applicationRoutes;
