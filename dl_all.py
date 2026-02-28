import urllib.request
import urllib.error
import fitz
import os

for i in range(3, 13):
    unit_str = f"{i:02d}"
    url = f"http://jacobprabhu.com/cs173/CS_173_2019SU_examlet{unit_str}.pdf"
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        pdf_data = urllib.request.urlopen(req).read()
        print(f"Downloaded SU2019 Examlet {i}")
        
        pdf_path = f"t_{i}.pdf"
        with open(pdf_path, 'wb') as f:
            f.write(pdf_data)
            
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
            
        with open(f"data/raw{i}.txt", "w", encoding="utf-8") as f:
            f.write(text)
            
    except urllib.error.HTTPError as e:
        print(f"SU2019 Examlet {i} not found: {e}. Trying SP2019...")
        url2 = f"http://jacobprabhu.com/cs173/CS_173_2019SP_examlet{unit_str}A.pdf"
        if i == 12: 
             url2 = "http://jacobprabhu.com/cs173/CS_173_2019SP_final.pdf"
        req = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            pdf_data = urllib.request.urlopen(req).read()
            pdf_path = f"t_{i}.pdf"
            with open(pdf_path, 'wb') as f:
                f.write(pdf_data)
            doc = fitz.open(pdf_path)
            text = ""
            for page in doc:
                text += page.get_text()
            with open(f"data/raw{i}.txt", "w", encoding="utf-8") as f:
                f.write(text)
            print(f"Downloaded SP2019 Examlet {i}")
        except Exception as e2:
             print(f"Also failed SP2019 {i}: {e2}")
