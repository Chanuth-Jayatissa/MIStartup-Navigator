# MIStartup Navigator

MIStartup Navigator is an AI-powered platform that helps Michigan startup founders discover relevant grants, investors, and next-step recommendations. Founders complete onboarding, and the app turns that information into structured guidance using a FastAPI backend and watsonx.ai-powered Llama workflow.

Live demo: https://mistartup-navigator-nek8.bolt.host/

## Features

- Founder onboarding flow for stage, traction, goals, challenges, and sector.
- AI-generated founder classification and roadmap themes.
- Grant matching and investor matching for Michigan startup resources.
- Personalized dashboard, roadmap, profile, grant, and investor pages.
- FastAPI backend for submitting onboarding data to the model workflow.
- Mock datasets for grant, investor, and roadmap demos.

## Tech Stack

- React 18 and TypeScript
- Vite
- FastAPI and Python
- watsonx.ai / Llama deployment integration
- Supabase JS integration points
- Tailwind CSS

## Project Structure

- src/pages - onboarding, dashboard, grants, investors, profile, and roadmap pages
- src/data - mock grants, investors, and roadmap data
- server/main.py - FastAPI backend and watsonx.ai request flow
- server/.env.example - backend environment example

## Getting Started

Install frontend dependencies and run the app:

~~~bash
npm install
npm run dev
~~~

Install backend dependencies and run the API:

~~~bash
pip install -r requirements.txt
uvicorn server.main:app --reload
~~~

Create server/.env from server/.env.example:

~~~bash
WATSONX_API_KEY=your_watsonx_api_key_here
~~~

## Useful Commands

~~~bash
npm run dev
npm run build
npm run lint
npm run typecheck
~~~

## Status

Hackathon/portfolio project with a working frontend flow, FastAPI backend, live demo link, and AI integration path. Future work includes replacing mock ecosystem datasets with live Michigan startup resource data.
