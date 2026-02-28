import os
import re

html_path = "units.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Find all <a ... href="pdfs/..." ...>
def replacer(match):
    full_tag = match.group(0)
    href = match.group(1)
    if not os.path.exists(href):
        print(f"Removing dead link: {href}")
        return "" # Remove the line
    return full_tag

pattern = re.compile(r'<a.*?href="(pdfs/[^"]+)".*?</a>')
new_html = pattern.sub(replacer, html)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(new_html)

print("Cleared dead links.")
