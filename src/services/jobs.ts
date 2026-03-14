import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, arrayUnion, serverTimestamp, getDocs, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface Job {
  id?: string;
  ownerId: string;
  role: string;
  company: string;
  route: string;
  salary: string;
  vehicleType?: string;
  netEarnings?: string;
  timestamp: any;
  applicants: string[];
  status: 'open' | 'closed';
}

// Local cache for optimistic updates if Firestore is slow
let localJobs: Job[] = [
  { id: '1', ownerId: 'demo', role: 'Long Haul Driver', company: 'Sharma Transport', route: 'Delhi ↔ Mumbai', salary: '₹30,000/mo', vehicleType: '18-Wheeler Trailer', netEarnings: '₹45,000/mo', timestamp: new Date(), applicants: [], status: 'open' },
  { id: '2', ownerId: 'demo', role: 'Local Delivery Driver', company: 'QuickLogistics', route: 'Jaipur City', salary: '₹18,000/mo', vehicleType: 'Tata 407', netEarnings: '₹22,000/mo', timestamp: new Date(), applicants: [], status: 'open' },
];
let subscribers: ((jobs: Job[]) => void)[] = [];

const notifySubscribers = (jobs: Job[]) => {
  subscribers.forEach(sub => sub(jobs));
};

export const postJob = async (jobData: Omit<Job, 'id' | 'timestamp' | 'applicants' | 'status'>) => {
  const newJob: Job = {
    id: 'temp-' + Date.now(),
    ...jobData,
    timestamp: new Date(),
    applicants: [],
    status: 'open'
  };

  // Optimistic update
  localJobs = [newJob, ...localJobs];
  notifySubscribers(localJobs);

  if (!db) {
    console.warn("Firestore is not initialized. Job will only be saved locally.");
    return newJob.id;
  }

  try {
    const docRef = doc(collection(db, 'jobs'));
    newJob.id = docRef.id;
    
    // Fire and forget to make it instant
    setDoc(docRef, {
      ...jobData,
      timestamp: serverTimestamp(),
      applicants: [],
      status: 'open'
    }).catch(err => console.error("Background error posting job: ", err));
    
    return docRef.id;
  } catch (error) {
    console.error("Error posting job: ", error);
    throw error;
  }
};

export const subscribeToJobs = (callback: (jobs: Job[]) => void) => {
  subscribers.push(callback);
  
  if (!db) {
    console.warn("Firestore is not initialized. Using mock jobs.");
    callback(localJobs);
    return () => {
      subscribers = subscribers.filter(sub => sub !== callback);
    };
  }

  const q = query(collection(db, 'jobs'), orderBy('timestamp', 'desc'));
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const jobs: Job[] = [];
    snapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() } as Job);
    });
    
    // Only update if we actually got jobs, otherwise keep local cache
    if (jobs.length > 0) {
      localJobs = jobs;
      notifySubscribers(localJobs);
    } else {
      // If Firestore is empty but we have local jobs (optimistic), keep showing them
      notifySubscribers(localJobs);
    }
  }, (error) => {
    console.error("Error fetching jobs: ", error);
    // Fallback for demo if Firestore fails
    notifySubscribers(localJobs);
  });

  return () => {
    unsubscribe();
    subscribers = subscribers.filter(sub => sub !== callback);
  };
};

export const applyForJob = async (jobId: string, userId: string) => {
  // Optimistic update
  localJobs = localJobs.map(job => 
    job.id === jobId ? { ...job, applicants: [...(job.applicants || []), userId] } : job
  );
  notifySubscribers(localJobs);

  if (!db) {
    console.warn("Firestore is not initialized. Mocking job application.");
    return;
  }

  try {
    // If it's a temporary ID, we can't update it in Firestore yet
    if (jobId.startsWith('temp-')) {
      console.warn("Cannot apply to a temporary job ID in Firestore.");
      return;
    }
    
    const jobRef = doc(db, 'jobs', jobId);
    // Fire and forget
    updateDoc(jobRef, {
      applicants: arrayUnion(userId)
    }).catch(err => console.error("Background error applying for job: ", err));
  } catch (error) {
    console.error("Error applying for job: ", error);
    throw error;
  }
};
