import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/LayoutPage';
import IndexPage from './pages/IndexPage';
import AuctionsPage from './pages/AuctionsPage';
import FavouriteAuctions from './pages/FavouriteAuctionsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuctionPage from './pages/AuctionPage';
import AuctionEditPage from './pages/AuctionEditPage';
import BoughtLots from './pages/BoughtLots';
import LotPage from './pages/LotPage';
import PaymentInfo from './pages/PaymentInfoPage';
import AccountPage from './pages/AccountPage';
import EditLotPage from './pages/LotEditPage';
import AuctionLotsTablePage from './pages/AuctionLotsTablePage';
import NotFoundPage from './pages/NotFoundPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import PrivateRoute from './PrivateRoute';



function App() {
  return (
    <Routes>
      <Route
            path="/*"
            element={
        <PrivateRoute>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path='/auctions/:id/edit' element={<AuctionEditPage/>} />
              <Route path='/auctions/:id/lots' element={<AuctionLotsTablePage/>} />
              <Route path='/auctions/:id' element={<AuctionPage/>} />
              <Route path='/auctions/new' element={<AuctionEditPage/>} />
              <Route path='/paymentinfo/add' element={<PaymentInfo/>} />
              <Route path='/paymentinfo/edit' element={<PaymentInfo/>} />
              <Route path='/account/lots' element={<BoughtLots/>} />
              <Route path='/account/password-change' element={<ChangePasswordPage/>} />
              <Route path='/account' element={<AccountPage/>} />
              <Route path='/lots/:id' element={<LotPage/>} />
              <Route path='/lots/:id/edit' element={<EditLotPage/>} />
              <Route path='/lots/add' element={<EditLotPage/>} />
              <Route path='/account/auctions/favourite' element={<FavouriteAuctions />} />
              <Route path='/*' element={<NotFoundPage/>} />
            </Route>
          </Routes>
        </PrivateRoute>}/>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage />} />
          <Route path='/auctions' element={<AuctionsPage/>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/*' element={<NotFoundPage/>} />
        </Route>
    </Routes>
  );
}

export default App;
