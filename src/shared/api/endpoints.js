export const endpoints = {
    authenticate: {
        token: "/api/v1/auth/authenticate",
        whoami: "/api/v1/users/whoami"
    },
    user: {
        register: "/api/v1/auth/register",
        update: (id) => `/api/v1/users/${id}`,
        passwordChange: "/api/v1/users/change-password",
    },
    auctions: {
        list: "/api/v1/auctions",
        get: (id) => `/api/v1/auctions/${id}`,
        create: "/api/v1/auctions",
        update: (id) => `/api/v1/auctions/${id}`,
        delete: (id) => `/api/v1/auctions/${id}`,
        favorites: {
            list: "/api/v1/auctions/favorites",
            add: (id) => `/api/v1/auctions/favorites/${id}`,
            remove: (id) => `/api/v1/auctions/favorites/${id}`
        },
        lots: {
            list:(id) => `/api/v1/auctions/${id}/lots`,
        }
    },

    lots: {
        list: "/api/v1/lots",
        get: (id) => `/api/v1/lots/${id}`,
        create: "/api/v1/lots",
        update: (id) => `/api/v1/lots/${id}`,
        delete: (id) => `/api/v1/lots/${id}/delete`,
    },

    images: {
        upload: '/api/v1/images/upload',
      },
      
    paymentCard: "/api/v1/users/payment-card",
    paymentCardDelete: "/api/v1/users/payment-card/delete",

}