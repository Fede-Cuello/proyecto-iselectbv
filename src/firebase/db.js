import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  addDoc
} from "firebase/firestore";
import { app } from './config'
    
const db = getFirestore(app);



export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "productos"))
  const productos = []
  querySnapshot.forEach((doc) => {
  productos.push ({...doc.data(), id:doc.id})
})
  return productos
}



export const getProdByCat = async (category) => {
  const q = query(collection(db, "productos"), where("categoria", "==", category));
  const querySnapshot = await getDocs(q)
  const productos = []

querySnapshot.forEach((doc) => {
  productos.push({...doc.data() , id: doc.id})
})
  return productos
}

export const getProduct = async (id) => {
  const docRef = doc(db, "productos", id)
  const docSnap = await getDoc(docRef)

if (docSnap.exists()) {
  return {...docSnap.data(), id:docSnap.id}
} else {
  return null
  }
}

export const getCategorias = async () => {
  const snapshot = await getDocs(collection(db, "productos"));
  const categorias = []

  snapshot.forEach((doc) => {
    const categoria = doc.data().categoria
    if (categoria && !categorias.includes(categoria)) {
      categorias.push(categoria)
    }
  })

  return categorias
}

export const createOrder = async (orden) => {
  await addDoc(collection (db,"orders"), orden)
}

export async function getProdByEstado(estado) {
  const q = query(collection(db, "productos"), where("estado", "==", estado));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}