"useclient"
import { db } from "app/firebase";
import { useQuery } from './../../../../../node_modules/react-query/es/react/useQuery';
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

const getFirebaseData = async(id)=>{
    const docRef = doc(db, "foods", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        return false;
    }
}

const useFirebaseData = (id)=>{
    return useQuery(['product',id],()=>getFirebaseData(id))
}
// console.log(getFirebaseData("4wFZmrBNZLGYfCZpB62j"));

export default useFirebaseData;