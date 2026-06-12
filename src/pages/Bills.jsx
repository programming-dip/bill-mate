import BillCards from '@/components/BillCards';
import Loading from '@/components/Loading';
import React, { useEffect, useState } from 'react';
import { MdOutlineArrowDownward } from "react-icons/md";
const Bills = () => {

    const [bills, setBills] = useState([]);
    const [filteredBills, setFilteredBills] = useState([]);
    const [selectedType, setSelectedType] = useState("All Bills");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("bills.json")
            .then(res => res.json())
            .then(data => {
                setBills(data);
                setFilteredBills(data);
                setLoading(false);
            });

    }, [])

    const manageBillType = (type) => {
        if (type === 'all') {
            setFilteredBills(bills);
            setSelectedType("All Bills");
            return;
        }

        if (type === 'electricity') {
            const filtered = bills.filter(bill => bill.bill_type === "Electricity & Gas" || bill.bill_type === "Electricity");
            setFilteredBills(filtered);
            setSelectedType("Electricity");
            return;
        }

        if(type === "gas") {
            const filtered = bills.filter(bill=>bill.bill_type === 'Gas' || bill.bill_type === 'Electricity & Gas');
            setFilteredBills(filtered);
            setSelectedType("Gas");
            return;
        }

        if(type === "water") {
            const filtered = bills.filter(bill=> bill.bill_type === "Water & Sewerage");
            setFilteredBills(filtered);
            setSelectedType("Water");
            return;
        }

        if(type === "internet") {
            const filtered = bills.filter(bill=>bill.bill_type === "Internet & Phone" || bill.bill_type === "Broadband" || bill.bill_type ==="Internet & Mobile");
            setFilteredBills(filtered);
            setSelectedType("Internet & Phone");
            return;
        }


    }


    if (loading) return (<Loading></Loading>);

    return (
        <div className='max-w-[95%] mx-auto min-h-[95vh]'>
            <h2 className='text-2xl text-center font-semibold pt-20 pb-10'>My bills</h2>

            <div className='w-full flex justify-center items-center'>
                <p className='mx-2'>Bill Type:</p>
                <div className="dropdown dropdown-start">
                    <div tabIndex={0} role="button" className="btn m-1">{selectedType} <MdOutlineArrowDownward /></div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li><a onClick={() => manageBillType("all")}>All Bills</a></li>
                        <li><a onClick={() => manageBillType("electricity")}>Electricity</a></li>
                        <li><a onClick={() => manageBillType("gas")}>Gas</a></li>
                        <li><a onClick={() => manageBillType("water")}>Water</a></li>
                        <li><a onClick={() => manageBillType("internet")}>Internet & Phone</a></li>
                    </ul>
                </div>
            </div>

            <div className='flex flex-col gap-10 py-10'>
                {/* Cards  */}
                {
                    filteredBills.map(billData => <BillCards key={billData.id} billData={billData}></BillCards>)
                }

            </div>
        </div>
    );
};

export default Bills;