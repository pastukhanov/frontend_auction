import AuctionsWidget from '../component/AuctionsWidget';

import { useContext, useEffect, useState } from 'react';
import { getMethods } from '../shared/provider/methods';
import ProviderContext from '../shared/provider/providerContext';


const BoughtLots = () => {

    const {state, dispatch} = useContext(ProviderContext);
    const { listLots } = getMethods(dispatch);
    const [ isReady, setIsReady] = useState(false);


    useEffect(() => {
        if (state.lots.length === 0) {
            console.log('Listing lots on bought lots page');
            listLots().then(() => setIsReady(true));
        } else {
            setIsReady(true);
        }
    }, [listLots, state.lots.length]);

    if (!isReady) {
        <div className="py-4 mx-6 flex flex-col gap-6 first-letter:justify-center items-center">
            <div>Waiting.....</div>
        </div>
    }

    return (
        <div className='min-w-full'>
            <div className="py-4 mx-6 flex flex-col gap-6 first-letter:justify-center items-center">
                <AuctionsWidget props={{lots: [...state.lots] ?? [], btnTxt: "Мои лоты" }} />
            </div>
        </div>
    )
}

export default BoughtLots;