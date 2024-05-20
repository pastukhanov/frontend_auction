import AuctionsWidget from '../component/AuctionsWidget';
import { useContext, useEffect, useState } from 'react';
import ProviderContext from '../shared/provider/providerContext';

import { getMethods } from '../shared/provider/methods';

const AuctionsPage = () => {

    const {state, dispatch} = useContext(ProviderContext);
    const { listAuctions } = getMethods(dispatch);
    const [ isReady, setIsReady] = useState(false);

    useEffect( () => { 
        if (state.auctions?.length === 0) {
            console.log('listing auctions');
            listAuctions();
            setIsReady(true);
        }
    }, [listAuctions])

    function sortAuctionsByStartTime(a, b) {
        const now = new Date();
        const startTimeA = new Date(a.auctionStartTime);
        const startTimeB = new Date(b.auctionStartTime);
        return Math.abs(startTimeA - now) - Math.abs(startTimeB - now);
    }

    const filterAuctionAGteNow = (a) => {
        const now = new Date();
        const startTimeA = new Date(a.auctionStartTime);
        return startTimeA > now;
    }

    console.log('printing state');
    console.log(state);

    if (!isReady) {
        <div className="py-4 mx-6 flex flex-col gap-6 first-letter:justify-center items-center">
            <div>Waiting.....</div>
        </div>
    }

    return (
        <div className="py-4 mx-6 flex flex-col gap-6 first-letter:justify-center items-center">
            <AuctionsWidget props={{auctions: [...state?.auctions ?? []], type: 'all'}}/>
            <AuctionsWidget props={{auctions: [...state?.auctions?.filter(filterAuctionAGteNow)?.sort(sortAuctionsByStartTime) ?? []], type: 'other'}}/>
        </div>
    )
}

export default AuctionsPage;