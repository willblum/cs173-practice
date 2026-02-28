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

# Define the permutations we will try to fetch for a given unit
semesters = ["2019SP", "2018FA", "2018SP"]

categories = {
    "mcq": ["W", "B"],
    "frq": ["C", "A"],
    "solutions": ["R", "sol", "rubrics", "solution"]
}

for i in range(1, 13):
    unit_str = f"{i:02d}"
    print(f"--- Processing Unit {i} ---")
    
    if i < 12:
        for cat, suffixes in categories.items():
            compiled_doc = fitz.open()
            found_any = False
            
            for sem in semesters:
                for suffix in suffixes:
                    # Some files might just be .pdf without suffix if only 1 version exists
                    url_variants = [
                        f"http://jacobprabhu.com/cs173/CS_173_{sem}_examlet{unit_str}{suffix}.pdf",
                        f"http://jacobprabhu.com/cs173/CS_173_{sem}_examlet{unit_str}.pdf" if suffix in ["W", "A"] else None
                    ]
                    
                    for url in url_variants:
                        if not url: continue
                        print(f"  Trying {url} ...", end="")
                        content = download_pdf(url)
                        if content:
                            print(" SUCCESS!")
                            doc = fitz.open("pdf", content)
                            compiled_doc.insert_pdf(doc)
                            found_any = True
                            break # Move to next semester, don't redownload W and B for same semester
                        else:
                            print(" failed.")
                    else:
                        continue
                    break # if found for this semester, break outer suffix loop
            
            if found_any:
                out_name = f"pdfs/unit{i}_{cat}_compiled.pdf"
                compiled_doc.save(out_name)
                print(f"[*] Saved {out_name}")
            else:
                print(f"[!] No PDFs found for unit {i} {cat}")
    else:
        # Unit 12 is the final
        print("  Handling Unit 12 (Final)...")
        for cat in ["mcq", "frq"]: # Combines exam into both since Final is mixed
            compiled_doc = fitz.open()
            for sem in semesters:
                for url in [f"http://jacobprabhu.com/cs173/CS_173_{sem}_final.pdf"]:
                    print(f"  Trying {url} ...", end="")
                    content = download_pdf(url)
                    if content:
                        print(" SUCCESS!")
                        doc = fitz.open("pdf", content)
                        compiled_doc.insert_pdf(doc)
                        break
                    else:
                        print(" failed.")
            out_name = f"pdfs/unit12_{cat}_compiled.pdf"
            if len(compiled_doc) > 0:
                compiled_doc.save(out_name)
                print(f"[*] Saved {out_name}")
                
        # Solutions for final
        compiled_sol = fitz.open()
        for sem in semesters:
            for url in [f"http://jacobprabhu.com/cs173/CS_173_{sem}_final_sol.pdf", f"http://jacobprabhu.com/cs173/CS_173_{sem}_finalR.pdf", f"http://jacobprabhu.com/cs173/CS_173_{sem}_final.pdf"]:
                print(f"  Trying {url} ...", end="")
                content = download_pdf(url)
                if content:
                    print(" SUCCESS!")
                    doc = fitz.open("pdf", content)
                    compiled_sol.insert_pdf(doc)
                    break
                else:
                    print(" failed.")
        if len(compiled_sol) > 0:
            out_name = f"pdfs/unit12_solutions_compiled.pdf"
            compiled_sol.save(out_name)
            print(f"[*] Saved {out_name}")
