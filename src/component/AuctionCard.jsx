import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProviderContext from "../shared/provider/providerContext";

import { parseISO, format } from 'date-fns';

import { getMethods } from "../shared/provider/methods";


const AuctionCard = ({props}) => {

    const { id, title, logo, auctionStartTime } = props;
    const [starStyle, setStarStyle] = useState('');
    const {state, dispatch} = useContext(ProviderContext);
    const { startAuction, unStartAuction} = getMethods(dispatch);


    useEffect(() => {
        if(state.auctions_fav.includes(id)){
            setStarStyle("favourite-card selected");
        } else {
            setStarStyle("favourite-card");
        }
    },[state.auctions_fav, id])

    function handleStarClick() {
        if(starStyle.indexOf('selected') > 0 ) {
            setStarStyle("favourite-card");
            unStartAuction(id);
        } else {
            setStarStyle("favourite-card selected");
            startAuction(id);
        }
    }


    return (
        <div className='border rounded-lg'>
            <div className='p-4 flex flex-col items-center'>
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleStarClick} viewBox="0 0 24 24" fill="currentColor" className={starStyle} >
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                    <img src={`http://localhost:8080/images/${logo}`} alt="auction-logo" className="w-36 h-32 overflow-hidden" />
                </div>
                <Link to={`/auctions/${id}`}>
                    <p className='text-center mt-2 text-lg font-bold'>{title?.slice(0, 17)}{title?.length > 17 ? '...' : ''}</p>
                    <p className='text-center text-sm font-bold'><br/>{auctionStartTime && format(parseISO(auctionStartTime), "HH:mm")}
                            <br/>{auctionStartTime && format(parseISO(auctionStartTime), "dd.MM.yyyy")}</p>
                </Link>
            </div>
        </div>
    )
}


export default AuctionCard;