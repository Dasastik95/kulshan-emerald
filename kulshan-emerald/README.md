# Kulshan Emerald

Kulshan Emerald is a commercial real estate platform that allows users to browse current listings and view closed transactions. The application provides detailed information about properties, including descriptions and images, to help users make informed decisions.

## Features

- **Current Listings**: Users can view available commercial real estate properties with detailed information and images.
- **Closed Transactions**: Users can explore recent successful transactions to understand market trends.
- **Property Details**: Each property has a dedicated page that displays detailed descriptions and a slideshow of images.
- **User-Friendly Interface**: The application is designed with a clean and intuitive interface for easy navigation.

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd kulshan-emerald
npm install
```

## Usage

To run the application in development mode, use the following command:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
kulshan-emerald
├── src
│   ├── pages
│   │   ├── CurrentListings.tsx
│   │   ├── ClosedTransactions.tsx
│   │   ├── Listings.tsx
│   │   └── ListingDetails.tsx
│   ├── components
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyDetails.tsx
│   │   └── ImageCarousel.tsx
│   ├── hooks
│   │   ├── useListings.ts
│   │   └── useListing.ts
│   ├── types
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.