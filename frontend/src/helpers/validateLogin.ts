import { IErrorlogin, Ilogin } from "@/interfaces/ILogin"

export function validateLogin(value:Ilogin):IErrorlogin {
    let errors:IErrorlogin = {}
        if(!value.email){
            errors.email = "email is required"
        } else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.email)){
            errors.email = "invalid email format"
        }
        if (!value.password){
            errors.password = "Password is required"
        }
    return errors
    }