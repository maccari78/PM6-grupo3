import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar"


export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Bienvenido a mi sitio web</h1>
        <p className="mt-4">
          Aca va el contenido de tu página.
        </p>
      </div>
    <Footer/>

    </>
  );
}
