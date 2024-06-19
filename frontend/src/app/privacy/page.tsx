const Privacy = () => {
  return (
    <div className="font-sans text-white m-0 bg-[url('/background_register_2.svg')] bg-no-repeat bg-cover relative z-3 w-full pt-[70px] px-[30px] pb-[44px] flex flex-col items-center min-h-screen bg-gray-900 h-min ">
      <h2 className="text-3xl font-bold mb-4">Políticas de Privacidad</h2>
      <div className="w-1/2 mx-auto p-10 bg-black/10 text-white">
        <p>
          En YouDrive, valoramos su privacidad y nos comprometemos a proteger su
          información personal. Esta Política de Privacidad explica cómo
          recopilamos, utilizamos, divulgamos y protegemos su información cuando
          utiliza nuestro sitio web y nuestros servicios.
        </p>

        <br></br>

        <div>
          <h4 className="font-bold">1. Información que Recopilamos</h4>
          <p>
            Información Personal: Podemos recopilar información personal que
            usted nos proporciona directamente, como su nombre, dirección de
            correo electrónico, número de teléfono, dirección postal y detalles
            de pago.
            <br></br>
            Información de Uso: Recopilamos información sobre su interacción con
            nuestro sitio web y servicios, como su dirección IP, tipo de
            navegador, páginas visitadas, tiempo de navegación y otros datos de
            uso.
          </p>
        </div>

        <br></br>
        <div>
          <h4 className="font-bold">2. Cómo Utilizamos Su Información</h4>
          <p>
            a. Para Proveer Servicios: Utilizamos su información para procesar
            sus reservas, gestionar su cuenta y proporcionarle nuestros
            servicios de alquiler de autos.
            <br></br>b. Comunicaciones: Podemos utilizar su información para
            comunicarnos con usted sobre su cuenta, sus reservas y otros asuntos
            relacionados con nuestros servicios.
            <br></br> c. Mejoras del Servicio: Utilizamos la información de uso
            y las cookies para analizar y mejorar nuestro sitio web y servicios.
            <br></br>d. Cumplimiento Legal: Podemos utilizar su información para
            cumplir con nuestras obligaciones legales y resolver disputas.
          </p>
        </div>

        <br></br>

        <div>
          <h4 className="font-bold">3. Seguridad de Su Información</h4>
          <p>
            Tomamos medidas razonables para proteger su información personal
            contra pérdida, robo y acceso, uso y modificación no autorizados.
            Sin embargo, no se puede garantizar la seguridad total de la
            información transmitida por internet.
          </p>
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default Privacy;
