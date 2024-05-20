import AuctionsWidget from '../component/AuctionsWidget';
import { useEffect, useState, useContext} from 'react';
import ProviderContext from '../shared/provider/providerContext';
import { getMethods } from '../shared/provider/methods';


const FavouriteAuctions = () => {

    const { state, dispatch } = useContext(ProviderContext);
    const [isReady, setIsReady] = useState(false);
    const { listAuctions, listStarAuctions } = getMethods(dispatch);

    useEffect( () => {
        listAuctions().then( () => {
            listStarAuctions().then( () => {
                console.log('setting state to true in FavouriteAuctions')
                setIsReady(true);
            }).catch( (err) => console.log(err));
        }).catch( (err) => console.log(err))
        
    }, [])

    if (!isReady) {
        return (
            <div>
                Waiting....
            </div>
        )
    }

    const favouriteAuctions = [...state?.auctions?.filter((a) => state?.auctions_fav?.includes(a?.id))] ?? [];

    return (
        <div className="min-w-full"> 
            <div className="py-4 mx-6 flex flex-col gap-6 first-letter:justify-center items-center">
                <AuctionsWidget props={{ auctions: favouriteAuctions}}  />
            </div>
        </div>
    )
}

export default FavouriteAuctions;