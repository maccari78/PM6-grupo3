import IRegisterErrorProps from "@/app/interfaces/IRegisterErrorProps";
import IRegisterProps from "@/app/interfaces/IRegisterProps";

export const validateRegister = (values: IRegisterProps): IRegisterErrorProps => {
    let errors:any = [];
    const emailRegex:RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    const passwordRegex:RegExp = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/i;
    const nameRegex:RegExp = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
    const phoneNumberRegex:RegExp = /^\+?(\d{1,3})?[-.\s]?(\d{1,4})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/;

    if(!emailRegex.test(values.email)){
        errors.email = "El email no es válido"
    }

    if(!passwordRegex.test(values.password)) {
        errors.password = "La contraseña debe tener un minimo de 6 caracteres, una mayuscula y un numero"
        }
    

    if(!nameRegex.test(values.name)) {
        errors.name = "El nombre no es válido"
        }
    

    if(!values.city) {
        errors.city = "El campo es obligatorio"
        }
    

    if(!phoneNumberRegex.test(values.phoneNumber)) {
        errors.phoneNumber = "Debes colocar un numero válido, por ejemplo: +1-800-123-4567 "
        }
    
    return errors;

}