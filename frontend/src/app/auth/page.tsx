'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Auth: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const sessionData: { [key: string]: string } = {};

        params.forEach((value, key) => {
            sessionData[key] = value;
            console.log(`Parametro guardado: ${key} = ${value}`);
        });

        localStorage.setItem('userSession', JSON.stringify(sessionData));

        setTimeout(() => {
            setLoading(false);
            router.push('/user'); 
        }, 1000); 

    }, [router, searchParams]);

    return (
        <div>
            {loading ? <h1>Procesando login...</h1> : <h1>Redirigiendo...</h1>}
        </div>
    );
};

export default Auth;
