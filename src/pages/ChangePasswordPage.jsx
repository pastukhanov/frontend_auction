import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ProviderContext from '../shared/provider/providerContext';
import { getMethods } from '../shared/provider/methods';

import { toast } from 'react-toastify';

const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const [oldPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(null);

    const { dispatch } = useContext(ProviderContext);
    const { changeUserPassword } = getMethods(dispatch);

    function handleChangePassword() {
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        changeUserPassword( {oldPassword, newPassword})
            .then(() => {
                toast.success('Пароль успешно изменен!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setRedirect('/account');
            })
            .catch(err => {
                console.error('Failed to update password', err);
                toast.error('Не удалось изменить праоль!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    }

    function goBackToProfilePage() {
        navigate('/account');
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="mt-6 mx-20">
            <div className="bg-white rounded-2xl px-20 py-10">
                <div className="flex flex-col justify-center items-center gap-6">
                    <h1 className="text-2xl font-bold mb-4">Изменить пароль от учетной записи</h1>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        placeholder="Текущий пароль"
                        className="input max-w-96"
                    />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Новый пароль"
                        className="input max-w-96"
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Подтвердить новый пароль"
                        className="input max-w-96"
                    />
                    <p className={"text-red-400" + (confirmPassword === newPassword ? " hidden" : "" )}>Введенные пароли не совпадают!</p>
                    <div className='flex gap-4'>
                        <button onClick={handleChangePassword} className="primary max-w-64 disabled:bg-gray-300" disabled={confirmPassword !== newPassword}>
                            Изменить
                        </button>
                        <button onClick={goBackToProfilePage} className="delete-btn max-w-64">
                            Отменить
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
