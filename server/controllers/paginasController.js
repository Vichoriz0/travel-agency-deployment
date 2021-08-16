import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const homePage = async (req, res) => {
    // Consultar 3 viajes del modelo Viaje y 3 de Testimonial
    const promiseDB = [];
    promiseDB.push( Viaje.findAll({ limit: 3 } ));
    promiseDB.push( Testimonial.findAll({ limit: 3 }));

    try {
        const result = await Promise.all( promiseDB );

        res.render('inicio', {
            sectionName: 'Inicio',
            titleName: 'Agencia de Viajes',
            className: 'home',
            travels: result[0],
            testimonials: result[1]
        });
    } catch(error) {
        console.error(error);
    }
};

const usPage = (req, res) => {
    res.render('nosotros', {
        sectionName: 'Nosotros',
        titleName: 'Agencia de Viajes | Nosotros'
    });
};

const testimonyPage = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll();

        res.render('testimoniales', {
            sectionName: 'Testimoniales',
            titleName: 'Agencia de Viajes | Testimoniales',
            testimonials
        });
    } catch(error) {
        console.error(error);
    }

    
};

const travelPage = async (req, res) => {
    const travels = await Viaje.findAll();

    res.render('viajes', {
        sectionName: 'Próximos viajes',
        titleName: 'Agencia de Viajes | Viajes',
        travels
    });
};

// Muestra un viaje por su slug
const detailedTravelPage = async (req, res) => {
    const { slug } = req.params;

    try {
        const travel = await Viaje.findOne({ where: { slug } });

        res.render('viaje', {
            sectionName: `${travel.titulo}`,
            titleName: `Agencia de Viajes | ${travel.titulo}`,
            travel
        });
    } catch (error) {
        console.error(error);
    }
    console.log(req.params);
};

export {
    homePage,
    usPage,
    testimonyPage,
    travelPage,
    detailedTravelPage
}