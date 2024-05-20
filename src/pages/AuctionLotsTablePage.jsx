import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProviderContext from '../shared/provider/providerContext';
import { getMethods } from '../shared/provider/methods';

const AuctionLotsTablePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [lots, setLots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [winnerColor, setWinnerColor] = useState('bg-yellow-200');
    
    const {state, dispatch} = useContext(ProviderContext);
    
    console.log(`auction ${id}`)

    const { getLotsByAuctionId } = getMethods(dispatch);

    useEffect(() => {
        setIsLoading(true);
        getLotsByAuctionId(id)
            .then(fetchedLots => {
                fetchedLots.sort((a, b) => b.price - a.price);
                setLots(fetchedLots);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch lots', error);
                setIsLoading(false);
            });
    }, [id]);


    useEffect( () => {
        if (state.targetAuction.status === 'Завершился'){
            setWinnerColor('bg-green-200');
        }
    }, [state.targetAuction])

    const handleOfferLot = () => {
        console.log('Offering a new lot');
        state.targetLot = null;
        navigate("/lots/add");
    };

    return (
        <div className='bg-white mx-20 my-10 w-full'>
            <div className="mx-auto p-4">
                {isLoading ? (
                    <p>Идет загрузка лотов...</p>
                ) : (
                    <>
                        <p className='text-4xl font-bold mb-5 text-center'>Список лотов для аукциона <br/>"{state.targetAuction?.title}"</p>
                        <div className='flex justify-end mb-5 gap-3'>
                            { state.targetAuction.status !== 'Завершился' &&
                            <button to={"/lots/add"} className="primary max-w-32" onClick={handleOfferLot}>
                                Участвовать
                            </button> }
                            <Link to={`/auctions/${id}`} className="cls-delete-btn-like max-w-32">Назад</Link>
                        </div>
                       
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2">Название лота</th>
                                    <th className="px-4 py-2">Ставка</th>
                                    <th className="px-4 py-2">Пользователь</th>
                                    <th className="px-4 py-2">Описание</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lots.map((lot, index) => (
                                    <tr key={index} className={index === 0 ? winnerColor : ""}>
                                        <td className="border px-4 py-2">{lot.name}</td>
                                        <td className="border px-4 py-2">{lot.bet}</td>
                                        <td className="border px-4 py-2">@{lot.owner}</td>
                                        <td className="border px-4 py-2">
                                            <div className='flex gap-2'>
                                                <div>{lot.description}</div>  
                                                { state.targetAuction.status === 'Завершился' & index=== 0 ? 
                                                
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-500 -mt-1">
                                                    <path d="m15 1.784-.796.795a1.125 1.125 0 1 0 1.591 0L15 1.784ZM12 1.784l-.796.795a1.125 1.125 0 1 0 1.591 0L12 1.784ZM9 1.784l-.796.795a1.125 1.125 0 1 0 1.591 0L9 1.784ZM9.75 7.547c.498-.021.998-.035 1.5-.042V6.75a.75.75 0 0 1 1.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 0 1 1.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 0 0-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 0 1 1.5 0v.797ZM12 12.75c-2.472 0-4.9.184-7.274.54-1.454.217-2.476 1.482-2.476 2.916v.384a4.104 4.104 0 0 1 2.585.364 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 3.67 0 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 3.67 0 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 2.585-.364v-.384c0-1.434-1.022-2.7-2.476-2.917A49.138 49.138 0 0 0 12 12.75ZM21.75 18.131a2.604 2.604 0 0 0-1.915.165 4.104 4.104 0 0 1-3.67 0 2.605 2.605 0 0 0-2.33 0 4.104 4.104 0 0 1-3.67 0 2.605 2.605 0 0 0-2.33 0 4.104 4.104 0 0 1-3.67 0 2.604 2.604 0 0 0-1.915-.165v2.494c0 1.035.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875v-2.494Z" />
                                                </svg> : ''}
                                            </div> 
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuctionLotsTablePage;
