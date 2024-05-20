import { handleApiError, api, endpoints } from "../api";
import { actions } from "./reducer/actions";

export const getMethods = (dispatch) => {

  // AUTHENTICATION
  async function whoami() {
    console.log('-- whoami --');

    try {
      const result = await api.get(endpoints.authenticate.whoami);
      console.log(result.data);
      dispatch({
        type: actions.whoami,
        payload: result.data
      });
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }

  async function register(form) {
    console.log('-- register --');

    try {
      const result = await api.post(endpoints.user.register, form);
      console.log('-- register data --');
      console.log(result.data);
      dispatch({
        type: actions.register,
        payload: result.data?.token
      });
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }


  async function changeUserPassword(form) {
    console.log('-- changing user password --');

    const result = await api.post(endpoints.user.passwordChange, form);
    return result.data;  
  }

  async function listAuctions() {
    console.log('-- listing auctions --');

    try {
      const result = await api.get(endpoints.auctions.list);
      dispatch({
        type: actions.listAuctions,
        payload: result.data
      });
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }

  async function getAuction(id) {
    console.log(`-- get auction with ${id}--`);

    try {
      const result = await api.get(endpoints.auctions.get(id));
      dispatch({
        type: actions.getAuction,
        payload: result.data
      });
      return result.data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }

  async function getLotsByAuctionId(id) {
    console.log(`-- get auction with ${id}--`);

    try {
      const result = await api.get(endpoints.auctions.lots.list(id));
      dispatch({
        type: actions.getLotsByAuctionId,
        payload: result.data
      });
      return result.data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }

  async function createAuction(form) {
    console.log('-- create a new auction --');

    try {
      const result = await api.post(endpoints.auctions.create, form);
      dispatch({
        type: actions.createAuction,
        payload: result.data
      });
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }

  async function updateAuction(id, form) {
    console.log(`-- update the auctions with id = ${id}--`);

      try {
        const result = await api.put(endpoints.auctions.update(id), form);
        console.log("updated auction");
        console.log(result.data);
        dispatch({
          type: actions.updateAuction,
          payload: result.data
        });
      } catch (error) {
        handleApiError(error, dispatch);
      }
    }

  async function listStarAuctions() {
      console.log(`-- list star auctions `);
  
      try {
          const result = await api.get(endpoints.auctions.favorites.list);
          console.log(`list star auctions`);
          console.log(result.data);
          dispatch({
            type: actions.listStarAuction,
            payload: result.data.map(a => a.id)
          });
        } catch (error) {
          handleApiError(error, dispatch);
        }
      }

  async function startAuction(id) {
    console.log(`-- star the auctions with id = ${id}--`);

    try {
        const result = await api.post(endpoints.auctions.favorites.add(id));
        console.log(`star auction ${id}`);
        console.log(result.data);
        dispatch({
          type: actions.starAuction,
          payload: id
        });
      } catch (error) {
        handleApiError(error, dispatch);
      }
    }

  async function unStartAuction(id) {
    console.log(`-- unstart the auctions with id = ${id}--`);

    try {
        const result = await api.delete(endpoints.auctions.favorites.remove(id));
        console.log(`unstared auction ${id}`);
        console.log(result.data);
        dispatch({
          type: actions.unStarAuction,
          payload: id
        });
      } catch (error) {
        handleApiError(error, dispatch);
      }
    }

  async function uploadImage(form) {
    console.log(`-- upload image --`);

    try {
        const result = await api.post(endpoints.images.upload, form);
        console.log(`upload image`);
        console.log(result.data);
        dispatch({
          type: actions.imageUpload,
          payload: result.data
        });
        return result.data.url;
      } catch (error) {
        handleApiError(error, dispatch);
      }
    }

  async function userUpdate(id, form) {
    console.log(`-- updating user ${id}--`);

    try {
        const result = await api.put(endpoints.user.update(id), form);
        console.log(`updating user ${id}`);
        console.log(result.data);
        dispatch({
          type: actions.userUpdate,
          payload: result.data
        });
      } catch (error) {
        handleApiError(error, dispatch);
      }
  }

  async function getPaymentCard() {
    console.log(`-- getting payment card --`);

    try {
        const result = await api.get(endpoints.paymentCard);
        console.log(result.data);
        dispatch({
          type: actions.getPaymentCard,
          payload: result.data
        });
      } catch (error) {
        handleApiError(error, dispatch);
      }
  }

  async function addPaymentCard(form) {
    console.log(`-- adding payment card --`);

    try {
        const result = await api.post(endpoints.paymentCard, form);
        console.log(result.data);
        dispatch({
          type: actions.addPaymentCard,
          payload: result.data
        });
      } catch (error) {
        handleApiError(error, dispatch);
      }
  }

  async function updatePaymentCard(form) {
    console.log(`-- updating payment card --`);

    try {
        const result = await api.put(endpoints.paymentCard, form);
        console.log(result.data);
        dispatch({
          type: actions.updatePaymentCard,
          payload: result.data
        });
      } catch (error) {
        handleApiError(error, dispatch);
      }
  }

  async function deletePaymentCard(form) {
    console.log(`-- deleting payment card --`);

    try {
        const result = await api.post(endpoints.paymentCardDelete, form);
        console.log(result.data);
        dispatch({
          type: actions.deletePaymentCard,
          payload: result.data
        });
      } catch (error) {
        handleApiError(error, dispatch);
      }
  }

  async function listLots() {
    console.log('-- listing lots --');

    try {
      const result = await api.get(endpoints.lots.list);
      console.log('from api list lots');
      console.log(result);
      dispatch({
        type: actions.listLots,
        payload: result.data
      });
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }

  async function getLot(id) {
    console.log(`-- getting lot with ${id}--`);

    try {
      const result = await api.get(endpoints.lots.get(id));
      console.log("getting lot");
      console.log(result.data);
      dispatch({
        type: actions.getLot,
        payload: result.data
      });
      return result.data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }

  async function createLot(form) {
    console.log('-- create a new lot --');

    try {
      const result = await api.post(endpoints.lots.create, form);
      console.log("created a new lot", result.data);
      dispatch({
        type: actions.createLot,
        payload: result.data
      });
      return result.data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }

  async function updateLot(id, form) {
    console.log(`-- update the lot with id = ${id}--`);

      try {
        const result = await api.put(endpoints.lots.update(id), form);
        console.log("updated lot");
        console.log(result.data);
        dispatch({
          type: actions.updateLot,
          payload: result.data
        });
      } catch (error) {
        handleApiError(error, dispatch);
      }
    }


    async function deleteLot(id) {
      console.log(`-- delete the lot with id = ${id}--`);
  
        try {
          const result = await api.post(endpoints.lots.delete(id));
          console.log("delete lot");
          console.log(result.data);
          dispatch({
            type: actions.deleteLot,
            payload: result.data
          });
        } catch (error) {
          handleApiError(error, dispatch);
        }
      }

    return {
      whoami,
      register,
      listAuctions,
      getAuction, 
      createAuction,
      updateAuction,
      startAuction,
      unStartAuction, 
      uploadImage,
      userUpdate,
      getPaymentCard,
      addPaymentCard,
      updatePaymentCard,
      deletePaymentCard,
      listStarAuctions,
      listLots,
      getLot,
      createLot,
      updateLot,
      deleteLot,
      getLotsByAuctionId,
      changeUserPassword
    }
}