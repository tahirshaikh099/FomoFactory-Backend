# FomoFactory-Backend
Sure! Here is a sample README for the backend of your project:

---

# Real-Time Stock/Crypto Price Tracker

## Overview

This is a backend service for a real-time stock/crypto price tracking application. The service periodically fetches real-time price data for selected stocks and cryptocurrencies from an external API and stores this data in a MongoDB database. It also provides an API to fetch the most recent price data for display on a frontend.

## Features

- Periodically fetches real-time price data for selected stocks/cryptocurrencies.
- Stores fetched price data in MongoDB.
- Provides an API to fetch the most recent price data.
- Uses TypeScript for type safety.
- Implements robust error handling to ensure continuous operation even if the external API fails.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios
- TypeScript
- dotenv

## Setup and Installation

### Prerequisites

- Node.js (v14 or above)
- npm (v6 or above)
- MongoDB instance (local or cloud)
- CoinAPI key (or another API service for fetching stock/crypto prices)

### Installation Steps

1. Clone the repository:

```sh
git clone <repository_url>
cd <repository_directory>
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```
MONGO_URI=<Your MongoDB Connection String>
COINAPIKEY=<Your CoinAPI Key>
PORT=3000  # Optional, defaults to 3000
```

4. Compile TypeScript to JavaScript:

```sh
npm run build
```

5. Start the server:

```sh
npm start
```

The server should now be running on the port specified in your `.env` file (default is 3000).

## API Endpoints

### Fetch Real-Time Prices

Periodically fetches real-time prices for selected stocks/cryptocurrencies and stores them in MongoDB.

### Get Recent Prices

Fetch the most recent 20 price entries for a particular stock/crypto.

- **URL:** `/api/prices/:symbol`
- **Method:** `GET`
- **URL Params:**
  - `symbol` (string): The stock/crypto symbol (e.g., BTC, GOOG)
- **Success Response:**
  - **Code:** 200
  - **Content:** `[{ symbol: "BTC", price: 35000, timestamp: "2021-08-01T00:00:00.000Z" }, ...]`
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ message: 'Error fetching prices' }`

## Folder Structure

```
.
├── src
│   ├── models
│   │   └── price.ts
│   ├── routes
│   │   └── prices.ts
│   ├── app.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Development

### Running in Development Mode

1. Start the server in development mode with hot-reloading:

```sh
npm run dev
```

### Testing

Add unit and integration tests to ensure the functionality of your code. To run tests:

```sh
npm test
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
