Setup and run the backend (fastapi)
=================================

Create a virtual environment, activate it, and install dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

Run the API server from the `backend` directory:

```bash
uvicorn main:app --reload --port 8000
```

Tips for VS Code:
- Select the interpreter from `.venv` so the editor can resolve imports.
- Install the Python extension for linting and IntelliSense.
