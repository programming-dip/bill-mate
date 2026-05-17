import BillCards from '@/components/BillCards';
import { div } from 'framer-motion/client';
import React, { useEffect, useState } from 'react';

const Bills = () => {

    const [bills, setBills] = useState([]);
    useEffect(() => {
        fetch("bills.json")
            .then(res => res.json())
            .then(data => setBills(data));
    }, [])

    return (
        <div className='max-w-[95%] mx-auto min-h-[95vh]'>
            <h2 className='text-2xl text-center font-semibold py-20'>My bills</h2>

            <div className='flex flex-col gap-10 py-10'>
                {/* Cards  */}
                {
                    bills.map(billData => <BillCards key={billData.id} billData={billData}></BillCards>)
                }

            </div>
        </div>
    );
};

export default Bills;