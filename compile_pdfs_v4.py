import os
import requests
import fitz

def download_pdf(url):
    try:
        r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=5)
        if r.status_code == 200 and b'%PDF' in r.content:
            return r.content
    except Exception as e:
        pass
    return None

os.makedirs("pdfs", exist_ok=True)

# Strictly 2017-2019 (Skipping 2019SU entirely, it never splits into A/B/C/W)
semesters = ["2019SP", "2018FA", "2018SP", "2017FA", "2017SP"]

mcq_suffs = ["W", "B"]
frq_suffs = ["C", "A"]

def compile_category(unit_str, out_name, suffixes, is_sol):
    compiled_doc = fitz.open()
    found_any = False
    
    for sem in semesters:
        for suf in suffixes:
            if is_sol:
                url = f"http://jacobprabhu.com/cs173/CS_173_{sem}_examlet{unit_str}{suf}-sol.pdf"
            else:
                url = f"http://jacobprabhu.com/cs173/CS_173_{sem}_examlet{unit_str}{suf}.pdf"

            print(f"  Trying {url} ...", end="")
            content = download_pdf(url)
            if content:
                print(" SUCCESS!")
                doc = fitz.open("pdf", content)
                compiled_doc.insert_pdf(doc)
                found_any = True
                break # Move to next semester, don't double dip W and B
            else:
                print(" failed.")
    
    if found_any:
        compiled_doc.save(out_name)
        print(f"[*] Saved {out_name}")
    else:
        print(f"[!] No valid PDFs found for {out_name}.")
        
# Process Units 1-12 uniformly
for i in range(1, 13):
    unit_str = f"{i:02d}"
    print(f"--- Processing Unit {i} ---")
    compile_category(unit_str, f"pdfs/unit{i}_mcq.pdf", mcq_suffs, False)
    compile_category(unit_str, f"pdfs/unit{i}_frq.pdf", frq_suffs, False)
    compile_category(unit_str, f"pdfs/unit{i}_mcq_sol.pdf", mcq_suffs, True)
    compile_category(unit_str, f"pdfs/unit{i}_frq_sol.pdf", frq_suffs, True)
