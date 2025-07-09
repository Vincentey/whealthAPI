# Profile Setup (Patient / Doctor)

`POST /whealth/patientdashboard/profileSetUp`

Create or update a patient’s or doctor’s profile after successful authentication.

---

## Overview

This endpoint accepts a **JSON** payload with personal and medical details and stores it in the user’s profile.  
A valid **Bearer token** (issued at login) is required in the `Authorization` header.

---

## Endpoint Details

|               |                                             |
|---------------|---------------------------------------------|
| **Base URL**  | `http://localhost:3000`                     |
| **Full Path** | `/whealth/patientdashboard/profileSetUp`    |
| **Method**    | `POST`                                      |
| **Auth**      | Bearer token (JWT) – **required**           |

---

## Request

### Headers

| Header          | Value                    | Required | Notes                         |
|-----------------|--------------------------|----------|-------------------------------|
| `Content-Type`  | `application/json`       | ✔        | Must be JSON                  |
| `Authorization` | `Bearer <JWT‑token>`     | ✔        | Token obtained at login       |

### Body Schema

| Field                | Type   | Required | Constraints / Notes                                                                                                                                      |
|----------------------|--------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `image`              | string | ✔        | Public image URL                                                                                                                                         |
| `Sex`                | string | ✔        | enum: `male` \| `female` \| `others`                                                                                                                     |
| `Religion`           | string | ✔        | e.g., `Christianity`, `Islam`, `None`                                                                                                                    |
| `Nationality`        | string | ✔        | Country name                                                                                                                                             |
| `Contact_no`         | string | ✔        | Phone number in international format                                                                                                                     |
| `Email`              | string | ✔        | Must match account e‑mail                                                                                                                                |
| `Address`            | string | ✔        | Street / city / ZIP                                                                                                                                      |
| `BloodGroup`         | string | ✔        | enum: `A+`, `A`, `B+`, `B`, `AB+`, `AB`, `O+`, `O`                                                                                                       |
| `Genotype`           | string | ✔        | enum: `AA`, `AS`, `SS`, `SC`                                                                                                                             |
| `DateOfBirth`        | string | ✔        | **DD/MM/YYYY** or ISO `YYYY‑MM‑DD`                                                                                                                       |
| `PastSurgicalHistory`| string | ✖        | enum: `Yes`, `No`                                                                                                                                        |
| `ChronicConditions`  | string | ✖        | enum: `None`, `Hypertension`, `Diabetes mellitus`, `Obesity`, `Asthma`, `Chronic Kidney Disease`, `Heart disease`, `Arthritis`, `Others`                |

### Example Request

```bash
curl --request POST 'http://localhost:3000/whealth/patientdashboard/profileSetUp' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  --data-raw '{
    "image": "https://example.com/image.jpg",
    "Sex": "female",
    "Religion": "none",
    "Nationality": "Canada",
    "Contact_no": "+1234567890",
    "Email": "example@example.com",
    "Address": "123 Example St, Example City, EX 12345",
    "BloodGroup": "O+",
    "Genotype": "AA",
    "DateOfBirth": "01/01/1990",
    "PastSurgicalHistory": "No",
    "ChronicConditions": "None"
  }'
```
---

## Responses

| HTTP Code | Meaning        | Body (JSON)                                                         | When Returned                                    |
|-----------|----------------|---------------------------------------------------------------------|--------------------------------------------------|
| **200**   | OK             | `{ "message": "Profile setup successfully", "data": { … } }`       | Profile saved / updated                          |
| **401**   | Unauthorized   | `{ "message": "Token expired" }`                                   | Token missing / expired / invalid                |
| **404**   | Not Found      | `{ "message": "User not found" }`                                  | `Email` in body does not match any account       |
| **400**   | Bad Request    | `{ "message": "Invalid or missing fields" }`                       | Required field absent or enum value invalid      |
| **500**   | Server Error   | `{ "message": "Error saving profile" }`                            | Unexpected server/database failure               |

### Example Success (200)

```json
{
  "message": "Profile setup successfully",
  "data": {
    "image": "https://example.com/image.jpg",
    "Sex": "female",
    "Religion": "none",
    "Nationality": "Canada",
    "Contact_no": "+1234567890",
    "Email": "example@example.com",
    "Address": "123 Example St, Example City, EX 12345",
    "BloodGroup": "O+",
    "Genotype": "AA",
    "DateOfBirth": "01/01/1990",
    "PastSurgicalHistory": "No",
    "ChronicConditions": "None"
  }
}
```

---

### Validation & Tips

- **Bearer token required:** Copy the JWT from the login response and include it in the `Authorization` header.  
- `Email` must match the account’s primary e‑mail; otherwise the request fails with **404 Not Found**.  
- Enumerated fields (`Sex`, `BloodGroup`, etc.) are **case‑sensitive**; invalid values trigger **400 Bad Request**.  
- Store media securely; use HTTPS URLs for `image`.  
- Tokens typically expire after a set period—refresh or re‑login before retrying requests.  
- Use **HTTPS** in production to protect personal health information (PHI).
