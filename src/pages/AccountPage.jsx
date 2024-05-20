import { useContext, useEffect, useState } from "react";

import ProviderContext from "../shared/provider/providerContext";
import { Navigate } from "react-router-dom";
import { getMethods } from "../shared/provider/methods";

import { toast } from 'react-toastify';

import { Link } from "react-router-dom";

const AccountPage = () => {

    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [logo, setLogo] = useState('');

    const [redirect, setRedirect] = useState(null);

    const { state, dispatch } = useContext(ProviderContext); 
    const { whoami, uploadImage, userUpdate } = getMethods(dispatch);

    useEffect(() => {
        if (!state.user) {
            whoami().then(res => console.log(res)).catch(err => console.log(err));
        }
    }, [])

    useEffect( () => {
        setEmail(state.user?.email);
        setFirstName(state.user?.firstname);
        setLastName(state.user?.lastname);
        setLogo(state.user?.logo ?? "default.png");
    }, [state.user])

    function saveAccountDetails() {
        const accountInfo = { email, firstname, lastname, logo };
        userUpdate(state.user.id, accountInfo);
        toast.success('Настройки профиля сохранены', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        setRedirect('/auctions');
    }

    function uploadPhoto(ev) {
        console.log('clilcking uploadPhoto');
        const files = ev.target.files;
        console.log(files);
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            console.log(files[i]);
            data.append('file', files[i]);
        } 
        
        uploadImage(data).then( (res) => {

            console.log("dowloading image");
            console.log(res);
            setLogo(res);
        }).catch((err) => console.log(err));
    }

    function handleLogOut() {
        dispatch({type: 'logout'});
        console.log('here1');
        setRedirect('/');
        console.log('here2');
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <div className="bg-white rounded-2xl px-20 py-10 mt-6">
                <p className="w-full text-left font-bold">Nickname/Login</p>
                <div className="mt-6 grid grid-cols-[1fr_2fr] gap-6">
                    <div className={logo ? 'flex flex-col' : "bg-gray-300 rounded-2xl" }>
                        <img src={`http://localhost:8080/images/${logo}`} alt="" className="max-h-60 object-cover"/>
                    </div>

                    <div className="grid gap-8 grid-cols-1 mb-20">
                        <div className="">
                            <form action={saveAccountDetails}>
                                <b>Эл. почта:</b> 
                                <input type="text" 
                                        value={email} 
                                        onChange={ev => setEmail(ev.target.value)} 
                                        placeholder="example@mail.com"/>
                                
                                <b>Имя:</b>
                                <input type="text" 
                                        value={firstname} 
                                        onChange={ev => setFirstName(ev.target.value)} 
                                        placeholder="Ivan"/><br />
                                 <b>Фамилия:</b>
                                <input type="text" 
                                        value={lastname} 
                                        onChange={ev => setLastName(ev.target.value)} 
                                        placeholder="Ivanov"/><br />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-6">
                    <div className="m-auto">
                         {/* w-4 bg-primary cursor-pointer border rounded-2xl py-2 px-2 text-white  */}
                        <label className="w-48 bg-primary cursor-pointer border rounded-2xl p-2 text-white text-center">
                            <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                            Загрузить фото
                        </label>
                    </div>
                    <div className="flex justify-around">
                        <Link to={"/account/password-change"} className="cls-btn-like">Изменить пароль</Link>
                        <Link to={'/paymentinfo/add'} className="cls-btn-like">Платежные карты</Link>
                        <button className="primary max-w-40" onClick={saveAccountDetails}>Применить</button>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <button className="bg-red-500 w-[20rem] text-white px-5 py-2 rounded-2xl" 
                            onClick={handleLogOut}>Выйти из аккаунта</button>
                </div>
            </div>
        </div>
    )
}

export default AccountPage;