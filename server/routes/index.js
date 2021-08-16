import express from 'express';
import { 
    homePage, 
    usPage, 
    testimonyPage, 
    travelPage, 
    detailedTravelPage 
} from '../controllers/paginasController.js';
import { saveTestimonial } from '../controllers/testimonialController.js';

const router = express.Router();

router.get('/', homePage);

router.get('/nosotros', usPage);

router.get('/testimoniales', testimonyPage);
router.post('/testimoniales', saveTestimonial);

router.get('/viajes', travelPage);
router.get('/viajes/:slug', detailedTravelPage);

export default router;