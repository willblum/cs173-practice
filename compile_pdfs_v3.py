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

# Valid semesters: SP2019, SU2019, FA2018, SP2018, FA2017, SP2017
semesters = ["2019SU", "2019SP", "2018FA", "2018SP", "2017FA", "2017SP"]

# Matrix of document targets
#   "mcq"     -> The W / B sheets
#   "frq"     -> The C / A sheets
#   "mcq_sol" -> The W-sol / B-sol sheets
#   "frq_sol" -> The C-sol / A-sol sheets

mcq_suffs = ["W", "B"]
frq_suffs = ["C", "A"]

def compile_category(unit_str, out_name, suffixes, is_sol):
    compiled_doc = fitz.open()
    found_any = False
    
    for sem in semesters:
        for suf in suffixes:
            # Suffix builder
            if is_sol:
                url_variants = [
                    f"http://jacobprabhu.com/cs173/CS_173_{sem}_examlet{unit_str}{suf}-sol.pdf",
                    f"http://jacobprabhu.com/cs173/CS_173_{sem}_examlet{unit_str}-sol.pdf"
                ]
            else:
                url_variants = [
                    f"http://jacobprabhu.com/cs173/CS_173_{sem}_examlet{unit_str}{suf}.pdf",
                    f"http://jacobprabhu.com/cs173/CS_173_{sem}_examlet{unit_str}.pdf"
                ]
                
            for url in url_variants:
                print(f"  Trying {url} ...", end="")
                content = download_pdf(url)
                if content:
                    print(" SUCCESS!")
                    doc = fitz.open("pdf", content)
                    compiled_doc.insert_pdf(doc)
                    found_any = True
                    break # Breaks the variant loop
                else:
                    print(" failed.")
            else:
                continue
            break # Breaks the suffix loop to move to NEXT SEMESTER
    
    if found_any:
        compiled_doc.save(out_name)
        print(f"[*] Saved {out_name}")
    else:
        print(f"[!] No valid PDFs found for {out_name}.")
        
# Final Exam handler (Unit 13 logic doesn't align cleanly, so we focus on 1-12. Unit 12 is final strictly).
for i in range(1, 13):
    unit_str = f"{i:02d}"
    print(f"--- Processing Unit {i} ---")
    
    if i < 12:
        compile_category(unit_str, f"pdfs/unit{i}_mcq.pdf", mcq_suffs, False)
        compile_category(unit_str, f"pdfs/unit{i}_frq.pdf", frq_suffs, False)
        compile_category(unit_str, f"pdfs/unit{i}_mcq_sol.pdf", mcq_suffs, True)
        compile_category(unit_str, f"pdfs/unit{i}_frq_sol.pdf", frq_suffs, True)
    else:
        # Unit 12 Final
        # We will map standard "final" into both mcq/frq, and "final-sol" / "finalR" into mcq_sol/frq_sol
        print("Handling Final Exams as Unit 12...")
        # Unsolved
        doc_q = fitz.open()
        doc_s = fitz.open()
        
        for sem in semesters:
            # Questions
            url = f"http://jacobprabhu.com/cs173/CS_173_{sem}_final.pdf"
            print(f"  Trying {url} ...", end="")
            content = download_pdf(url)
            if content:
                print(" SUCCESS!")
                doc_q.insert_pdf(fitz.open("pdf", content))
            else:
                print(" failed.")
            
            # Solutions
            for sol_suf in ["_final-sol.pdf", "_final_sol.pdf", "_finalR.pdf"]:
                url_s = f"http://jacobprabhu.com/cs173/CS_173_{sem}{sol_suf}"
                print(f"  Trying {url_s} ...", end="")
                content_s = download_pdf(url_s)
                if content_s:
                    print(" SUCCESS!")
                    doc_s.insert_pdf(fitz.open("pdf", content_s))
                    break
                else:
                    print(" failed.")
                    
        if len(doc_q) > 0:
            doc_q.save("pdfs/unit12_mcq.pdf")
            doc_q.save("pdfs/unit12_frq.pdf") # Duplicate since final is merged
            print("[*] Saved Final questions.")
        if len(doc_s) > 0:
            doc_s.save("pdfs/unit12_mcq_sol.pdf")
            doc_s.save("pdfs/unit12_frq_sol.pdf")
            print("[*] Saved Final solutions.")
