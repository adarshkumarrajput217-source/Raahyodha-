import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, arrayUnion, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export interface Job {
  id?: string;
  ownerId: string;
  role: string;
  company: string;
  route: string;
  salary: string;
  timestamp: any;
  applicants: string[];
  status: 'open' | 'closed';
}

export const postJob = async (jobData: Omit<Job, 'id' | 'timestamp' | 'applicants' | 'status'>) => {
  if (!db) {
    console.warn("Firestore is not initialized. Job will not be saved.");
    return "mock-id-" + Math.random();
  }
  try {
    const docRef = await addDoc(collection(db, 'jobs'), {
      ...jobData,
      timestamp: serverTimestamp(),
      applicants: [],
      status: 'open'
    });
    return docRef.id;
  } catch (error) {
    console.error("Error posting job: ", error);
    throw error;
  }
};

export const subscribeToJobs = (callback: (jobs: Job[]) => void) => {
  if (!db) {
    console.warn("Firestore is not initialized. Using mock jobs.");
    callback([
      { id: '1', ownerId: 'demo', role: 'Long Haul Driver (Trailer)', company: 'Sharma Transport', route: 'Delhi ↔ Mumbai', salary: '₹30,000/mo', timestamp: new Date(), applicants: [], status: 'open' },
      { id: '2', ownerId: 'demo', role: 'Local Delivery Driver', company: 'QuickLogistics', route: 'Jaipur City', salary: '₹18,000/mo', timestamp: new Date(), applicants: [], status: 'open' },
    ]);
    return () => {};
  }
  const q = query(collection(db, 'jobs'), orderBy('timestamp', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const jobs: Job[] = [];
    snapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() } as Job);
    });
    callback(jobs);
  }, (error) => {
    console.error("Error fetching jobs: ", error);
    // Fallback for demo if Firestore fails
    callback([
      { id: '1', ownerId: 'demo', role: 'Long Haul Driver (Trailer)', company: 'Sharma Transport', route: 'Delhi ↔ Mumbai', salary: '₹30,000/mo', timestamp: new Date(), applicants: [], status: 'open' },
      { id: '2', ownerId: 'demo', role: 'Local Delivery Driver', company: 'QuickLogistics', route: 'Jaipur City', salary: '₹18,000/mo', timestamp: new Date(), applicants: [], status: 'open' },
    ]);
  });
};

export const applyForJob = async (jobId: string, userId: string) => {
  if (!db) {
    console.warn("Firestore is not initialized. Mocking job application.");
    return;
  }
  try {
    const jobRef = doc(db, 'jobs', jobId);
    await updateDoc(jobRef, {
      applicants: arrayUnion(userId)
    });
  } catch (error) {
    console.error("Error applying for job: ", error);
    throw error;
  }
};
