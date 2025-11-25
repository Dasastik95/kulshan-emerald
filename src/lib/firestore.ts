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

// Helper function to format location object to string
const formatLocation = (location: any): string => {
  if (!location) return "Location not specified";
  
  // If it's already a string, return it
  if (typeof location === "string") return location;
  
  // If it's an object with state and city, format it
  if (typeof location === "object") {
    const city = location.city || location.City || "";
    const state = location.state || location.State || "";
    
    if (city && state) return `${city}, ${state}`;
    if (city) return city;
    if (state) return state;
  }
  
  return "Location not specified";
};

// Helper function to convert Firebase document to Listing
const convertFirestoreDocToListing = (doc: QueryDocumentSnapshot<DocumentData>): Listing => {
  const data = doc.data();
  
  // Format location properly
  const rawLocation = data.location || data.address || data.city || data.locationName;
  const formattedLocation = formatLocation(rawLocation);
  
  // Spread all data first, then override with formatted values
  return {
    // Include ALL other fields from database first
    ...data,
    // Override with properly formatted/typed fields
    id: doc.id,
    title: data.title || data.name || data.propertyName || "Untitled Property",
    location: formattedLocation, // Always a string, never an object
    price: data.price || data.askingPrice || data.priceFormatted || data.priceAmount || data.value || "",
    type: data.type || data.industry || data.propertyType || data.category || "Commercial",
    size: data.size || data.sizeFormatted || data.squareFeet || data.area || "",
    image: data.image || data.imageUrl || data.photo || data.thumbnail || data.imageURL || "",
    status: data.status || "available",
  };
};

// Fetch Kulshan Commercial current listings
export const fetchKulshanCommercialCurrent = async (): Promise<Listing[]> => {
  try {
    const listingsRef = collection(db, "Kulshan_Commercial_current");
    const querySnapshot = await getDocs(listingsRef);
    
    const listings: Listing[] = [];
    querySnapshot.forEach((doc) => {
      listings.push(convertFirestoreDocToListing(doc));
    });
    
    return listings;
  } catch (error: any) {
    console.error("Error fetching Kulshan Commercial current listings:", error);
    if (error?.code === 'permission-denied') {
      console.error("❌ Permission denied! Please update Firestore security rules in Firebase Console.");
      throw new Error("Missing or insufficient permissions. Please update Firestore security rules in Firebase Console to allow read access to the 'Kulshan_Commercial_current' collection.");
    }
    throw error;
  }
};

// Fetch B2B Business Brokers current listings
export const fetchB2BBusinessBrokersCurrent = async (): Promise<Listing[]> => {
  try {
    const listingsRef = collection(db, "B2B_Business_Brokers_current");
    const querySnapshot = await getDocs(listingsRef);
    
    const listings: Listing[] = [];
    querySnapshot.forEach((doc) => {
      listings.push(convertFirestoreDocToListing(doc));
    });
    
    return listings;
  } catch (error: any) {
    console.error("Error fetching B2B Business Brokers current listings:", error);
    if (error?.code === 'permission-denied') {
      console.error("❌ Permission denied! Please update Firestore security rules in Firebase Console.");
      throw new Error("Missing or insufficient permissions. Please update Firestore security rules in Firebase Console to allow read access to the 'B2B_Business_Brokers_current' collection.");
    }
    throw error;
  }
};

// Fetch Kulshan Commercial previous deals
export const fetchKulshanCommercialPrevious = async (): Promise<Listing[]> => {
  try {
    const previousDealsRef = collection(db, "Kulshan_Commercial_previous");
    const querySnapshot = await getDocs(previousDealsRef);
    
    const deals: Listing[] = [];
    querySnapshot.forEach((doc) => {
      const listing = convertFirestoreDocToListing(doc);
      listing.status = "sold";
      deals.push(listing);
    });
    
    return deals;
  } catch (error: any) {
    console.error("Error fetching Kulshan Commercial previous deals:", error);
    if (error?.code === 'permission-denied') {
      console.error("❌ Permission denied! Please update Firestore security rules in Firebase Console.");
      throw new Error("Missing or insufficient permissions. Please update Firestore security rules in Firebase Console to allow read access to the 'Kulshan_Commercial_previous' collection.");
    }
    throw error;
  }
};

// Fetch B2B Business Brokers previous deals
export const fetchB2BBusinessBrokersPrevious = async (): Promise<Listing[]> => {
  try {
    const previousDealsRef = collection(db, "B2B_Business_Brokers_previous");
    const querySnapshot = await getDocs(previousDealsRef);
    
    const deals: Listing[] = [];
    querySnapshot.forEach((doc) => {
      const listing = convertFirestoreDocToListing(doc);
      listing.status = "sold";
      deals.push(listing);
    });
    
    return deals;
  } catch (error: any) {
    console.error("Error fetching B2B Business Brokers previous deals:", error);
    if (error?.code === 'permission-denied') {
      console.error("❌ Permission denied! Please update Firestore security rules in Firebase Console.");
      throw new Error("Missing or insufficient permissions. Please update Firestore security rules in Firebase Console to allow read access to the 'B2B_Business_Brokers_previous' collection.");
    }
    throw error;
  }
};

// Fetch all listings from 'listings' collection (legacy support)
export const fetchListings = async (): Promise<Listing[]> => {
  return fetchKulshanCommercialCurrent();
};

// Fetch all previous deals from 'previous-deals' collection (legacy support)
export const fetchPreviousDeals = async (): Promise<Listing[]> => {
  return fetchKulshanCommercialPrevious();
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

// Fetch single previous deal by document id from 'previous-deals' collection
export const fetchPreviousDealById = async (id: string): Promise<Listing | null> => {
  try {
    const docRef = firestoreDoc(db, "previous-deals", String(id));
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    const listing = convertFirestoreDocToListing(snap as QueryDocumentSnapshot<DocumentData>);
    listing.status = "sold";
    return listing;
  } catch (error: any) {
    console.error("Error fetching previous deal by id:", error);
    if (error?.code === "permission-denied") {
      console.error("❌ Permission denied! Please update Firestore security rules in Firebase Console.");
      throw new Error("Missing or insufficient permissions. Please update Firestore security rules to allow read access to 'previous-deals'.");
    }
    throw error;
  }
};
