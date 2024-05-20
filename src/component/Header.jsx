import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from '../logo.png';
import { useContext } from "react";
import ProviderContext from "../shared/provider/providerContext";

const Header = () => {

    const {state} = useContext(ProviderContext);
    console.log(state);

    const { pathname } = useLocation();
    const baseBtnStyle = "my-2 mx-0 py-1 px-2 rounded-lg flex flex-row gap-1";

    return (
        <div className="flex flex-col flex-shrink-0">
            <div className="pt-4 px-8 flex justify-between border border-b-2">
                <div className="grid gap-2 grid-cols-[auto_auto]">
                    <Link to='/'>
                        <img src={logo} alt="main-logo" className="p-1 w-12 h-full object-cover"/>
                    </Link>
                    <div>
                    <Link to='/' className="text-2xl font-bold">LUXELOOT</Link>
                        <ul className="flex gap-1">
                            <li className="text-xs font-bold">&bull; ОТКРОЙ</li>
                            <li className="text-xs font-bold">&bull; УЧАСТВУЙ</li>
                            <li className="text-xs font-bold">&bull; ПОБЕЖДАЙ</li>
                        </ul>
                    </div>
                    
                </div>
                <div>
                <Link to={state.isLoggedIn ? '/account':'/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        </div>

                        {state.isLoggedIn ?
                            <Link to='/account' className="font-bold capitalize">Привет, {state.user?.firstname}!</Link> :
                            <Link to='/login' className="font-bold">Вход</Link> 
                        }
                        {/* {!!state.isLoggedIn && (
                            <div>
                                {state.user?.name}
                            </div>

                        )} */}
                </Link>
                
                    
                </div>
            </div>
            <div className="pb-2 px-8 flex justify-start gap-2">
                
                <Link to='/'>
                    <div className={pathname === '/' ? baseBtnStyle + " bg-gray-200" : baseBtnStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                        </svg>
                        <span className="font-bold">Главная</span>
                    </div>
                </Link>
                <Link to='/auctions'>
                    <div className={pathname === '/auctions' ? baseBtnStyle + " bg-gray-200" : baseBtnStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                            <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
                            <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                        </svg>
                        <span className="font-bold">Все аукционы</span>
                    </div>
                </Link>
                <Link to='/account/auctions/favourite'>
                    <div className={pathname === '/account/auctions/favourite' ? baseBtnStyle + " bg-gray-200" : baseBtnStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                        <span className="font-bold">Наблюдение</span>
                    </div>
                </Link>
                <Link to='/account/lots'>
                    <div className={pathname === '/account/lots' ? baseBtnStyle + " bg-gray-200" : baseBtnStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M5.478 5.559A1.5 1.5 0 0 1 6.912 4.5H9A.75.75 0 0 0 9 3H6.912a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H15a.75.75 0 0 0 0 1.5h2.088a1.5 1.5 0 0 1 1.434 1.059l2.213 7.191H17.89a3 3 0 0 0-2.684 1.658l-.256.513a1.5 1.5 0 0 1-1.342.829h-3.218a1.5 1.5 0 0 1-1.342-.83l-.256-.512a3 3 0 0 0-2.684-1.658H3.265l2.213-7.191Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v6.44l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l1.72 1.72V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        <span className="font-bold">Заявленные лоты</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header;