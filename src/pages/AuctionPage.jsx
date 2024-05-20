import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import ProviderContext from "../shared/provider/providerContext";
import { getMethods } from '../shared/provider/methods';

import { parseISO, format, addHours } from 'date-fns';

const AuctionPage = () => {
    const navigate = useNavigate();
    const { id  } = useParams();
    const {state, dispatch} = useContext(ProviderContext);

    const { getAuction } = getMethods(dispatch);


    useEffect(() => {
        if (!id) {
            return ;
        }
        getAuction(id);
    }, [id])

    function formatDate(dateString, formatStr =  "yyyy-MM-dd'T'HH:mm") {
        const parsedDate = parseISO(dateString); 
        return format(parsedDate, formatStr);
    }


    function handleBet(ev) {
        ev.preventDefault();
        state.targetLot = null;
        navigate("/lots/add");
    }
    
    console.log(state);

    if (!state.targetAuction) return '';

    return (
        <div className="py-4 mx-12 flex flex-col gap-6 first-letter:justify-center items-center">

            <div className="bg-white mx-24 rounded-2xl p-5"> 

                <h1 className="text-3xl text-center mb-5">{state.targetAuction.title}</h1>

                <div className="grid grid-cols-[1fr_2fr]">
                    <p className="pl-24 text-left font-bold">{state.targetAuction.status}</p>

                    { state.user?.role === 'ADMIN' && (
                        <div className="flex justify-center gap-20">
                            <Link to={`/auctions/${id}/edit`} className="admin-btn">Редактировать аукцион</Link>
                            <button className="admin-btn">Завершить аукцион</button>
                        </div>
                        )
                    }
                </div>
                
            
                <div className="mt-6 grid grid-cols-[1fr_2fr]">

                    <div className="p-4 -mt-4 max-h-64 flex justify-center">
                        <img src={`http://localhost:8080/images/${state.targetAuction.logo}`} alt="" className="h-full"/>
                    </div>

                    <div className="text-left">
                        
                        <div className="mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                            <div>
                                
                                <b>Тематика:</b> {state.targetAuction.topic}<br />
                                <b>Количество лотов:</b> {state.targetAuction.lotsCount}<br />
                                <b>Начальная цена, руб.:</b> {state.targetAuction.startingPrice}<br />
                                <b>Текущая цена, руб.:</b> {state.targetAuction.currentPrice}<br />
                                <b>Авторы произведений искусства:</b> {state.targetAuction.authors}

                                <div className="py-4">
                                    <h2 className="font-semibold text-2xl">Описание</h2>
                                    {state.targetAuction.description}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="bg-white px-8 py-4 text-center rounded-2xl">
                    <div className="border-t">
                        <br/>
                        <h2 className="font-semibold text-2xl">{formatDate(state.targetAuction.auctionStartTime, 'd MMMM yyyy')}</h2>
                        <h2 className="font-semibold text-2xl">{formatDate(state.targetAuction.auctionStartTime, 'HH:mm')} - {format(addHours(formatDate(state.targetAuction.auctionStartTime), 1), 'HH:mm')}</h2>
                        <br/>
                    </div>
                    <div className="grid grid-cols-3 gap-2 px-20">
                        <Link to={"/auctions/new"} className="bg-primary p-2 w-full text-white rounded-2xl cursor-pointer text-center">Зарегистрировать аукцион</Link>
                        <Link to={`/auctions/${id}/lots`} className="bg-primary p-2 w-full text-white rounded-2xl cursor-pointer text-center">Участники</Link>
                        <button className="primary" onClick={handleBet}>Предложить лот</button>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default AuctionPage;