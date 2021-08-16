import { Testimonial } from '../models/Testimoniales.js';

const saveTestimonial = async (req, res) => {
    // Validar
    const { name, email, message } = req.body;
    const errors = [];

    if( name.trim() === '' ) {
        errors.push({ message: 'El nombre está vacío' });
    }
    if( email.trim() === '' ) {
        errors.push({ message: 'El correo está vacío' });
    }
    if( message.trim() === '' ) {
        errors.push({ message: 'El mensaje está vacío' });
    }

    if( errors.length > 0 ) {
        // Consultar testimoniales
        const testimonials = await Testimonial.findAll();

        // Mostrar vista con errores
        res.render('testimoniales', {
            sectionName: 'Testimoniales',
            titleName: 'Agencia de Viajes | Testimoniales',
            errors,
            name,
            email,
            message,
            testimonials
        });
    } else {
        // Almacenar en base de datos
        try {
            await Testimonial.create({
                name,
                email,
                message
            });

            res.redirect('/testimoniales');
        } catch(error) {
            console.error(error)
        }
    }
};

export {
    saveTestimonial
}