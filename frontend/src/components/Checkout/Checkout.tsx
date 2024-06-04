import Link from "next/link";

const Checkout = (valor: string, checkIn: string, checkOut: string, valorTotal: string) => {

    return (
        <div>
            <span>${valor} por día</span>
            <span>Check In {checkIn}</span>
            <span>Check Out {checkOut}</span>
            <Link href="#">Solicitar reserva</Link>
            <span>Valor total {valorTotal}</span>
        </div>
    )
}

export default Checkout;