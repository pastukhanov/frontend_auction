import { useEffect, useState } from 'react';
import AuctionCard from '../component/AuctionCard';
import LotCard from './LotCard';
import AuctionsWidgetBtnT1 from './AuctionsWidgetBtnT1';
import AuctionsWidgetBtnT2 from './AuctionsWidgetBtnT2';


const AuctionsWidget = ({props}) => {

    let { auctions, lots, type, btnTxt } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');

    const elementsPerPage = auctions ? 6 : 12;

    const lastElementIndex = currentPage * elementsPerPage;
    const firstElementIndex = lastElementIndex - elementsPerPage;
    
    const filteredAuctions = auctions?.filter(a => a.title?.toLowerCase()?.includes(searchText?.toLowerCase().toLowerCase())) ?? [];
    const filteredLots = lots?.filter(l => l.title?.toLowerCase().includes(searchText?.toLowerCase()) || l.name?.toLowerCase()?.includes(searchText?.toLowerCase())) ?? [];

    const currentAuctions = filteredAuctions.slice(firstElementIndex, lastElementIndex);
    const currentLots = filteredLots.slice(firstElementIndex, lastElementIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchText]);

    function decrementPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function incrementPage() {
        const totalElements = auctions ? filteredAuctions.length : filteredLots.length;
        if (lastElementIndex < totalElements) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className="bg-white min-h-20 w-full text-left mx-10">
                <div className='flex justify-between'>

                    {type === 'all' ? 
                    <AuctionsWidgetBtnT1 props={{searchText, setSearchText}} /> :  <AuctionsWidgetBtnT2 props={{searchText, setSearchText}} btnTxt={btnTxt} />}
                
                    <div className='m-4 flex gap-6'>
                        <p onClick={ decrementPage } className={'border-2 ' + (firstElementIndex > 0 ? 'border-black text-black':  'border-grey-200 text-gray-200') }>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 p-1 rotate-180">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>
                        </p>
                        <p onClick={ incrementPage } className={'border-2 '  + (lastElementIndex < ( auctions ?? lots)?.length ? 'border-black text-black':  'border-grey-200 text-gray-200')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 p-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>
                        </p>
                    </div>
               
                </div>
                <div className="m-4 pb-6 grid grid-cols-6 gap-2">

                    { currentAuctions?.length < 1 ? '' :  currentAuctions?.map((el) => (
                        <AuctionCard props={el} />
                    )) }

                    { currentLots?.length < 1 ? '' : currentLots?.map((el) => (
                        <LotCard props={el} />
                    )) }
                </div>
            </div>
    )
}

export default AuctionsWidget;