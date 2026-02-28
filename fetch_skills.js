const fs = require('fs');
const https = require('https');

async function scrapeSkills() {
    for (let i = 1; i <= 11; i++) {
        const url = `https://courses.grainger.illinois.edu/cs173/sp2026/AB/Exams/examlet${i}-skills.html`;

        await new Promise((resolve) => {
            https.get(url, (res) => {
                if (res.statusCode !== 200) {
                    console.log(`Status ${res.statusCode} for unit ${i}`);
                    return resolve();
                }
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    const skills = [];

                    // Use everything after the first heading to skip potential nav bars
                    const parts = data.split(/<h[123][^>]*>/i);
                    const content = parts.length > 1 ? parts.slice(1).join(' ') : data;

                    const regex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
                    let match;
                    while ((match = regex.exec(content)) !== null) {
                        let text = match[1].replace(/<[^>]*>?/gm, ' ').trim();
                        text = text.replace(/\s+/g, ' ');
                        text = text.replace(/&#x2013;/g, '-').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                        text = text.replace(/&#39;/g, "'").replace(/&quot;/g, '"');

                        // Only keep reasonable length sentences to avoid random UI elements
                        if (text.length > 10 && text.split(' ').length > 2 && !text.includes('href=')) {
                            skills.push(text);
                        }
                    }

                    if (skills.length > 0) {
                        const filePath = `c:\\Users\\wildc\\OneDrive\\cs173-practice\\data\\unit${i}_skills.json`;
                        fs.writeFileSync(filePath, JSON.stringify(skills, null, 2));
                        console.log(`Saved Unit ${i} skills (${skills.length} skills)`);
                    } else {
                        console.log(`No skills found for Unit ${i}`);
                    }
                    resolve();
                });
            }).on('error', (err) => {
                console.error(`Error on Unit ${i}: ${err.message}`);
                resolve();
            });
        });
    }
}

scrapeSkills();
