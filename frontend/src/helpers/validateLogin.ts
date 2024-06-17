import { IErrorlogin, Ilogin } from "@/interfaces/ILogin"

export function validateLogin(value:Ilogin):IErrorlogin {
    let errors:IErrorlogin = {}
        if(!value.email){
            setTimeout(() => {
                errors.email = "El email es requerido"
            }, 1000);
        } else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.email)){
            errors.email = "Formato de email"
        }
        if (!value.password){
            setTimeout(() => {
            errors.password = "La contraseña es requerida"
        }, 1000);
        }
    return errors
    }