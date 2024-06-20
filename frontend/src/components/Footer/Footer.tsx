import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#222222] font-sans ">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link href="#" className="flex items-center">
                <img src="/logo.png" className="h-8 me-3" alt="Logo YouDrive" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-12 sm:gap-6 sm:grid-cols-2">
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                  Ayuda
                </h2>
                <ul className="text-gray-400 font-medium">
                  <li>
                    <a href="/answers" className="hover:underline">
                      Preguntas frecuentes
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                  Legal
                </h2>
                <ul className="text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="/privacy" className="hover:underline">
                      Políticas de privacidad
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="hover:underline">
                      Términos &amp; Condiciones
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm sm:text-center text-gray-400">
              © 2024{" "}
              <a href="#" className="hover:underline">
                YouDrive™
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0"></div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
