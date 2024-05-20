import React, { useState, useContext, useEffect } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import ProviderContext from '../shared/provider/providerContext';
import { getMethods } from '../shared/provider/methods';

const EditLotPage = () => {
    const { id } = useParams();
    const { pathname } = useLocation();
    const [lot, setLot] = useState(null);
    const { state, dispatch } = useContext(ProviderContext);
    const { getLot, updateLot, createLot } = getMethods(dispatch);
    const [isReady, setIsReady] = useState(false);
    const [isRedirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            setIsReady(true);
            return;
        } 
        getLot(id);
    }, [id]);


    useEffect( () => {
        console.log(`location = ${pathname}`);
        console.log(state.targetAuction);
        console.log(state);
        if (pathname === '/lots/add') {
            setLot({ 
                title: state.targetAuction?.title,
                description: `Cтавка на аукцион № ${state.targetAuction?.id} "${state.targetAuction?.title}"`,
                logo: state.targetAuction?.logo, 
                auctionId: state.targetAuction?.id,
                startingPrice: state.targetAuction?.startingPrice,
                currentPrice: state.targetAuction?.currentPrice,
            });
            setIsReady(true);
            return;
        } 
    }, [pathname])


    useEffect(() => {
        if (state.targetLot) {
            setLot({ ...state.targetLot });
            setIsReady(true);
        }
    }, [state.targetLot]);

    function handleChange(event) {
        const { name, value } = event.target;
        setLot(prevLot => ({ ...prevLot, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        let auctionId = state.targetLot?.auctionId;
        if (auctionId === null || auctionId === undefined) {
            auctionId = state.targetAuction?.id;
        }

        const { name, 
            title,
            description,
            timer,
            bet 
            } = lot;

        if (id !== null && id !== undefined) {
            updateLot(id, { name, 
                auctionId,
                title,
                description,
                timer: parseInt(timer),
                bet: parseFloat(bet),
                });
        } else {
            createLot({ name, 
                auctionId,
                title,
                description,
                timer: parseInt(timer),
                bet: parseFloat(bet),
                });
        }
        setRedirect(true);
    }

    if (!isReady) {
        return (
            <div className="py-4 mx-6 flex flex-col gap-6 first-letter:justify-center items-center">
                <div>Waiting.....</div>
            </div>
        );
    }
    
    if (isRedirect) {
        return (
            <Navigate to={"/account/lots"}/>
        );
    }

    return (
        <div className="px-20 py-10">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 max-w-4xl mx-auto">
                <div className="p-4">
                    <h1 className="text-3xl text-center">{id ? "Измение Лота: ": "Добавляем Лот"} { lot?.title ? <br/> : '' } {lot?.title ? lot.title :''}</h1>
                    <p className="text-lg text-center text-gray-500">{lot?.status}</p>
                </div>

                <div className="p-4 grid grid-cols-[1fr_2fr] gap-6">

                    <div className="flex justify-center">
                        <img src={`http://localhost:8080/images/${lot?.logo}`}  alt="" className="h-full"/>
                    </div>

                    <div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700">Название:</label>
                            <input type="text" name="name" value={lot?.name} onChange={handleChange} placeholder="Мой акцион" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700">Описание:</label>
                            <textarea name="description" value={lot?.description} onChange={handleChange} rows="4" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700">Начальная цена, руб.:</label>
                            <input type="number" name="startingPrice" value={lot?.startingPrice} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" readOnly/>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700">Текущая цена, руб.:</label>
                            <input type="number" name="startingPrice" value={lot?.currentPrice} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" readOnly/>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700">Ставка, руб.:</label>
                            <input type="number" name="bet" value={lot?.bet} onChange={handleChange} placeholder={lot?.currentPrice + 10} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700">Таймер, сек.:</label>
                            <input type="number" name="timer" value={lot?.timer} onChange={handleChange} placeholder={30} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                </div>

                <div className="flex my-5 justify-center gap-2 px-20">
                    <button type="submit" className="primary max-w-48" >{id ? "Редактировать Лот": "Добавить лот"}</button>
                </div>
            </form>
        </div>
    );
};

export default EditLotPage;
