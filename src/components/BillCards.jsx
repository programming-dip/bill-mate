import TypeIcon from '@/utils/TypeIcon';
import React, { useContext } from 'react';
import { Link } from 'react-router';
import { FaCheck } from "react-icons/fa";
import { AuthContext } from '@/contexts/AuthContext';

const BillCards = ({ billData }) => {
    const { id, bill_type, icon, organization, amount, due_date } = billData;
    const date = new Date(due_date);
    const { user } = useContext(AuthContext);
    const userPrefix = user.uid;
    const paidBills = localStorage.getItem(`${userPrefix}-paidBillsId`);

    // console.log("Paid Bills: ", paidBills);


    return (
        <div className="card card-side card-hover hover:-translate-y-1 hover:shadow-lg transition-all rounded-2xl border border-base-300 bg-base-100 overflow-hidden shadow-sm">
            <figure className='w-45 shrink-0 bg-base-100 flex items-center justify-center p-4 border-r border-base-300'>
                <img
                    src={icon}
                    className='w-full h-30 object-contain'
                    alt={organization} />
            </figure>

            <div className="px-10 py-4 w-full flex items-center justify-evenly gap-4 flex-wrap">
                <h2 className="card-title min-w-50">{organization}</h2>
                <div className='flex gap-2'>
                    <TypeIcon type={bill_type}></TypeIcon>
                    <p className='min-w-40'>{bill_type}</p>
                </div>
                <p>Amount: <span className='font-bold'>{amount}</span> </p>
                <p>Due Date: {date.toLocaleString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })}</p>

                <div className="card-actions pl-10">

                    {paidBills?.includes(id) ? <button className="btn btn-primary btn-outline disabled">Bill Paid <FaCheck /></button>
                        : <Link to={`/bill-details/${id}`} className="btn btn-primary">See Details</Link>
                    }

                </div>

            </div>


        </div>
    );
};

export default BillCards;