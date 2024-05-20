const storedToken = localStorage.getItem('token');

export const initialState = {

  // AUTHENTICATION

  isLoggedIn: !!storedToken,
  token: storedToken,
  whoam: null,
  user: null,
  paymentCard: null,

  // AUCTIONS
  targetAuction: null,
  auctions: [],
  auctions_fav: [],
  
  lots: [],
  targetLot: null,

}
