import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

import Link from "next/link";

const About = () => {
  return (
    <div className="bg-[#3f3f3f] py-10 sm:py-32 min-h-screen">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl md:mr-5">
          <h2 className="text-3xl font-bold tracking-tight text-[#c9f73f] sm:text-4xl">
            Conoce nuestro equipo
          </h2>
          <p className="mt-6 text-lg leading-8 text-justify text-gray-200">
            Somos un total de 7 personas detras de este proyecto, el cual su
            principal objetivo es demostrar de que estamos hechos, para lograr
            ese objetivo, hicimos esta{" "}
            <strong className="italic text-[20px] font-bold text-[#beeb39]">
              pagina Web
            </strong>
            , la cual se basa en alquileres de vehiculos de usuario/usuario.
            Implementamos tecnologias tales como{" "}
            <strong className="italic font-bold  text-[20px] text-[#c9f73f]">
              Next.js
            </strong>{" "}
            con React/tailwind y Typescript para el front-end como tambien{" "}
            <strong className="italic font-bold text-[20px] text-[#c9f73f]">
              Nest.js{" "}
            </strong>
            con Typescript y TypeOrm/PostgreSql.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          <li>
            <div className="flex items-center gap-x-6">
              <img
                className="h-16 w-16 rounded-full"
                src="/camiloFoto.png"
                alt="imagen de foto de perfil"
              />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-200">
                  Camilo Sierra
                </h3>
                <p className="text-sm font-semibold leading-6 text-[#C4FF0D]">
                  Desarrallor full-stack
                </p>
                <div className="flex flex-row gap-1">
                  <Link
                    href="https://www.linkedin.com/in/camilo-sierra-36ba612b2/"
                    className="px-2 py-2 hover:bg-[#555454] rounded-full duration-200"
                    target="_blank" rel="noreferrer"
                  >
                    <FaLinkedin className="w-6 h-6 bg-gray-300 text-[#0A66C2] rounded-[2px]" />
                  </Link>
                  <Link
                    href="https://github.com/CAndresSierra"
                    className="px-2 py-2 hover:bg-[#555454] rounded-full duration-200"
                    target="_blank" rel="noreferrer"
                  >
                    <FaGithub className="w-6 h-6 py-[1px] bg-gray-200 text-gray-800 rounded-full" />
                  </Link>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <img
                className="h-16 w-16 rounded-full"
                src="/juanFoto.png"
                alt="imagen de foto de perfil"
              />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-200">
                  Juan Alvarez
                </h3>
                <p className="text-sm font-semibold leading-6 text-[#C4FF0D]">
                  Desarrallor full-stack
                </p>
                <div className="flex flex-row gap-1">
                  <Link
                    href="https://www.linkedin.com/in/alvarezmajuan/"
                    className="px-2 py-2 hover:bg-[#555454] rounded-full duration-200"
                    target="_blank" rel="noreferrer"
                  >
                    <FaLinkedin className="w-6 h-6 bg-gray-300 text-[#0A66C2] rounded-[2px]" />
                  </Link>
                  <Link
                    href="https://github.com/AlvarezMar"
                    className="px-2 py-2 hover:bg-[#555454] rounded-full duration-200"
                    target="_blank" rel="noreferrer"
                  >
                    <FaGithub className="w-6 h-6 py-[1px] bg-gray-200 text-gray-800 rounded-full" />
                  </Link>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <img
                className="h-16 w-16 rounded-full"
                src="/darvinFoto.png"
                alt="imagen de foto de perfil"
              />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-200">
                  Darvin Alania
                </h3>
                <p className="text-sm font-semibold leading-6 text-[#C4FF0D]">
                  Desarrallor full-stack
                </p>
                <div className="flex flex-row gap-1">
                  <Link
                    href="https://www.linkedin.com/in/darvin-ricardo-alania-inocencio-7927392a9/"
                    className="px-2 py-2 hover:bg-[#555454] rounded-full duration-200"
                    target="_blank" rel="noreferrer"
                  >
                    <FaLinkedin className="w-6 h-6 bg-gray-300 text-[#0A66C2] rounded-[2px]" />
                  </Link>
                  <Link
                    href="https://github.com/DAlaniaInocencio"
                    className="px-2 py-2 hover:bg-[#555454] rounded-full duration-200"
                    target="_blank" rel="noreferrer"
                  >
                    <FaGithub className="w-6 h-6 py-[1px] bg-gray-200 text-gray-800 rounded-full" />
                  </Link>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <img
                className="h-16 w-16 rounded-full"
                src="/daniloFoto.png"
                alt="imagen de foto de perfil"
              />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-200">
                  Danilo Maccari
                </h3>
                <p className="text-sm font-semibold leading-6 text-[#C4FF0D]">
                  Desarrallor full-stack
                </p>
                <div className="flex flex-row gap-1">
                  <Link
                    href="https://www.linkedin.com/in/maccari78/"
                    className="px-2 py-2 hover:bg-[#555454] rounded-full duration-200"
                    target="_blank" rel="noreferrer"
                  >
                    <FaLinkedin className="w-6 h-6 bg-gray-300 text-[#0A66C2] rounded-[2px]" />
                  </Link>
                  <Link
                    href="https://github.com/maccari78"
                    className="px-2 py-2 hover:bg-[#555454] rounded-full duration-200"
                    target="_blank" rel="noreferrer"
                  >
                    <FaGithub className="w-6 h-6 py-[1px] bg-gray-200 text-gray-800 rounded-full" />
                  </Link>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <img
                className="h-16 w-16 rounded-full"
                src="/camilaFoto.png"
                alt="imagen de foto de perfil"
              />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-200">
                  Camila Fabre
                </h3>
                <p className="text-sm font-semibold leading-6 text-[#C4FF0D]">
                  Desarrallor full-stack
                </p>
                <div className="flex flex-row gap-1">
                  <Link
                    href="https://www.linkedin.com/in/camila-fabre/"
                    className="px-2 py-2 hover:bg-[#555454] rounded-full duration-200"
                    target="_blank" rel="noreferrer"
                  >
                    <FaLinkedin className="w-6 h-6 bg-gray-300 text-[#0A66C2] rounded-[2px]" />
                  </Link>
                  <Link
                    href="https://github.com/cfcamilafabre"
                    className="px-2 py-2 hover:bg-[#555454] rounded-full duration-200"
                    target="_blank" rel="noreferrer"
                  >
                    <FaGithub className="w-6 h-6 py-[1px] bg-gray-200 text-gray-800 rounded-full" />
                  </Link>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <img
                className="h-16 w-16 rounded-full"
                src="/emanuelFoto.png"
                alt="imagen de foto de perfil"
              />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-200">
                  Victor Emanuel Cuello
                </h3>
                <p className="text-sm font-semibold leading-6 text-[#C4FF0D]">
                  Desarrallor full-stack
                </p>
                <div className="flex flex-row gap-1">
                  <Link
                    href="https://www.linkedin.com/in/vcuellojrs/"
                    className="px-2 py-2 hover:bg-[#555454] rounded-full duration-200"
                    target="_blank" rel="noreferrer"
                  >
                    <FaLinkedin className="w-6 h-6 bg-gray-300 text-[#0A66C2] rounded-[2px]" />
                  </Link>
                  <Link
                    href="https://github.com/emacuello"
                    className="px-2 py-2 hover:bg-[#555454] rounded-full duration-200"
                    target="_blank" rel="noreferrer"
                  >
                    <FaGithub className="w-6 h-6 py-[1px] bg-gray-200 text-gray-800 rounded-full" />
                  </Link>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <img
                className="h-16 w-16 rounded-full"
                src="/geronimoFoto.png"
                alt="imagen de foto de perfil"
              />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-200">
                  Geronimo Kramar
                </h3>
                <p className="text-sm font-semibold leading-6 text-[#C4FF0D]">
                  Desarrallor full-stack
                </p>
                <div className="flex flex-row gap-1">
                  <Link
                    href="https://www.linkedin.com/in/gerokramar/"
                    className="px-2 py-2 hover:bg-[#555454] rounded-full duration-200"
                    target="_blank" rel="noreferrer"
                  >
                    <FaLinkedin className="w-6 h-6 bg-gray-300 text-[#0A66C2] rounded-[2px]" />
                  </Link>
                  <Link
                    href="https://github.com/GeroKramar"
                    className="px-2 py-2 hover:bg-[#555454] rounded-full duration-200"
                    target="_blank" rel="noreferrer"
                  >
                    <FaGithub className="w-6 h-6 py-[1px] bg-gray-200 text-gray-800 rounded-full" />
                  </Link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
