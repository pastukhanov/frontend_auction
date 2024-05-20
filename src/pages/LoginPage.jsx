import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import ProviderContext from "../shared/provider/providerContext";

import { getToken } from "../shared/api";

import { getMethods } from "../shared/provider/methods";

import { toast } from 'react-toastify';


const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, dispatch } = useContext(ProviderContext);
    const { whoami } = getMethods(dispatch);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        const token = await getToken(email, password);
        if (token) {
            dispatch({
                type: "login",
                payload: token
            });
        } else {
            toast.error('Введены неверный данные для входа!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    useEffect( () => {
        whoami().then(res => console.log(res));
    }, [state.token] )

    if (state.isLoggedIn) {
        return <Navigate to='/auctions' />;
    }

    return (
        <div className="mt-6"> 
            <h1 className="text-4xl text-center mb-4">Авторизация</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                <input type="email" 
                        placeholder="your@email.ru" 
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                <input type="password" 
                        placeholder="password"
                        value = {password}
                        onChange={ev => setPassword(ev.target.value)}/>
                <button className="primary">Войти</button>
                <div className="text-center py-2 text-gray-500">
                    Еще не зарегистрировал аккаунт? <Link className="underline text-link" to={'/register'}>Зарегистрироваться</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;