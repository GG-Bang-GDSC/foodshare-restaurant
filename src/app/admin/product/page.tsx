'use client';
import tableDataDevelopment from 'variables/data-tables/tableDataDevelopment';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import CheckTable from 'components/admin/data-tables/CheckTable';
import tableDataColumns from 'variables/data-tables/tableDataColumns';
import tableDataComplex from 'variables/data-tables/tableDataComplex';
import DevelopmentTable from 'components/admin/data-tables/DevelopmentTable';
import ColumnsTable from 'components/admin/data-tables/ColumnsTable';
import ComplexTable from 'components/admin/data-tables/ComplexTable';
import { collection, getDoc, QuerySnapshot, query, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from 'app/firebase';
import Link from 'next/link';

const Tables = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'foods'))
    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot) => {
      setLoading(true)
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setProducts(data)
    })
    setLoading(false)
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    setLoading(true)
    console.log( 'prod', products)
    setLoading(false)
  }, [products])
  useEffect(() => {
    console.log( 'loading', loading)
  }, [loading])

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        {(products.length > 0 && !loading)  && (<DevelopmentTable tableData={products} />)}
        {loading? (<>Loading...</>):(products.length == 0 && !loading) && (<>
       <p>Loading...</p>
        </>)}
      </div>
    </div>
  );
};

export default Tables;
