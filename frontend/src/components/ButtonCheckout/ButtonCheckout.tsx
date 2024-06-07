import { IPost } from "../VehiclesComponent/interfaces/IPost";

const ButtonCheckout = ({ postState }: { postState: IPost | undefined }) => {
  const fetchCheckout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        body: JSON.stringify(postState),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const session = await res.json();
      window.location.href = session.url;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <button
        onClick={fetchCheckout}
        className="w-full h-[30px] mt-2 px-3 py-2 text-sm content-center justify-center items-center  md:h-10 text-[#222222] md:py-5 flex md:text-base font-semibold bg-[#C4FF0D] rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-[#c3ff0d92] hover:cursor-pointer"
      >
        Reserva ahora!
      </button>
    </>
  );
};

export default ButtonCheckout;
