// Import necessary modules or functions
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase'; // Assuming 'auth' and 'db' are your Firebase authentication and Firestore database instances
import { doc, setDoc } from 'firebase/firestore';

// Define the createUser function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createUser = async (userData: { email: any; password: any; name: any; userType: any; businessName: any; businessType: any; phoneNumber: any; houseAddress: any; }) => {
  const { email, password, name, userType, businessName, businessType, phoneNumber, houseAddress } = userData;

  // Create user account using Firebase authentication
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create user document in Firestore database
  const userDoc = {
    uid: user.uid,
    name,
    email,
    userType,
    businessName: userType === 'seller' ? businessName : '',
    businessType: userType === 'seller' ? businessType : '',
    phoneNumber,
    houseAddress,
  };

  await setDoc(doc(db, 'users', user.uid), userDoc);
  console.log('User registered successfully:', userDoc);

  return userDoc; // Return the user document if needed
};

export default createUser; // Export the createUser function
