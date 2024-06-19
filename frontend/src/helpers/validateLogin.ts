import { IErrorlogin, Ilogin } from "@/interfaces/ILogin";

export function validateLogin(value: Ilogin): IErrorlogin {
  let errors: IErrorlogin = {};

  const regexPassword = /^.{1,}$/;
  const regexEmail = /^.{1,}$/;
  if (!regexEmail.test(value.email)) {
    errors.email = "El email es requerido";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.email)
  ) {
    errors.email = "Formato de email";
  }
  if (!regexPassword.test(value.password)) {
    errors.password = "La contraseña es requerida";
  }
  return errors;
}
