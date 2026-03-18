# backend/main.py
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, Dict

app = FastAPI()

# Allow the frontend origin(s) to call this API.
# In production, set FRONTEND_ORIGINS to a comma-separated list like:
#   https://myapp.netlify.app,https://mycustomdomain.com
# Defaults to allowing all origins (useful for single-container deployment).
frontend_origins = os.environ.get("FRONTEND_ORIGINS", "*")
allow_origins = [o.strip() for o in frontend_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnatomyInfo(BaseModel):
    label: str
    function: str
    bloodSupply: Optional[str] = None
    innervation: Optional[str] = None

# EXACT mesh names from Z_Anatomy_All_Mesh_Names.csv [file:518]
ANATOMY_DB: Dict[str, AnatomyInfo] = {
    "Supraspinatus_muscle.l_Generated_Mesh_From_X3D.170": AnatomyInfo(
        label="Left supraspinatus muscle",
        function="Abducts the arm at the shoulder, especially the first 15 degrees.",
        bloodSupply="Suprascapular artery",
        innervation="Suprascapular nerve (C5–C6)",
    ),
    "Supraspinatus_muscle.r_Generated_Mesh_From_X3D.170": AnatomyInfo(
        label="Right supraspinatus muscle",
        function="Abducts the arm at the shoulder, especially the first 15 degrees.",
        bloodSupply="Suprascapular artery",
        innervation="Suprascapular nerve (C5–C6)",
    ),
    "IntervertebraldiscL4-L5Generated_Mesh_From_X3D.088": AnatomyInfo(
        label="L4–L5 intervertebral disc",
        function="Cushions and allows movement between L4 and L5 vertebrae.",
        bloodSupply="Segmental lumbar arteries (outer annulus)",
        innervation="Sinuvertebral nerves (outer annulus)",
    ),
}

@app.get("/anatomy/{mesh_id}", response_model=Optional[AnatomyInfo])
async def get_anatomy(mesh_id: str):
    return ANATOMY_DB.get(mesh_id)

# Serve the built frontend (Vite `dist/`) when available.
# This makes the container a single deployable unit (API + UI).
frontend_dist = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
if os.path.isdir(frontend_dist):
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")
