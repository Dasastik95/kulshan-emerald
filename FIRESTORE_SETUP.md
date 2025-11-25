# Firestore Security Rules Setup

## Problem
You're seeing "Missing or insufficient permissions" error because Firestore security rules are blocking read access to your collections.

## Solution

### Option 1: Update Rules in Firebase Console (Recommended for Quick Fix)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `clientlisting01`
3. Navigate to **Firestore Database** in the left sidebar
4. Click on the **Rules** tab
5. Replace the existing rules with the following:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to listings collection
    match /listings/{document=**} {
      allow read: if true;
      allow write: if false; // Only allow writes through admin/Firebase Admin SDK
    }
    
    // Allow public read access to previous-deals collection
    match /previous-deals/{document=**} {
      allow read: if true;
      allow write: if false; // Only allow writes through admin/Firebase Admin SDK
    }
    
    // Deny access to all other collections by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

6. Click **Publish** to deploy the rules
7. Wait a few seconds for the rules to propagate
8. Refresh your application - the error should be resolved

### Option 2: Deploy Rules Using Firebase CLI (For Production)

If you have Firebase CLI installed:

1. Install Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project (if not already done):
   ```bash
   firebase init firestore
   ```

4. Deploy the rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Security Notes

- **Read Access**: The rules allow anyone to read from `listings` and `previous-deals` collections. This is appropriate for a public listing website.

- **Write Access**: Write access is currently disabled for public users. To add/edit listings, you'll need to:
  - Use Firebase Admin SDK from a secure backend
  - Or implement authentication and update rules to allow authenticated admin users only

## Testing

After updating the rules, test by:
1. Refreshing your application
2. Navigating to `/listings/current` or `/listings/closed`
3. You should see data loading from Firebase (or empty states if collections are empty)

## Next Steps

1. **Add Data**: Make sure you have data in your Firestore collections:
   - Collection: `listings` (for current listings)
   - Collection: `previous-deals` (for closed transactions)

2. **Data Structure**: Each document should have fields like:
   - `title` (string)
   - `location` (string)
   - `price` (string or number)
   - `type` (string)
   - `size` (string or number)
   - `image` (string URL)
   - `status` (string: "available", "sold", or "pending")

3. **Future Enhancements**: Consider adding authentication for admin users if you need to allow writes from the application.

