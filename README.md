# Talking Head App

This project generates realistic talking head videos by combining text-to-speech and face images.

## Overview

- **Frontend:** React  
  - User inputs text  
  - Selects a voice (via ElevenLabs)  
  - Uploads an image (face detection required)  
  - Generates audio and sends to backend  
  - Polls video status until ready  

- **Backend:** Node.js + Express  
  - Provides ElevenLabs voices  
  - Converts text to audio (via ElevenLabs)  
  - Uploads images to Cloudinary (D-ID requires a public URL)  
  - Calls D-ID API to generate talking head video  
  - Exposes APIs for frontend to interact with  

## Features

- Face validation before generating video  
- Audio generation via ElevenLabs  
- Cloudinary integration for image hosting  
- D-ID video generation with polling support  
- React frontend with loader, error states, and video preview  

## Tech Stack

- **Frontend:** React, MUI, React Hooks  
- **Backend:** Node.js, Express, Cloudinary SDK, ElevenLabs API, D-ID API  

## Getting Started

1. Clone repo & install dependencies  
   npm install
   cd frontend && npm install

## Add required environment variables for BE:

- PORT = 3000
- ELEVEN_LABS_API_KAY = your_key
- HF_TOKEN =  your_key
- HF_SPACE_ID = your_key
- DID_API_KEY= your_key
- CLOUDINARY_CLOUD_NAME= your_name
- CLOUDINARY_API_KEY= your_key
- CLOUDINARY_API_SECRET= your_secret
- CLOUDINARY_URL= your_cloudinary_url
