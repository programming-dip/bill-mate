import { AuthContext } from '@/contexts/AuthContext';
import { PaymentContext } from '@/contexts/PaymentContext';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

// Payment Provider is plugged in at PrivateRoute.jsx
const PaymentProvider = ({ children }) => {

    const {user} = useContext(AuthContext);
    const userPrefix = user.uid;

    const paidBillsJson = localStorage.getItem(`${userPrefix}-paidBillsId`);
    const [balance, setBalance] = useState(parseInt(localStorage.getItem(`${userPrefix}-balance`)));
    const redirect = useNavigate();

    if (!balance) {
        localStorage.setItem(`${userPrefix}-balance`, 1000);
        setBalance(parseInt(localStorage.getItem(`${userPrefix}-balance`, 1000)));


    }

    useEffect(() => {
        localStorage.setItem(`${userPrefix}-balance`, parseInt(balance));
    }, [userPrefix, balance])


    const payBill = (id, amount) => {


        const paidBillsObj = JSON.parse(paidBillsJson);

        if (balance < amount) {
            Swal.fire({
                title: "Not enough money!",
                icon: "error",
                theme: 'auto',
                draggable: false
            });
            return;
        }

        if (!paidBillsJson) {
            localStorage.setItem(`${userPrefix}-paidBillsId`, JSON.stringify([id]));

            setBalance(balance - amount);
            // window.location.reload();
            Swal.fire({
                title: "Paid Successfully!",
                icon: "success",
                theme: 'auto',
                draggable: false
            })
            .then((result)=>{
                if(result.isConfirmed){
                    window.location.reload();
                } else if(result.isDismissed){
                    window.location.reload();
                }
            });
            redirect('/bills');

            return;

        }

        if (paidBillsObj.includes(id)) {
            Swal.fire({
                title: "This bill is already paid!",
                icon: "warning",
                theme: 'auto',
                draggable: false
            });
            return;
        }

        if (!paidBillsObj.includes(id)) {

            const updatedIDs = [...paidBillsObj, id];
            localStorage.setItem(`${userPrefix}-paidBillsId`, JSON.stringify(updatedIDs));

            setBalance(balance - amount);
            // window.location.reload();
            Swal.fire({
                title: "Paid Successfully!",
                icon: "success",
                theme: 'auto',
                draggable: false
            })
            .then((result)=>{
                if(result.isConfirmed){
                    window.location.reload();
                } else if(result.isDismissed){
                    window.location.reload();
                }
            });
            redirect('/bills');


        }



    }

    const paymentFunc = {
        payBill,
        balance,

    }

    return (
        <PaymentContext value={paymentFunc}>
            {children}
        </PaymentContext>
    );
};

export default PaymentProvider;