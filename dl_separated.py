import urllib.request
import os
import fitz

def download_and_extract(url, out_txt):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        pdf_data = urllib.request.urlopen(req).read()
        pdf_path = "temp.pdf"
        with open(pdf_path, 'wb') as f:
            f.write(pdf_data)
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        with open(out_txt, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Success: {out_txt}")
    except Exception as e:
        print(f"Failed {url}: {e}")

os.makedirs("data/sp2019", exist_ok=True)

# Units 1-11 have SP2019 versions.
for i in range(1, 12):
    unit_str = f"{i:02d}"
    
    # MCQ: White sheet (W)
    mcq_url = f"http://jacobprabhu.com/cs173/CS_173_2019SP_examlet{unit_str}W.pdf"
    if i == 5:
        mcq_url = f"http://jacobprabhu.com/cs173/CS_173_2018SP_examlet{unit_str}.pdf" # 5 only has 1 version in SP18
    elif i == 8:
        mcq_url = f"http://jacobprabhu.com/cs173/CS_173_2018FA_examlet{unit_str}B.pdf" # fallback to FA18 B sheet if missing
        
    download_and_extract(mcq_url, f"data/sp2019/unit{i}_mcq_raw.txt")
    
    # FRQ: Colored sheet (C) or A sheet
    frq_url = f"http://jacobprabhu.com/cs173/CS_173_2019SP_examlet{unit_str}C.pdf"
    if i == 5:
        frq_url = f"http://jacobprabhu.com/cs173/CS_173_2018FA_examlet{unit_str}A.pdf"
    
    download_and_extract(frq_url, f"data/sp2019/unit{i}_frq_raw.txt")

# Unit 12 is the final exam
download_and_extract("http://jacobprabhu.com/cs173/CS_173_2019SP_final.pdf", "data/sp2019/unit12_raw.txt")
