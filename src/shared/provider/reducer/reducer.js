import { actions } from "./actions";


export default function reducer (state, action) {
    switch(action.type) {
        case actions.login:
            return { ...state, isLoggedIn: true, token: action.payload };
      
        case actions.logout:
            return { ...state,  isLoggedIn: false, token: null, whoam: null,
                user: null,
                paymentCard: null,
              
                targetAuction: null,
                auctions: [],
                auctions_fav: [ ],
                lots: []};

        case actions.register:
            return { ...state, isLoggedIn: true, token: action.payload };

        case actions.whoami:
            return { ...state, user: action.payload };

        
        case actions.listAuctions:
            return {
            ...state,
            auctions: action.payload
        };

        case actions.getAuction:
            return {
            ...state,
            targetAuction: action.payload
        };

        case actions.getLotsByAuctionId:
            return {
            ...state,
            lots: action.payload
        };
        
        case actions.createAuction:
            return {
            ...state,
            auctions: [...state.auctions, action.payload]
        };

        case actions.updateAuction:
            return {
            ...state,
            auctions: [...state.auctions.filter((auction) => auction.id !== action.payload.id), action.payload]
        };

        
        case actions.listStarAuction:
            return {
            ...state,
            auctions_fav: [...action.payload]
        };
        
        
        case actions.starAuction:
            return {
            ...state,
            auctions_fav: [...state.auctions_fav, action.payload]
        };

        case actions.unStarAuction:
            return {
            ...state,
            auctions_fav: state.auctions_fav.filter((id) => id !== action.payload)
        };

        case actions.userUpdate:
            return {
            ...state,
            user: action.payload
        };


        case actions.listLots:
            return {
            ...state,
            lots: action.payload
        };

        case actions.getLot:
            return {
            ...state,
            targetLot: action.payload
        };
        
        case actions.createLot:
            return {
            ...state,
            lots: [...state.lots, action.payload]
        };

        case actions.updateLot:
            return {
            ...state,
            lots: [...state.lots.filter((lot) => lot.id !== action.payload.id), action.payload]
        };

        case actions.deleteLot:
            return {
            ...state,
            lots: [...state.lots.filter((lot) => lot.id !== action.payload.id)]
        };

        case actions.addPaymentCard:
            return {
            ...state,
            paymentCard: action.payload
        };

        case actions.deletePaymentCard:
            return {
            ...state,
            paymentCard: null
        };

        case actions.updatePaymentCard:
            return {
            ...state,
            paymentCard: action.payload
        };

        case actions.getPaymentCard:
            return {
            ...state,
            paymentCard: action.payload
        };
        
        default:
            return state;

    }
}