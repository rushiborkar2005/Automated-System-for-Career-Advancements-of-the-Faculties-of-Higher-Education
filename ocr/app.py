import os
from flask import Flask, request, jsonify
import PyPDF2 as pdf
import google.generativeai as genai
from dotenv import load_dotenv
from flask_cors import CORS
import pytesseract
import pdf2image
from pdf2image import convert_from_path
from werkzeug.utils import secure_filename
pdf2image.poppler_path = r'"C:/poppler-24.08.0/Library/bin"'

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = Flask(__name__)
CORS(app) 
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=10000, debug=True)

def get_gemini_response(text):
    
    prompt = f"""
    Please extract the following details from the resume text: 
    Full Name,Mother Name,stream,percentage. 
    Return the data in the following format:
    Full Name: [Name]
    MOTHER NAME: [Mother Name]
    Stream: [stream]
    Percentage: [percentage]
   
    
    Here is the marksheet text:
    {text}
    """
    
    # Calling Gemini model
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text


pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  # Update this path on Windows

def extract_pdf_text_with_ocr(pdf_file, temp_image_folder="temp_images"):
    text = ""

    # Create a temporary folder to store images
    os.makedirs(temp_image_folder, exist_ok=True)
    
    # Save the uploaded PDF to a temporary location
    temp_pdf_path = os.path.join(temp_image_folder, secure_filename(pdf_file.filename))
    pdf_file.save(temp_pdf_path)
    
    try:
        # Convert PDF pages to images
        images = convert_from_path(temp_pdf_path, dpi=300, output_folder=temp_image_folder)
        print(f"Converted {len(images)} pages to images.")

        for page_number, image in enumerate(images):
            # Perform OCR on each image
            page_text = pytesseract.image_to_string(image, lang='eng')  # Use 'lang' for language-specific OCR
            text += f"--- Page {page_number + 1} ---\n{page_text}\n"
            print(f"OCR completed for page {page_number + 1}")
    
    finally:
        # Clean up the temporary images
        for file in os.listdir(temp_image_folder):
            os.remove(os.path.join(temp_image_folder, file))
        os.rmdir(temp_image_folder)

    return text

def extract_pdf_text(file):
    reader = pdf.PdfReader(file)
    text = ""
    for page in range(len(reader.pages)):
        text += reader.pages[page].extract_text()
    print('text')
    return text

@app.route("/process", methods=["POST"])
def process_pdf():
    if 'pdf_doc' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['pdf_doc']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
    
        extracted_text = extract_pdf_text_with_ocr(file)
        print(extracted_text)
        response_text = get_gemini_response(extracted_text)

        data = parse_gemini_response(response_text)

        return jsonify(data)

    return jsonify({"error": "File upload failed"}), 500

def parse_gemini_response(response_text):
    data = {
        'fullName': '',
        'mother': '',
        'stream': '',
        'percentage': '',
    }

    for line in response_text.splitlines():
        if 'Full Name:' in line:
            data['fullName'] = line.split('Full Name:')[1].strip()
        elif 'Email:' in line:
            data['mother'] = line.split('MOTHER NAME:')[1].strip()
        elif 'Phone:' in line:
            data['stream'] = line.split('Stream:')[1].strip()
        elif 'Skills:' in line:
            data['percentage'] = line.split('Percentage:')[1].strip()

    return data

if __name__ == "__main__":
    app.run(port=8000, debug=True)