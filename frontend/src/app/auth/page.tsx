import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const { query } = router;
        const sessionData: { [key: string]: string } = {};

        Object.keys(query).forEach(key => {
            const value = query[key];
            if (typeof value === 'string') {
                sessionData[key] = value;
                console.log(`Parametro guardado: ${key} = ${value}`);
            }
        });

        localStorage.setItem('userSession', JSON.stringify(sessionData));

        router.push('/'); 
    }, [router]);

    return (
        <div>
            <h1>Procesando login...</h1>
        </div>
    );
};

export default Login;
