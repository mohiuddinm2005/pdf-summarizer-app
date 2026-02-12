"""
The project will deploy a python script containing the Gemini API. 
Each pdf file is read in a concise and clean manner
A fastAPI implementation will be contained and documented below 

"""

"**FLASH API NAME OF PRODUCT**"

from fastapi import FastAPI, UploadFile, File, HTTPException 
from google import genai
from pypdf import PdfReader
from pdfminer.high_level import extract_text as fallback_text_extraction
import os 
import uuid
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["http://localhost:3000"]

# bridge for fastAPI frontend validation
app.add_middleware(
    CORSMiddleware,     # need railway app to host 
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

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
    
    
# cleans PDF after file processing is over    
def pdf_cleanup(file_path: str):
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
        except Exception as e:
            return f"warning could not find file path {e}"



""" uploads file to gemini API, returns file in JSON format """
@app.post("/upload")
async def pdf_reader_upload(file: UploadFile = File(...)):  
    try:
        # save files to path
        file_id = str(uuid.uuid4())
        file_path = os.path.join(UPLOAD_DIR, f"{file_id}.pdf")

        # open the file and write the content paths 
        with open(file_path, "wb") as f:
            content = (await file.read())
            if not content:
                    raise HTTPException(status_code = 400, detail = "Uploaded file is empty")
            f.write(content)

        # extraction of the text from pdf_extraction function passing through LLM
        pdf_text = pdf_extraction(file_path)

        # catches if pdf text is not extractable 
        if not pdf_text:
            raise HTTPException(status_code=422, detail="cannot extract PDF text")
        
        # throws error if api call is not valid
        response = client.models.generate_content(
        model="gemini-2.5-flash", contents = f""" You are a sophisticated model designed to summarize, deduce, and breakdown a pdf. 
        Analyze this PDF and provide:

        1. A concise summary (2-3 paragraphs)
        2. Key topics and main ideas
        3. Important takeaways

        PDF content: {pdf_text[:15000]} """)

        summary = response.text
        # return JSON status of summary and print result 
        return {
                "status": "success",
                "filename": file.filename,
                "summary": summary,
                "text_length": len(pdf_text),
            }
    except Exception as e:
                raise HTTPException (status_code = 500, detail=f"Gemini API fatal error {e}")
    finally:
            pdf_cleanup(file_path)
                


@app.get("/")
async def root():
    return {"message": "=== GEMINI is running === ",
            "Status": "Healthy"
    }
@app.get("/health")
async def check_health():
    """Checking health checkpoint endpoint"""
    return {
         "status:": "healthy",
         "service": "Flash PDF summarizer app"
    }

if __name__ == "__main__":
    import uvicorn 
    uvicorn.run(app, host="0.0.0.0", port=8000)