import { Link } from "react-router-dom";

const AuctionsWidgetBtnT1 = ({props}) => {
    const {searchText, setSearchText} = props;
    return (
        <div className="font-bold">
            <div className="mt-6 ml-2 flex gap-2">
                <Link to="/auctions" className="p-2">Список аукционов</Link>
                <Link to="/auctions/new" className="p-2 bg-gray-200 rounded">Запланировать</Link>
                <div className="-mt-1 ml-2 w-52 h-2">
                    <input type="text" placeholder="Hайти" value={searchText} onChange={(ev) => setSearchText(ev.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default AuctionsWidgetBtnT1;