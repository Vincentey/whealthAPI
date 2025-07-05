# Register User Endpoint

Create a new **patient** or **doctor** account.

---

## Overview

This endpoint accepts a JSON payload with the user’s basic profile and credential details.  
If all required fields are valid, it responds with **HTTP 201 Created** and a success message.

|              |                              |
|--------------|------------------------------|
| **Base URL** | `http://localhost:3000`      |
| **Full Path**| `/whealth/auth/register`     |
| **Method**   | `POST`                       |
| **Auth**     | None (public endpoint)       |

---

## Request

### Headers

| Header         | Value              | Required | Notes           |
|----------------|--------------------|----------|-----------------|
| `Content-Type` | `application/json` | ✔        | Must be JSON    |

### Body Schema

| Field       | Type   | Required | Constraints / Notes                                                              |
|-------------|--------|----------|----------------------------------------------------------------------------------|
| `email`     | string | ✔        | Valid e‑mail format; unique in system                                            |
| `password`  | string | ✔        | 8–64 chars; at least one upper/lower‑case, digit, and special char               |
| `firstName` | string | ✔        | 1–50 characters                                                                  |
| `lastName`  | string | ✔        | 1–50 characters                                                                  |
| `category`  | string | ✔        | **Exactly** `"patient"` or `"doctor"` (lower‑case only)                          |

### Example Request

```bash
curl --request POST 'http://localhost:3000/whealth/auth/register' \
  --header 'Content-Type: application/json' \
  --data-raw '{ 
    "email": "vincrayun9@gmail.com",
    "password": "Vinci999@@@",
    "firstName": "Elizabeth",
    "lastName": "Dada",
    "category": "doctor"
  }' 
```

### Responses

| HTTP Code | Meaning                    | Response Body (JSON)                                         | When Returned                                   |
|-----------|---------------------------|--------------------------------------------------------------|-------------------------------------------------|
| **201**   | Created                   | `{ "message": "User created successfully" }`                | All validations pass and user record is saved   |
| **400**   | Bad Request               | `{ "message": "Please fill form appropriately" }`           | One or more required fields missing/invalid     |
| **409**   | Conflict (duplicate e‑mail) | `{ "message": "E‑mail already exists" }`                    | `email` already registered                      |
| **500**   | Internal Server Error     | `{ "message": "Error creating user" }`                      | Unexpected server/database failure              |

---



# Login User

`POST /whealth/auth/login`

Authenticate an existing **patient** or **doctor** and receive a JSON Web Token (JWT).

---

## Overview

On valid credentials, the server returns **HTTP 200 OK** with:

- a success message  
- a profile object (`data`)  
- a signed JWT (`token`) for subsequent authenticated requests  

---

## Endpoint Details

|               |                              |
|---------------|------------------------------|
| **Base URL**  | `http://localhost:3000`      |
| **Full Path** | `/whealth/auth/login`        |
| **Method**    | `POST`                       |
| **Auth**      | _None_ (public access)       |

---

## Request

### Headers

| Header         | Value              | Required | Notes        |
|----------------|--------------------|----------|--------------|
| `Content-Type` | `application/json` | ✔        | Must be JSON |

### Body Schema

| Field      | Type   | Required | Notes                        |
|------------|--------|----------|------------------------------|
| `email`    | string | ✔        | Registered e‑mail address    |
| `password` | string | ✔        | User password (8 – 64 chars) |

### Example Request

```bash
curl --request POST 'http://localhost:3000/whealth/auth/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "email": "vincrayun9@gmail.com",
    "password": "Vinci999@@@"
  }'
```
### Responses

| HTTP Code | Meaning        | Body (JSON)                                           | When Returned            |
|-----------|----------------|-------------------------------------------------------|--------------------------|
| **200**   | OK             | `{ message, data, token }`                            | Credentials correct      |
| **401**   | Unauthorized   | `{ "message": "Invalid login details" }`              | Password incorrect       |
| **404**   | Not Found      | `{ "message": "User not found" }`                     | E‑mail not registered    |
| **500**   | Server Error   | `{ "message": "Error logging in" }` (generic)         | Unexpected server fault  |

### Example Success (200)

```json
{
  "message": "Login successful",
  "data": {
    "_id": "68630278a31fcbc8db811e6c",
    "userId": "4473eed0-2211-4c76-8f4b-3c1bc7679616",
    "email": "vincrayun9@gmail.com",
    "firstName": "Elizabeth",
    "lastName": "Dada",
    "category": "doctor",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Validation & Tips

- **E‑mail must already exist**; otherwise you’ll receive **404 Not Found**.  
- Password comparisons are **case‑sensitive**; repeated failures may trigger lockout or rate‑limit rules.  
- **Store the JWT securely** (e.g., HTTP‑only cookie or encrypted local storage) and include it in requests as  
  `Authorization: Bearer <token>`.  
- Always use **HTTPS** in production; plain HTTP is for local development only.

