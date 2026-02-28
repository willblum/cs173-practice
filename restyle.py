import re

with open("css/styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# 1. Update Fonts
css = css.replace("family=Inter:wght", "family=Outfit:wght")
css = css.replace("'Inter'", "'Outfit'")

# 2. Update Hardcoded CSS Variables for Colors
# Theme: Magma / Sunset (Charcoal bg, Orange/Crimson accents)
css = re.sub(r'--bg-deep:\s*#[0-9a-fA-F]+;', '--bg-deep: #050505;', css)
css = re.sub(r'--bg-surface:\s*#[0-9a-fA-F]+;', '--bg-surface: #0a0a09;', css)
css = re.sub(r'--bg-card:\s*rgba\([^)]+\);', '--bg-card: rgba(20, 18, 18, 0.65);', css)
css = re.sub(r'--bg-card-hover:\s*rgba\([^)]+\);', '--bg-card-hover: rgba(30, 26, 26, 0.75);', css)
css = re.sub(r'--bg-input:\s*rgba\([^)]+\);', '--bg-input: rgba(15, 12, 12, 0.8);', css)

css = re.sub(r'--text-primary:\s*#[0-9a-fA-F]+;', '--text-primary: #f8fafc;', css)
css = re.sub(r'--text-secondary:\s*#[0-9a-fA-F]+;', '--text-secondary: #a1a1aa;', css)
css = re.sub(r'--text-muted:\s*#[0-9a-fA-F]+;', '--text-muted: #52525b;', css)

css = re.sub(r'--accent-1:\s*#[0-9a-fA-F]+;', '--accent-1: #ea580c;', css)
css = re.sub(r'--accent-2:\s*#[0-9a-fA-F]+;', '--accent-2: #e11d48;', css)
css = re.sub(r'--accent-3:\s*#[0-9a-fA-F]+;', '--accent-3: #fb923c;', css)
css = re.sub(r'--gradient-subtle:\s*[^;]+;', '--gradient-subtle: linear-gradient(135deg, rgba(234, 88, 12, 0.15), rgba(225, 29, 72, 0.15));', css)

css = re.sub(r'--success:\s*#[0-9a-fA-F]+;', '--success: #22c55e;', css)
css = re.sub(r'--success-bg:\s*rgba\([^)]+\);', '--success-bg: rgba(34, 197, 94, 0.12);', css)
css = re.sub(r'--error:\s*#[0-9a-fA-F]+;', '--error: #ef4444;', css)
css = re.sub(r'--error-bg:\s*rgba\([^)]+\);', '--error-bg: rgba(239, 68, 68, 0.12);', css)

css = re.sub(r'--border:\s*rgba\([^)]+\);', '--border: rgba(234, 88, 12, 0.15);', css)
css = re.sub(r'--border-hover:\s*rgba\([^)]+\);', '--border-hover: rgba(234, 88, 12, 0.4);', css)

css = re.sub(r'--shadow-glow:\s*[^;]+;', '--shadow-glow: 0 0 30px rgba(234, 88, 12, 0.15);', css)

# 3. Replace all usage of the purple/cyan rgba strings in the hardcoded values (shadows, mesh, etc.)
# 139, 92, 246 => violet -> 234, 88, 12 (orange)
css = css.replace('139, 92, 246', '234, 88, 12')
# 6, 182, 212 => cyan -> 225, 29, 72 (crimson)
css = css.replace('6, 182, 212', '225, 29, 72')
# 167, 139, 250 => light violet -> 251, 146, 60 (amber)
css = css.replace('167, 139, 250', '251, 146, 60')

# Write back
with open("css/styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Theme updated successfully!")
