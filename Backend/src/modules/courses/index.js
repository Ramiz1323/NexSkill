import courseRoutes from './courses.routes.js';
import Course from './courses.model.js';
import * as courseService from './courses.service.js';
import * as courseController from './courses.controller.js';

export { courseRoutes, Course, courseService, courseController };
export default courseRoutes;
