Overview -:


A fully managed, serverless platform for hosting static event registration portals, serving REST APIs, and storing attendee records with sub-second latency and zero server overhead.


Architecture Flow -:


Plaintext
Browser Client (React/Vite) 
   │
   ├─► CloudFront CDN ──► S3 Bucket (Static Web Assets)
   │
   └─► API Gateway (HTTP REST)
         │
         ├─► GET  /tracks             ──► Lambda (GetTrackSeats) ──► DynamoDB (TrackSeats)
         └─► POST /attendees/register ──► Lambda (RegisterUser)  ──► DynamoDB (Registrations)


  
Tech Stack -:


Frontend: React, Vite, Amazon S3, Amazon CloudFront

Backend: Amazon API Gateway, AWS Lambda (Python)

Database: Amazon DynamoDB

Security: AWS IAM (Least-privilege execution roles)



API Summary -:


GET /tracks

Function: Fetches available seats across event tracks (cloud, aiml, web3).

Response: { "tracks": [ { "trackId": "cloud", "seatsAvailable": 12 } ] }

POST /attendees/register

Function: Validates incoming payloads and writes attendee records to DynamoDB.

Body: { "name": "Jane Doe", "email": "jane@example.com", "trackId": "cloud" }

Response: { "message": "Registration successful", "registrationId": "reg-123" }




Setup Quickstart  -:



Database: Create TrackSeats (trackId PK) and HackathonRegistrations (registrationId PK) tables in DynamoDB.

Backend: Deploy get_track_seats.py and register_user.py to AWS Lambda, link them to API Gateway routes, and grant DynamoDB IAM permissions.

Frontend: Build static assets (npm run build), upload them to S3, and serve via CloudFront.
