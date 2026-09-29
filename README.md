# WISDOM — Well Intelligence & Drilling Operations Memory
### An AI-Powered Offset Well Knowledge and Decision Support Platform for Oil India Limited (eRTMAC-NWIS)

[![Status](https://img.shields.io/badge/Status-Prototype%20v2.4-brightgreen.svg)](#)
[![Theme](https://img.shields.io/badge/Theme-Smart%20India%20Hackathon%20(SIH)-orange.svg)](#)
[![Domain](https://img.shields.io/badge/Domain-Oil%20%26%20Gas%20%2F%20Upstream%20Drilling-blue.svg)](#)

---

## 🌟 Overview
**WISDOM** is an AI-powered institutional memory and decision-support platform designed to operate alongside Oil India Limited's **eRTMAC (Real-Time Monitoring and Control)** system. 

It solves the critical operational challenge where historical drilling experience (mud losses, stuck pipe events, kicks, fishing operations, casing programs, and NPT mitigations) is fragmented across hundreds of legacy Well Completion Reports (WCRs) and Daily Drilling Reports (DDRs).

---

## 🚀 Key Modules & Capabilities

1. **🗺️ Geospatial Offset Exploration (GIS Map)**
   - Interactive Leaflet map centered on Upper Assam Oilfields (Naharkatiya, Moran, Duliajan, Digboi, Jorajan, Kusijan).
   - Dynamic query radius slider (1 km to 25 km) to discover offset wells in the same geological block.
   - Color-coded risk indicators and well trajectory inspection.

2. **⚠️ Look-Ahead Proactive Depth Alert Engine**
   - Real-time bit depth simulator with **Auto-Drill** capability.
   - Proactive depth alert triggers when bit approaches within $\pm 150\text{ m}$ of known offset hazards (e.g., Barail coal seam mud loss at 2,912m).
   - Instant mitigation Standard Operating Procedures (SOPs) and mud weight recommendations.

3. **📊 Stratigraphic & Well Log Correlation**
   - Side-by-side TVD/MD alignment of Active Well vs 3 Offset Wells.
   - Synchronized Gamma Ray, Resistivity, and Mud Weight log curves.
   - Automatic formation tops matching across Girujan, Tipam, Barail, and Kopili horizons.

4. **🧠 Grounded AI Knowledge RAG Assistant**
   - Conversational AI powered by Retrieval-Augmented Generation (RAG).
   - 100% verifiable citations directly referencing Oil India historical report sections (WCRs, DDRs).

5. **📈 AI Predictive Risk Modeling**
   - Machine learning risk probability gauges for:
     - Lost Circulation / Mud Loss Probability
     - Differential Sticking Index
     - Gas Influx / Kick Probability
     - Wellbore Instability Index
   - Continuous multi-risk vs depth profile and pore/fracture pressure window curves.

6. **📋 Historical NPT & Operational Incidents Matrix**
   - Structured, searchable database of historical failure modes, root causes, NPT hours lost, and resolution actions.

7. **📄 Multi-Modal Document & OCR Ingestion Pipeline**
   - Ingestion workflow for legacy scanned PDFs, mud logging sheets, and lithology tables.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Custom Dark Theme Energy Design System), Vanilla JavaScript, Leaflet.js, Chart.js, Lucide Icons.
- **Backend Architecture:** Python FastAPI, Uvicorn, Asynchronous REST & WebSockets.
- **Databases:** PostgreSQL + PostGIS (Geospatial), TimescaleDB (eRTMAC time-series telemetry), ChromaDB / pgvector (Vector Embeddings).
- **AI & NLP:** LangChain / LlamaIndex, Google Gemini API, PaddleOCR / Docling, Scikit-learn, XGBoost.

---

## 💻 Quick Start / Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/ananditaa2/SIH_TheOutliers.git
   cd SIH_TheOutliers
   ```
2. Open `index.html` directly in any web browser, or launch a local HTTP server:
   ```bash
   python -m http.server 3000
   ```
3. Open `http://localhost:3000` in your browser.

---

## 👥 Team
- **Team Name:** The Outliers
- **Hackathon:** Smart India Hackathon (SIH)
