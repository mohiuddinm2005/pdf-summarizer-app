"""
The project will deploy a python script containing the Gemini API. 
Vercel is deployed via front end with a react base.
Each pdf file is read in a concise and clean manner
A fastAPI implementation will be contained and documented below 

"""

"**TESTING BACKEND IMPLEMENTATION FIRST**"

from fastapi import FastAPI, UploadFile, File
from google import genai
from pypdf import PdfReader
from pdfminer.high_level import extract_text as fallback_text_extraction
import os 
import base64
import uuid

app = FastAPI()

UPLOAD_DIR = "uploads" 


# api key 
client = genai.Client(os.getenv("GENAI_API_KEY"))
os.makedirs(UPLOAD_DIR, exist_ok=True)

# pdf extraction and parsing into txt format
def pdf_extraction(path: str):
    reader = PdfReader(path)
    text = ""
    try:
        for page in reader.pages:
            text += page.extract_text()
        return text.strip()
    except ValueError as exc:
        text = fallback_text_extraction(path)
    

# upload file with this function 
@app.post("/upload")
async def pdf_reader_upload(UploadFile = File()):  
    
    # save files to path
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}.pdf")

    with open(file_path, "wb") as f:
        f.write(await file.read())

    # extraction of the text from pdf_extraction function passing through LLM
    pdf_text = pdf_extraction(file_path)

    # read the pdf file content 
    if not pdf_text:
        return {"error": "Could not extract text from PDF"}
    

    response = client.models.generate_content(
    model="gemini-2.5-flash", contents = f""" You are a sophisticated model designed to summarize, deduce, and breakdown a pdf.
    You need to summarize the contents and give the user key ideas in the pdf. 
    Read the pdf and provide a brief and short explanation to the user. 
    
    PDF content: {pdf_text[:12000]} """)

    summary = response.text

    # return status of summary and print result 
    return {"status": "working on it....",
            "summary": summary}
    
    


@app.get("/")
async def root():
    return {"message": "=== pdf is scanning via API === "}


if __name__ == "__main__":
    import uvicorn 
    uvicorn.run(app, host="0.0.0.0", port=8000)