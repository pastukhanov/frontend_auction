import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import ProviderContext from "../shared/provider/providerContext";
import { getMethods } from '../shared/provider/methods';

import { parseISO, format } from 'date-fns';

const AuctionEditPage = () => {

    const { dispatch } = useContext(ProviderContext);

    const { getAuction, updateAuction, createAuction, uploadImage} = getMethods(dispatch);

    const { id } = useParams();
    const {pathname} = useLocation();
    const [title, setTitle] = useState('');
    const [logo, setLogo] = useState('logo1.png');
    const [lotTimer, setLotTimer] = useState(0);
    const [topic, setTopic] = useState('');
    const [startingPrice, setStartingPrice] = useState(100);
    const [auctionStartTime, setAuctionStartTime] = useState();
    const [authors, setAuthors] = useState('');
    const [description, setDescription] = useState('');
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        async function fetchOne() {
            if (!id || !pathname) {
                return ;
            }
    
            if (pathname.indexOf('edit') < 0) {
                return;
            }

            const data = await getAuction(id);

            console.log(data);

            if(data){
                setTitle(data.title);
                setLogo(data.logo);
                setLotTimer(data.lotsTimer);
                setTopic(data.topic);
                setStartingPrice(data.startingPrice);
                setAuctionStartTime(formatDate(data.auctionStartTime));
                setAuthors(data.authors);
                setDescription(data.description);
            }
        }
        fetchOne();
    }, [id, pathname])


    function formatDate(dateString) {
        const parsedDate = parseISO(dateString); 
        return format(parsedDate, "yyyy-MM-dd'T'HH:mm");
    }


    console.log("state.targetAuction");


    function saveAuction(ev) {
        ev.preventDefault();
        const data = {
            id, title, logo, lotTimer, topic, startingPrice, currentPrice: startingPrice, auctionStartTime, authors, description
        }
        if (id) {
            console.log(`creating updating auction ${id}`);
            updateAuction(id, data);
            setRedirect(true);
        } else {
            console.log('creating new auction');
            createAuction(data);
            setRedirect(true);
        }
        console.log(data);
        console.log("saving ");
    }

    function uploadPhoto(ev) {
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

    if (!id && !pathname) return '';

    if (redirect) {
        return <Navigate to='/auctions' />
    }

    return (
        <div className="py-4 mx-12 flex flex-col gap-6 first-letter:justify-center items-center">
            <div className="bg-white mx-24 p-5 rounded-2xl"> 
                <p className="text-center font-bold text-2xl">{pathname.indexOf('edit') > 0 ? `Редактируем акцион № ${id}` : 'Создать новый аукцион'}</p>
                
                <div className="grid grid-cols-[1fr_2fr]">
                    <p className="ml-8 font-bold text-lg text-left">Планируется</p>
                </div>

                <div className="mt-2 grid grid-cols-[1fr_2fr] gap-6">
                    <div className={logo ? 'flex flex-col justify-start mb-8 mt-2' : "bg-gray-300 rounded-2xl mb-8" }>
                        <img src={`http://localhost:8080/images/${logo}`} alt="" className="w-full"/>
                    </div>

                    <div className="mb-8 grid gap-8 grid-cols-1">
                        <form action={saveAuction}>
                            <b>Название:</b> 
                            <input type="text" 
                                    value={title} 
                                    onChange={ev => setTitle(ev.target.value)} 
                                    placeholder="Название аукциона"/>   
                            <b>Тематика:</b>
                            <input type="text" 
                                    value={topic} 
                                    onChange={ev => setTopic(ev.target.value)} 
                                    placeholder="Тематика"/><br />
                            <b>Начальная цена, руб.: </b> 
                            <input type="number" 
                                    value={startingPrice} 
                                    onChange={ev => setStartingPrice(ev.target.value)} 
                                    placeholder="Статус"/><br />
                            <b>Таймер на лот, cек.: </b> 
                            <input type="number" 
                                    value={lotTimer} 
                                    onChange={ev => setLotTimer(ev.target.value)} 
                                    placeholder="Статус"/><br />
                            <b>Дата и время начала акциона: </b> 
                            <input type="datetime-local" 
                                    value={auctionStartTime} 
                                    onChange={ev => setAuctionStartTime(ev.target.value)} 
                                    placeholder="Дата проведения аукциона"/><br />
                            <b>Авторы произведений искусства:</b> 
                            <input type="text" 
                                    value={authors} 
                                    onChange={ev => setAuthors(ev.target.value)}/>
                            <b>Описание:</b>
                            <textarea
                                value={description} 
                                onChange={ev => setDescription(ev.target.value)} 
                                placeholder="Описание аукциона"/>
                        </form>
                    </div>
                </div>
                <div className="flex justify-between">
                    <label className="w-48 bg-primary cursor-pointer border rounded-2xl p-2 text-white text-center">
                        <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                        Загрузить превью
                    </label >
                    <button className="primary max-w-48" onClick={saveAuction}>Сохранить</button>
                </div>          
            </div>
        </div> 
    )
}

export default AuctionEditPage;