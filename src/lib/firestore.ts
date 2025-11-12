import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "./firebase";

// Property/Listing interface
export interface Listing {
  id: string;
  title: string;
  location: string;
  askingPrice: string;
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

// Helper function to format askingPrice
const formataskingPrice = (askingPrice: any): string => {
  if (!askingPrice && askingPrice !== 0) return "askingPrice on request";
  
  // If it's already a string, return it
  if (typeof askingPrice === "string") return askingPrice;
  
  // If it's a number, format it
  if (typeof askingPrice === "number") {
    if (askingPrice >= 1000000) {
      return `$${(askingPrice / 1000000).toFixed(1)}M`;
    } else if (askingPrice >= 1000) {
      return `$${(askingPrice / 1000).toFixed(0)}K`;
    } else {
      return `$${askingPrice.toLocaleString()}`;
    }
  }
  
  return "askingPrice on request";
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
  
  // Try to get askingPrice from various fields
  const rawaskingPrice = data.askingPrice || data.askingPriceFormatted || data.askingPriceAmount || data.value || data.price || data.listingPrice;
  const askingPrice = formataskingPrice(rawaskingPrice);
  
  // Try to get size from various fields
  const rawSize = data.size || data.sizeFormatted || data.squareFeet || data.area;
  const size = formatSize(rawSize);
  
  // Try to get image from various fields
  const image = data.image || data.imageUrl || data.photo || data.thumbnail || data.imageURL || "";
  
  return {
    id: doc.id,
    title: data.title || data.name || data.propertyName || "Untitled Property",
    location: data.location || data.address || data.city || data.locationName || "Location not specified",
    askingPrice: askingPrice,
    // add canonical `price` field so UI components that expect `price` work
    price: askingPrice,
    type: data.type || data.propertyType || data.category || "Commercial",
    size: size,
    image: image,
    status: data.status || "available",
    description: data.description || data.details,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    // Include any other fields
    ...Object.fromEntries(
      Object.entries(data).filter(([key]) => 
        !["title", "name", "propertyName", "location", "address", "city", "locationName", 
          "askingPrice", "askingPriceFormatted", "askingPriceAmount", "value", "price", "listingPrice",
          "size", "sizeFormatted", "squareFeet", "area", "type", "propertyType", "category", "image", "imageUrl", 
          "photo", "thumbnail", "imageURL", "status", "description", "details"].includes(key)
      )
    ),
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

