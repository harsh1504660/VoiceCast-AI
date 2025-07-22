# 🎙️ AI-Powered Podcast Generator

An AI-powered system that generates engaging **audio and video podcasts** based on user-provided topics. Features include automated **avatar-based video generation with lip sync**, **dynamic thumbnail generation**, and a **centralized global podcast feed**.

🔗 **Live Demo / GitHub Repo**: [VoiceCast AI](https://voicecast-ai.netlify.app/)
---

## 🚀 Features

- 🎧 Generates podcast episodes from text prompts
- 🧠 Uses AI avatars with realistic lip-sync (via Heygen API)
- 📸 Auto-generates thumbnails based on the topic
- 🗃️ Stores 1000+ user requests and podcast data in Supabase (PostgreSQL)
- ⚡ Fast response time (<2s) from topic input to podcast output
- 🌍 Global podcast feed accessible via frontend

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- FastAPI
- PostgreSQL (via Supabase)
- SQLAlchemy
- Heygen API (for avatar videos)
- Text-to-Speech API (for audio)

### DevOps / Others
- Supabase for DB & auth
- Python (async + multiprocessing)
- FFmpeg (for media handling)

---

## 🧩 Architecture Overview

```mermaid
graph TD
  A[User Input Topic] --> B[FastAPI Backend]
  B --> C[Generate Podcast Script using AI]
  C --> D1[Text-to-Speech Audio]
  C --> D2[Heygen Avatar Video]
  C --> D3[Thumbnail Generator]
  D1 & D2 & D3 --> E[Final Podcast Episode]
  E --> F[Frontend Feed & Database Storage]