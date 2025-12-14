# AI Resume Analyzer & ATS Optimizer

A **full-stack AI application** that analyzes resumes against job descriptions, computes semantic similarity, and generates ATS-optimized resume improvements using large language models. The system presents results through a modern web UI with a side-by-side comparison of improved resume text and its LaTeX source.

---

## 🚀 Live Demo

- **Frontend**: https://693e9323af115fde646bbcc6--voluble-concha-f6949c.netlify.app
- **Backend API**: https://resume-screening-re.onrender.com

> ℹ️ Repositories are kept private. Code can be shared on request.

---

## 🎯 Problem Statement

Most candidates struggle to tailor their resumes for specific job descriptions and Applicant Tracking Systems (ATS).  
Manual optimization is time-consuming, inconsistent, and often ineffective.

This project solves that by:
- Automatically evaluating resume–JD compatibility
- Identifying missing or weak skills
- Rewriting resumes in an ATS-aligned manner
- Providing both human-readable output and LaTeX source for further customization

---

## ✨ Key Features

- 📄 **Resume Parsing** — Upload PDF/DOCX resumes and extract clean text
- 📝 **Job Description Analysis** — Normalize and process JD input
- 🔍 **Semantic Similarity Scoring** — Embedding-based resume ↔ JD matching
- 🤖 **LLM-Powered Resume Optimization** — Skill gap analysis and rewrite
- 📊 **Score Comparison** — Before vs after improvement scores
- 🧩 **Split View UI** — Side-by-side improved resume text and LaTeX source
- 📋 **One-Click Copy** — Copy resume text or LaTeX instantly
- ☁️ **Cloud Deployed** — Backend and frontend deployed on cloud platforms

---


---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Modern CSS (custom design system)
- Deployed on Netlify

### Backend
- FastAPI
- Python
- Google Gemini API (Embeddings + LLM)
- Pydantic (schema validation)
- Docker
- Deployed on Render

---

## 🔬 How It Works

1. **Resume Upload**
   - User uploads a PDF or DOCX resume
   - Backend extracts and cleans text

2. **Job Description Input**
   - User provides a job description
   - Text is normalized for analysis

3. **Similarity Scoring**
   - Resume and JD are converted into embeddings
   - Cosine similarity is computed (0–100 score)

4. **Resume Improvement**
   - LLM identifies missing skills and weak sections
   - Resume is rewritten to better align with the JD
   - Improvements avoid hallucinating experience

5. **Result Presentation**
   - Original vs improved scores are shown
   - Improved resume text and LaTeX source are displayed side by side

---

## 🧠 Design Considerations

- **Deterministic First**: Similarity scoring is embedding-based, not prompt-based
- **Structured LLM Output**: All LLM responses follow strict JSON schemas
- **Safety & Reliability**:
  - Input truncation
  - Retry logic for LLM calls
  - Schema validation
- **Developer-Friendly Output**:
  - LaTeX source enables easy editing or Overleaf usage
- **Production-Oriented**:
  - Dockerized backend
  - Environment-variable based secrets
  - CORS-safe API design

---

## 🔐 Security & Configuration

- API keys are stored securely as environment variables
- No secrets are committed to the repository
- Frontend does not expose any sensitive credentials




