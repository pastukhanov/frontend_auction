import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useContext } from "react";
import ProviderContext from "../shared/provider/providerContext";

import { getMethods } from "../shared/provider/methods";

import { formatISO, format } from "date-fns";


const PaymentInfo = () => {

    const [cardHolderName, setHolderName] = useState('');
    const [cvv, setCVV] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [firstDig, setFirstDig] = useState('');
    const [secondtDig, setSecondDig] = useState('');
    const [thirtdDig, setThirdDig] = useState('');
    const [forthDig, setForthDig] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [isReady, setIsReady] = useState(false);
    const [redirect, setRedirect] = useState('');
    const [isEditCardPage, setIsEditCardPage] = useState(false);

    const { state, dispatch } = useContext(ProviderContext);
    const { deletePaymentCard, 
            updatePaymentCard,
            getPaymentCard } = getMethods(dispatch);


    useEffect( () => {
        getPaymentCard();
        setIsReady(true);
    }, [])

    useEffect( () => {
        if (!isReady) {
            return 
        }
        
        console.log("проверяем карту");
        console.log(state);
        console.log(state.paymentCard===undefined);

        if (!state.paymentCard || state.paymentCard?.cardHolderName===null) {
            setIsEditCardPage(false);
            return
        }

        setIsEditCardPage(true);

        setHolderName(state.paymentCard?.cardHolderName);
        setFirstDig(state.paymentCard?.cardNumber?.slice(0, 4));
        setSecondDig(state.paymentCard?.cardNumber?.slice(4, 8));
        setThirdDig(state.paymentCard?.cardNumber?.slice(8, 12));
        setForthDig(state.paymentCard?.cardNumber?.slice(12, 16));
        if (state.paymentCard?.expirationDate) {
            setExpirationDate(format(formatISO(state.paymentCard?.expirationDate), 'MM/yy'));
        }
        setCVV(state.paymentCard?.cvv);
        console.log(state.paymentCard);
    }, [state.paymentCard])


    useEffect(() => {
        setCardNumber(`${firstDig}${secondtDig}${thirtdDig}${forthDig}`);
    }, [firstDig, secondtDig, thirtdDig, forthDig, cardNumber])


    function convertDate(input) {
        const [month, year] = input.split('/');

        if ( month === null || year === null || input.indexOf("/") < 1) {
            return new Date();
        }
        
        const date = new Date(`20${year}`, month - 1);
        
        const isoString = date.toISOString();
        const formattedDate = isoString.substring(0, isoString.indexOf('.')) + 'Z';
        
        return formattedDate;
    }



    function handlePay() {
        const cardInfoObj = {
            cardHolderName, cardNumber, expirationDate: convertDate(expirationDate) , cvv
        };

        updatePaymentCard(cardInfoObj);
        setRedirect("/account");

        console.log(cardInfoObj);
    }

    function handleDeleteCard () {
        const cardInfoObj = {
            cardHolderName, cardNumber, expirationDate: convertDate(expirationDate), cvv
        };

        console.log(cardInfoObj);
        deletePaymentCard(cardInfoObj);
        setRedirect("/account");
    }

    if (!isReady) {
        return (
            <div class="mt-6">
                <div className="bg-white rounded-2xl p-10">
                    Waiting...
                </div>
            </div>
        )
    }

    if (redirect) {
        return (
            <Navigate to={redirect}/>
        )
    }

    return (
    <div class="mt-6">
        <div className="bg-white rounded-2xl p-10">
            <p className="text-2xl mb-6 font-bold w-full text-center">Страница оплаты</p>
            <div className="front-card">
                <div className="h-[16rem] w-[30rem] bg-blue-300 rounded-2xl relative z-2">
                    <div className="p-4">
                        <fieldset class="form-group">
                            <label for="cc-1">Номер карты</label>
                            <div data-connected-inputs class="flex gap-0.5">
                                <input type="tel" 
                                        placeholder="0000"
                                        value={firstDig}
                                        onChange={(ev) => setFirstDig(ev.target.value)}
                                        maxLength="4" aria-label="Credit Card First 4 Digits" id="cc-1" required pattern="[0-9]{4}" />
                                <input type="tel"
                                        placeholder="0000"
                                        value={secondtDig}
                                        onChange={(ev) => setSecondDig(ev.target.value)}
                                        maxLength="4" aria-label="Credit Card Second 4 Digits" required pattern="[0-9]{4}" />
                                <input type="tel" 
                                        placeholder="0000"
                                        value={thirtdDig}
                                        onChange={(ev) => setThirdDig(ev.target.value)}
                                        maxLength="4" aria-label="Credit Card Third 4 Digits" required pattern="[0-9]{4}" />
                                <input type="tel" 
                                        placeholder="0000"
                                        onChange={(ev) => setForthDig(ev.target.value)}
                                        value={forthDig}
                                        maxLength="4" 
                                        aria-label="Credit Card Last 4 Digits" 
                                        required 
                                        pattern="[0-9]{4}" />
                            </div>
                        </fieldset>

                        <label htmlFor="card-expiration">Месяц/Год</label>
                        <div className="rounded-none w-[5rem]">
                            <input type="tel" 
                                    onChange={(ev) => setExpirationDate(ev.target.value)}
                                    value={expirationDate}
                                    maxlength="5" name="card-expiration" placeholder="ММ/ГГ" />
                        </div>

                        <label htmlFor="cardholder-name">Владелец</label>
                        <input type="text" 
                                value={cardHolderName}
                                placeholder="Ivan Ivanov"
                                onChange={(ev) => setHolderName(ev.target.value)}
                                id="cardholder-name" name="cardholder-name"/>
                    </div>

                </div>
            </div> 
            <div className="back-card">
                <div className="pt-10 h-[16rem] w-[30rem] bg-blue-400 rounded-2xl -mt-[12rem] ml-[6rem]">
                    <div className="h-12 w-full bg-black"></div>
                    <div className="flex flex-col items-end text-center">
                        <div className="mt-3 mr-2">
                            <p>Код</p>
                            <input type="tel" 
                                placeholder="000"
                                onChange={(ev) => setCVV(ev.target.value)}
                                value={cvv}
                                maxlength="3" aria-label="CSV" required pattern="[0-9]{3}" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-6 w-full px-[5rem] flex justify-between gap-1">
                <button className="primary" onClick={handlePay}>{ isEditCardPage ? 'Изменить данные' : 'Добавить карту' }</button>
                <button className="delete-btn" onClick={handleDeleteCard}>Удалить карту</button>
            </div>
        </div>
    </div>
    )

}

export default PaymentInfo;