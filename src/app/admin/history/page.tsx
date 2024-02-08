'use client';
import tableDataDevelopment from 'variables/data-tables/tableDataDevelopment';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import CheckTable from 'components/admin/data-tables/CheckTable';
import tableDataColumns from 'variables/data-tables/tableDataColumns';
import tableDataComplex from 'variables/data-tables/tableDataComplex';
import DevelopmentTable from 'components/admin/data-tables/DevelopmentTable';
import ColumnsTable from 'components/admin/data-tables/ColumnsTable';
import ComplexTable from 'components/admin/data-tables/ComplexTable';
import { collection, getDoc, QuerySnapshot, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from 'app/firebase';
import Link from 'next/link';
import HistoryTable from 'components/admin/data-tables/HistoryTable';
import tableDataHistory from 'variables/data-tables/tableHistoryData';

const Tables = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'orders'))
    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot) => {
      setLoading(true)
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setOrders(data)
    })
    setLoading(false)
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    setLoading(true)
    console.log( 'prod', orders)
    setLoading(false)
  }, [orders])
  useEffect(() => {
    console.log( 'loading', loading)
  }, [loading])
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
      {/* {(orders.length > 0 && !loading)  && <ComplexTable tableData={orders} />} */}
      <HistoryTable tableData={tableDataHistory}/>
      </div>
    </div>
  );
};

export default Tables;
