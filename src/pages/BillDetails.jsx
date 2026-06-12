import Loading from '@/components/Loading';
import { PaymentContext } from '@/contexts/PaymentContext';
import TypeIcon from '@/utils/TypeIcon';
import { log } from 'firebase/firestore/pipelines';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

const BillDetails = () => {
    const urlID = parseInt(useParams().id);
    const [billData, setBillData] = useState({});
    const [loading, setLoading] = useState(true);

    const { payBill } = useContext(PaymentContext);

    const managePayNow = (id, amount) => {
        payBill(id, amount);
    }

    useEffect(() => {
        fetch("/bills.json")
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                const targetedData = data.find(singleData => singleData.id === urlID);
                setBillData(targetedData);
                setLoading(false);
            })
    }, [urlID])

    if (loading) { return <Loading></Loading> }

    return (
        <div className='max-w-[95%] mx-auto min-h-[90vh]'>
            <h2 className='text-center text-3xl font-semibold pt-10'>Bill Payment</h2>
            <Link to="/bills" className="btn btn-ghost btn-sm w-fit gap-2 text-base-content/60 hover:text-base-content -ml-2 mt-40">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Bills
            </Link>

            <div className="card card-side bg-base-100 shadow-sm">
                <figure className='max-w-30 lg:max-w-54 lg:max-h-70'>
                    <img
                        src={billData.icon}
                        alt={`${billData.organization}-logo`}
                        className='object-contain lg:max-h-50' />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl">{billData.organization}</h2>

                    <div className='flex max-w-35 justify-between'>
                        <TypeIcon type={billData.bill_type}></TypeIcon>
                        <p className='font-extralight'>{billData.bill_type}</p>
                    </div>

                    <div className='flex lg:max-w-200 lg:px-20 mt-10 items-center space-x-2'>
                        <p className='text-lg'>Amount</p>
                        <p className='text-xl font-bold'>${billData.amount}</p>
                    </div>
                    <div className='flex lg:max-w-200 lg:px-20 items-center'>
                        <p className='text-lg'>Due Date</p>
                        <p>18 June 2025</p>
                    </div>
                    <div className='flex lg:max-w-200 lg:px-20 items-center'>
                        <p className='text-lg'>Reference</p>
                        <p>#BILL-000{billData.id}</p>
                    </div>



                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => managePayNow(billData.id, billData.amount)}>Pay Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillDetails;