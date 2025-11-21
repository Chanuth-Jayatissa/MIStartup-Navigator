# MIStartup Navigator

## Project summary
MIStartup Navigator is an AI-powered platform helping Michigan startup founders discover relevant grants, investors, and next-step recommendations. The platform processes onboarding data through a fine-tuned Llama model running on watsonx.ai and generates a personalized roadmap to support founder success.

---

## The issue we are hoping to solve
Michigan founders struggle to navigate a fragmented ecosystem of grants, investors, and entrepreneurial resources. Relevant information exists, but it is scattered across dozens of organizations and websites, making it especially difficult for first-time and underrepresented founders to know where to start.

---

## How our technology solution can help
AI-powered personalized guidance for Michigan founders.

---

## Our idea
MIStartup Navigator creates a single, personalized hub for Michigan founders seeking guidance. Founders begin by completing an onboarding flow that captures details such as their startup’s stage, sector, traction, funding goals, and challenges. All answers are merged into one structured onboarding text block.

This onboarding text is sent to a fine-tuned Llama model deployed on IBM watsonx.ai. The model returns structured JSON with:

- Stage classification  
- Sector/industry interpretation  
- Goals & challenges  
- Recommended grant categories  
- Recommended investor types  
- Roadmap themes and next steps  

The platform uses this structured output to:

- Rank and display the most relevant Michigan grants  
- Recommend aligned investors based on stage and sector  
- Auto-generate a roadmap of actionable tasks  
- Personalize the dashboard experience  
- Allow founders to update their profile anytime  

Today, founders must manually search across dozens of disjointed resources. MIStartup Navigator improves the process by using AI to unify and personalize support for every founder—reducing time wasted and increasing access to opportunities.

More detail is available in our description document.

---

# Technology implementation

## IBM watsonx product(s) used

### watsonx.ai
We use watsonx.ai to host and run a fine-tuned Llama model that processes the full onboarding data string. The model outputs structured JSON that powers:

- Grant matching  
- Investor matching  
- Roadmap generation  
- Founder/startup classification  

watsonx.ai is the **only IBM product** used in our solution.

---

# Solution architecture

### Solution flow

1. **User completes onboarding**  
2. **App compiles onboarding inputs into a single text string**  
3. **Backend sends this string to watsonx.ai (Llama model)**  
4. **watsonx.ai returns structured JSON**  
5. **Frontend uses JSON to:**  
   - Rank grants  
   - Rank investors  
   - Populate roadmap  
   - Customize the dashboard  
6. **Founder interacts with personalized results**

---

# Presentation materials

## Solution demo video
*Add your video link here.*

---

# Project development roadmap

### Currently implemented
- End-to-end onboarding workflow  
- watsonx.ai Llama model integration  
- Dashboard with personalized content  
- Grant finder with match scoring  
- Investor finder with match scoring  
- Roadmap generation from model output  
- Profile page  
- Authentication and protected routes  
- Mocked Michigan-focused datasets  

### In the future we plan to:
- Integrate real Michigan grant and investor datasets  
- Add ecosystem directory  
- Improve roadmap generation model prompts  
- Add notifications & deadline alerts  
- Expand multi-founder collaboration tools  

### Roadmap
(To be added after submission.)

---

# Additional details

## How to run the project
*(Replace after Bolt finalizes the stack)*

1. Clone repo  
2. Install dependencies  
3. Add environment variables (auth + watsonx)  
4. Start development server  
5. Visit local URL  

## Live demo
*Add your hosted link here.*  
Credentials included in description document if required.

