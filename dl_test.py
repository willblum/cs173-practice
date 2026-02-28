import urllib.request
import os

req = urllib.request.Request(
    'http://jacobprabhu.com/cs173/CS_173_2019SU_examlet03.pdf', 
    headers={'User-Agent': 'Mozilla/5.0'}
)
try:
    pdf_data = urllib.request.urlopen(req).read()
    with open('c:\\Users\\wildc\\OneDrive\\cs173-practice\\test03.pdf', 'wb') as f:
        f.write(pdf_data)
    print("Downloaded test03.pdf")
except Exception as e:
    print(f"Error: {e}")

try:
    import PyPDF2
    print("PyPDF2 is installed")
except ImportError:
    print("PyPDF2 is NOT installed")

try:
    import pdfplumber
    print("pdfplumber is installed")
except ImportError:
    print("pdfplumber is NOT installed")
    
try:
    import fitz
    print("PyMuPDF (fitz) is installed")
except ImportError:
    print("PyMuPDF is NOT installed")
