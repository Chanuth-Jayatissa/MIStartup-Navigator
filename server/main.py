from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import Optional
import requests
import os

load_dotenv()

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://mistartup-navigator-nek8.bolt.host"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class OnboardingRequest(BaseModel):
    data: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the backend API"}

@app.post("/onboarding")
def onboarding(request: OnboardingRequest):
    try:
        API_KEY = "RVUxmsPhrw0q5ke_k92_spi7rx3lAfcTavT3hUT7LqN5"
        token_response = requests.post('https://iam.cloud.ibm.com/identity/token', data={"apikey": API_KEY, "grant_type": 'urn:ibm:params:oauth:grant-type:apikey'})
        mltoken = token_response.json()["access_token"]

        header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mltoken}

        prompt = request.data

        # NOTE:  manually define and pass the array(s) of values to be scored in the next line
        payload_scoring = {"messages":[{"role":"user","content":prompt}]}


        response_scoring = requests.post('https://us-south.ml.cloud.ibm.com/ml/v4/deployments/ad4ce828-77fb-4905-94c2-930560b54589/ai_service?version=2021-05-01', json=payload_scoring,
        headers={'Authorization': 'Bearer ' + mltoken})

        print("Scoring response")
        try:
            print(response_scoring.json())
        except ValueError:
            print(response_scoring.text)
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
        return {"message": "Onboarding request received", "data": request.data}
    except Exception as e:
        return {"message": "An unexpected error occurred", "error": str(e)}
    print(response_scoring.json())