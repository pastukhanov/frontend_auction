import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getMethods } from "../shared/provider/methods";
import ProviderContext from "../shared/provider/providerContext";

const LotPage = () => {

    const { id  } = useParams();
    const [ lot, setLot ] = useState(null);

    const {state, dispatch} = useContext(ProviderContext);
    
    const { getLot, deleteLot } = getMethods(dispatch);
    const [ isReady, setIsReady] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            return ;
        }
        getLot(id);
    }, [id])

    useEffect(() => {
        if (state.targetLot) {
            setLot(state.targetLot);
            setIsReady(true);
        }
    }, [state.targetLot]);


    function handleDeleteLot() {
        if (id) {
            deleteLot(id).then(()=>{
                navigate('/account/lots');
            });
        }
    }

    console.log("target.log =");
    console.log(state.targetLot);

    if (!isReady) {
        return (
            <div className="py-4 mx-6 flex flex-col gap-6 first-letter:justify-center items-center">
            <div>Waiting.....</div>
        </div>
        )
    }

    return (
        <div className="px-20 py-10">
            <div className="bg-white rounded-2xl p-5 max-x-[10fr]"> 
                <div className="p-4 relative">
                    <h1 className="text-3xl text-center">{lot.title}</h1>
                    <p className="text-lg text-center text-gray-500 font-gray-200">{lot.status}</p>
                    <Link className=" bg-sky-700 text-white rounded-2xl p-2 absolute top-0 right-0" to={"/auctions/" + lot.auctionId}>
                        <div className="flex gap-2">
                            <p>Аукцион</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </Link>
                </div>
                
                <div className="p-4 grid grid-cols-[1fr_2fr] gap-6">
                    <div className="flex justify-center">
                        <img src={`http://localhost:8080/images/${lot.logo}`}  alt="" className="max-h-64"/>
                    </div>
                        
                    <div className="text-left">
                        <span className="font-semibold text-lg">Название: </span> 
                            <span className="text-lg">{lot.name}</span><br />
                        <div className="py-4">
                            <p className="font-semibold text-lg">Описание</p>
                            {lot.description}
                        </div>
                        <b>Начальная цена, руб.:</b> {lot.startingPrice}<br />
                        <b>Таймер, сек.:</b> {lot.timer}<br />
                        <b>Ставка, руб.:</b> {lot.bet}<br />
                    </div>
                </div>
                
                <div className="flex my-5 justify-center gap-2 px-20">
                    <Link className="cls-btn-like" to="/lots/add" >Новая ставка</Link>
                    <Link className="cls-btn-like" to={`/lots/${id}/edit`} >Редактировать</Link>
                    <button className="delete-btn" onClick={handleDeleteLot}>Удалить лот</button>
                </div>
            </div>
        </div>
    )
}

export default LotPage;