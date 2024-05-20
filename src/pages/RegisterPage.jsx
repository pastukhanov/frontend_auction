import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import { useContext } from "react";
import ProviderContext from "../shared/provider/providerContext";

import { toast } from 'react-toastify';

import { getMethods } from "../shared/provider/methods";

import { Navigate } from "react-router-dom";



export default function RegisterPage() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');

    const { state, dispatch } = useContext(ProviderContext);
    const { register, whoami } = getMethods(dispatch);


    async function registerUser(ev) {
        ev.preventDefault();
        try {
            register({firstname, lastname, email, password})     
            toast.success('Регистрация прошла успешно!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } catch (e) {
            toast.error('Не удалось зарегистрировать пользователяю! Попробуйте позднее', {
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
        whoami().then(res => console.log(res)).catch(err => console.log(err));
    }, [state.token] )

    if (state.isLoggedIn) {
        return <Navigate to='/auctions' />;
    }
     
    return (
        <div className="mt-6"> 
            <h1 className="text-4xl text-center mb-4">Регистрация</h1>
            <form className="max-w-md mx-auto" onSubmit={registerUser}> 
                <input type="text" 
                        placeholder="Иван" 
                        value={firstname} 
                        onChange={ev => setFirstName(ev.target.value)} />
                <input type="text" 
                        placeholder="Иванова" 
                        value={lastname} 
                        onChange={ev => setLastName(ev.target.value)} />
                <input type="email" 
                        placeholder="your@email.ru" 
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)} />
                <input type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)} />
                <button className="primary">Зарегистрироваться</button>
                <div className="text-center py-2 text-gray-500">
                    Уже зарегистрировался? <Link className="underline text-link" to={'/login'}>Войти</Link>
                </div>
            </form>
        </div>
    )
}