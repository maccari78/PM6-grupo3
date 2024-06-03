import IErrorsVehicleForm from "@/interfaces/IErrorsVehicleForm";
import IVehicleData from "@/interfaces/IVehicleData";

const validate = (data: IVehicleData) => {
    let errors: IErrorsVehicleForm = {};

    if (!data.title || data.title.trim() === '') {
        errors.title = 'Este campo es requerido';
    }

    if (!data.description || data.description.trim() === '') {
        errors.description = 'Este campo es requerido';
    }

    if (!data.price || (data.price) <= 0)  {
        errors.price = 'El precio debe ser un número positivo';
    }

    if (!data.color || data.color.trim() === '') {
        errors.color = 'Este campo es requerido';
    }

    if (!data.model || data.model.trim() === '') {
        errors.model = 'Este campo es requerido';
    }

    if (!data.brand || data.brand.trim() === '') {
        errors.brand = 'Este campo es requerido';
    }

    const currentYear = new Date().getFullYear();
    if (!data.year || data.year < 1886 || data.year > currentYear + 1) {
        errors.vehicleYear = 'El año debe ser un número válido';
    }

    if (!data.mileage || data.mileage.trim() === '') {
        errors.mileage = 'Este campo es requerido';
    }

    if (!data.file) {
        errors.file = 'Este campo es requerido';
    }

    return errors;
};

export default validate;
