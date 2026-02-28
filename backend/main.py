import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # <--- AJOUTE ÇA
import google.generativeai as genai
from dotenv import load_dotenv

# Charge le fichier .env
load_dotenv()

app = FastAPI()

# --- AJOUTE CE BLOC DE SÉCURITÉ ICI ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Autorise ton fichier HTML à poser des questions
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# --------------------------------------

# Récupération sécurisée de la clé
API_KEY = os.getenv("GEMINI_API_KEY")

if API_KEY:
    genai.configure(api_key=API_KEY)
else:
    print("❌ ERREUR : La clé n'est pas lue. Vérifie le fichier .env")

# Ton modèle qui marche super bien
model = genai.GenerativeModel('gemini-3-flash-preview')

@app.get("/")
def home():
    return {"statut": "En ligne", "message": "Tuteur prêt !"}

@app.get("/ask")
def ask_ia(prompt: str):
    try:
        print(f"Envoi de la question : {prompt}")
        # On peut rajouter une petite instruction système ici pour le rôle de tuteur
        response = model.generate_content(f"Réponds en tant que tuteur bienveillant : {prompt}")
        return {"reponse": response.text}
    except Exception as e:
        return {"erreur": str(e)}

# On garde ça, c'est utile pour débugger au cas où
@app.get("/test-modeles")
def test_models():
    try:
        models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
        return {"modeles_disponibles": models}
    except Exception as e:
        return {"erreur": str(e)}