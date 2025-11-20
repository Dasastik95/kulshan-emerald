import { collection, getDocs, QueryDocumentSnapshot, DocumentData, doc as firestoreDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// Property/Listing interface
export interface Listing {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  size: string;
  image: string;
  status: "available" | "sold" | "pending";
  // Additional fields that might be in Firebase
  description?: string;
  createdAt?: any;
  updatedAt?: any;
  [key: string]: any; // Allow for additional fields
}

// Helper function to format price
const formatPrice = (price: any): string => {
  if (!price && price !== 0) return "Price on request";
  
  // If it's already a string, return it
  if (typeof price === "string") return price;
  
  // If it's a number, format it
  if (typeof price === "number") {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    } else {
      return `$${price.toLocaleString()}`;
    }
  }
  
  return "Price on request";
};

// Helper function to format size
const formatSize = (size: any): string => {
  if (!size) return "Size not specified";
  
  // If it's already a string, return it
  if (typeof size === "string") return size;
  
  // If it's a number, format it with SF
  if (typeof size === "number") {
    return `${size.toLocaleString()} SF`;
  }
  
  return "Size not specified";
};

// Helper function to convert Firebase document to Listing
const convertFirestoreDocToListing = (doc: QueryDocumentSnapshot<DocumentData>): Listing => {
  const data = doc.data();
  
  // Return all fields from database, keeping original field names
  return {
    id: doc.id,
    title: data.title || data.name || data.propertyName || "Untitled Property",
    location: data.location || data.address || data.city || data.locationName || "Location not specified",
    price: data.price || data.askingPrice || data.priceFormatted || data.priceAmount || data.value || "",
    type: data.type || data.industry || data.propertyType || data.category || "Commercial",
    size: data.size || data.sizeFormatted || data.squareFeet || data.area || "",
    image: data.image || data.imageUrl || data.photo || data.thumbnail || data.imageURL || "",
    status: data.status || "available",
    // Include ALL other fields from database
    ...data,
  };
};

// Fetch all listings from 'listings' collection
export const fetchListings = async (): Promise<Listing[]> => {
  try {
    const listingsRef = collection(db, "listings");
    const querySnapshot = await getDocs(listingsRef);
    
    const listings: Listing[] = [];
    querySnapshot.forEach((doc) => {
      listings.push(convertFirestoreDocToListing(doc));
    });
    
    return listings;
  } catch (error: any) {
    console.error("Error fetching listings:", error);
    // Provide more helpful error messages
    if (error?.code === 'permission-denied') {
      console.error("❌ Permission denied! Please update Firestore security rules in Firebase Console.");
      console.error("📖 See FIREBASE_RULES_INSTRUCTIONS.md for step-by-step instructions.");
      throw new Error("Missing or insufficient permissions. Please update Firestore security rules in Firebase Console to allow read access to the 'listings' collection.");
    }
    throw error;
  }
};

// Fetch all previous deals from 'previous-deals' collection
export const fetchPreviousDeals = async (): Promise<Listing[]> => {
  try {
    const previousDealsRef = collection(db, "previous-deals");
    const querySnapshot = await getDocs(previousDealsRef);
    
    const deals: Listing[] = [];
    querySnapshot.forEach((doc) => {
      const listing = convertFirestoreDocToListing(doc);
      // Ensure status is 'sold' for previous deals
      listing.status = "sold";
      deals.push(listing);
    });
    
    return deals;
  } catch (error: any) {
    console.error("Error fetching previous deals:", error);
    // Provide more helpful error messages
    if (error?.code === 'permission-denied') {
      console.error("❌ Permission denied! Please update Firestore security rules in Firebase Console.");
      console.error("📖 See FIREBASE_RULES_INSTRUCTIONS.md for step-by-step instructions.");
      throw new Error("Missing or insufficient permissions. Please update Firestore security rules in Firebase Console to allow read access to the 'previous-deals' collection.");
    }
    throw error;
  }
};

// Fetch single listing by document id
export const fetchListingById = async (id: string): Promise<Listing | null> => {
  try {
    const docRef = firestoreDoc(db, "listings", String(id));
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    // convertFirestoreDocToListing expects a QueryDocumentSnapshot; cast is fine here at runtime
    // (we only need doc.id and doc.data())
    return convertFirestoreDocToListing(snap as QueryDocumentSnapshot<DocumentData>);
  } catch (error: any) {
    console.error("Error fetching listing by id:", error);
    if (error?.code === "permission-denied") {
      console.error("❌ Permission denied! Please update Firestore security rules in Firebase Console.");
      throw new Error("Missing or insufficient permissions. Please update Firestore security rules.");
    }
    throw error;
  }
};

