# Bitespeed Backend API - Identity Reconciliation

This project implements a basic identity reconciliation service for Bitespeed, allowing clients to identify users based on their email and phone number, and returns consolidated contact information.

## 🔗 Live Deployment

- **API Base URL**: [https://bitespeed-fqe1.onrender.com](https://bitespeed-fqe1.onrender.com)
- **Swagger Documentation**: [https://bitespeed-fqe1.onrender.com/api](https://bitespeed-fqe1.onrender.com/api)

## 🚀 Features

- User identity resolution based on email and phone number.
- Primary and secondary contact management.
- Data consolidation for a unified user identity.
- Swagger documentation for easy testing and API reference.

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (hosted on Render)
- **ORM**: Prisma
- **API Docs**: Swagger UI
- **Hosting**: Render

## 🧠 API Endpoint

### `/identify` (POST)

**Request Body:**

```json
{
  "email": "user@example.com",
  "phoneNumber": "1234567890"
}
```
**Response Body:**
```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["user@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2, 3]
  }
}
```
