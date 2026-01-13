"""
The project will deploy a python script containing the Gemini API. 
Vercel is deployed via front end with a react base.
Each pdf file is read in a concise and clean manner
A fastAPI implementation will be contained and documented below 

"""

"**TESTING BACKEND IMPLEMENTATION FIRST**"

from fastapi import FastAPI, UploadFile, File, HTTPException 
from google import genai
from pypdf import PdfReader
from pdfminer.high_level import extract_text as fallback_text_extraction
import os 
import uuid

app = FastAPI()

UPLOAD_DIR = "uploads" 


# api key 
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
os.makedirs(UPLOAD_DIR, exist_ok=True)

# pdf extraction and parsing into txt format
def pdf_extraction(path: str):
    reader = PdfReader(path)
    text = ""
    try:
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
        return text.strip()
    except ValueError as exc:
        text = fallback_text_extraction(path)
        return text.strip()
    

# upload file with this function 
@app.post("/upload")
async def pdf_reader_upload(file: UploadFile = File()):  
    
    # save files to path
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}.pdf")

    # open the file and write the content paths 
    with open(file_path, "wb") as f:
        content = (await file.read())
        if not content:
                raise HTTPException(status_code=400, detail="Uploaded file is empty")
        f.write(content)

    # extraction of the text from pdf_extraction function passing through LLM
    pdf_text = pdf_extraction(file_path)

    # read the pdf file content 
    if not pdf_text:
        return {"error": "Could not extract text from PDF"}
    
    # throws error is api call is not valid
    try:
        response = client.models.generate_content(
        model="gemini-2.5-flash", contents = f""" You are a sophisticated model designed to summarize, deduce, and breakdown a pdf.
        You need to summarize the contents and give the user key ideas in the pdf. 
        Read the pdf and provide a brief and short explanation to the user. 
        
        PDF content: {pdf_text[:12000]} """)

        summary = response.text
    except Exception as e:
        raise HTTPException (status_code = 500, detail=f"fatal api crash {e}")


    # return JSON status of summary and print result 
    return {
            "status": "success",
            "filename": file.filename,
            "summary": summary,
            "text_length": len(pdf_text),
        }


@app.get("/")
async def root():
    return {"message": "=== GEMINI is running === "}


if __name__ == "__main__":
    import uvicorn 
    uvicorn.run(app, host="0.0.0.0", port=8000)