### MIStartup Navigator

### Project summary
- MIStartup Navigator is an AI-powered platform that helps Michigan startup founders discover relevant grants, investors, and next-step recommendations.
- The platform uses a fine-tuned Llama model on watsonx.ai to analyze onboarding data and generate a personalized roadmap.

### The issue we are hoping to solve
- Michigan founders struggle with a fragmented ecosystem of grants, investors, and entrepreneurial support.
- Information is scattered across agencies and websites, making it especially difficult for first-time and underrepresented founders.

### How our technology solution can help
- AI-powered personalized guidance for Michigan founders.

### Our idea
- MIStartup Navigator centralizes Michigan entrepreneurial resources into one personalized hub.
- Founders complete onboarding covering stage, traction, goals, challenges, and sector.
- All onboarding responses are merged into one text block and sent to a fine-tuned Llama model on watsonx.ai.
- The model returns structured JSON including:
  - Stage classification  
  - Sector classification  
  - Goals and challenges  
  - Recommended grant categories  
  - Recommended investor types  
  - Roadmap themes  
- The frontend uses the JSON to:
  - Rank relevant Michigan grants  
  - Suggest aligned investors  
  - Generate an AI-based roadmap  
  - Personalize dashboard and profile insights  

---

### Technology implementation

### IBM watsonx product(s) used
- **watsonx.ai**
  - Hosts a fine-tuned Llama model.
  - Processes the onboarding text block.
  - Returns structured JSON that powers grant matching, investor matching, roadmap generation, and founder classification.

---

### Application Tech Stack (Frontend)

- React 18.3.1  
- TypeScript 5.9.3  
- Vite 5.4.21  
- React Router DOM 7.9.6  
- Tailwind CSS 3.4.1  
- PostCSS 8.4.35  
- Autoprefixer 10.4.18  
- Lucide React 0.344.0  
- ESLint / TypeScript ESLint  
- Vite Plugin React  
- ES Modules build output via Vite

### Application Tech Stack (Backend)
- FastAPI (Python)  
- Uvicorn  
- Pydantic  
- httpx / requests  
- Backend handles:
  - Building onboarding text block  
  - Calling watsonx.ai  
  - Parsing JSON  
  - Running matching logic  
  - Returning structured data to frontend  

---

### Solution architecture
- User completes onboarding in frontend.
- Frontend compiles responses into one structured text block.
- FastAPI backend receives the text and sends it to watsonx.ai.
- Llama model returns structured JSON.
- Backend processes JSON and performs matching logic.
- Frontend displays:
  - Grant matches  
  - Investor matches  
  - Roadmap  
  - Dashboard insights  

---

### Presentation materials
- Solution demo video: *Add link here*

---

### Project development roadmap

### Currently implemented
- End-to-end onboarding workflow  
- FastAPI backend  
- watsonx.ai Llama model integration  
- Dashboard with personalized results  
- Grant finder  
- Investor finder  
- Roadmap generation  
- Profile page  
- Authentication + protected routes  
- Mock datasets  

### In the future we plan to:
- Integrate real Michigan grant & investor datasets  
- Add ecosystem directory  
- Improve roadmap prompts  
- Add deadline alerts & notifications  
- Build multi-founder collaboration  

### Roadmap
- To be added after submission.

---

### Additional details

### How to run the project

#### Frontend
- `npm install`
- `npm run dev`

#### Backend
- `pip install -r requirements.txt`
- `uvicorn main:app --reload`

#### Environment variables required
- watsonx.ai credentials  
- Backend API URL  
- Authentication secrets  

### Live demo
[- *Add deployed link here*](https://mistartup-navigator-nek8.bolt.host/)
