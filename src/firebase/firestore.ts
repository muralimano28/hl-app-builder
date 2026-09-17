import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  type DocumentData,
  type QueryConstraint,
  type CollectionReference,
  type UpdateData,
} from 'firebase/firestore'
import { db } from './config'

export { db }

export function getCollectionRef<T = DocumentData>(collectionName: string): CollectionReference<T, DocumentData> {
  return collection(db, collectionName) as CollectionReference<T, DocumentData>
}

export async function fetchDocument<T = DocumentData>(collectionName: string, id: string): Promise<T | null> {
  const docRef = doc(db, collectionName, id)
  const snap = await getDoc(docRef)
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as T
}

export async function fetchCollection<T = DocumentData>(
  collectionName: string,
  ...constraints: QueryConstraint[]
): Promise<T[]> {
  const colRef = collection(db, collectionName)
  const q = query(colRef, ...constraints)
  const snap = await getDocs(q)
  return snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }) as T)
}

export async function createDocument<T extends DocumentData>(collectionName: string, data: T) {
  const colRef = collection(db, collectionName)
  return await addDoc(colRef, data)
}

export async function saveDocument<T extends DocumentData>(collectionName: string, id: string, data: T) {
  const docRef = doc(db, collectionName, id)
  return await setDoc(docRef, data, { merge: true })
}

export async function updateDocument<T extends DocumentData>(collectionName: string, id: string, data: UpdateData<T>) {
  const docRef = doc(db, collectionName, id)
  return await updateDoc(docRef, data)
}

export async function removeDocument(collectionName: string, id: string) {
  const docRef = doc(db, collectionName, id)
  return await deleteDoc(docRef)
}
