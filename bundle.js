const fs = require('fs');
const path = require('path');

const repoBaseUrl = 'https://raw.githubusercontent.com/Andrewcp21/binus-test/main/';
const distFile = 'wix_bundle.html';

function bundle() {
    let html = fs.readFileSync('index.html', 'utf8');
    const css = fs.readFileSync('styles.css', 'utf8');
    const js = fs.readFileSync('script.js', 'utf8');

    // Inline CSS
    html = html.replace('<link rel="stylesheet" href="styles.css">', `<style>\n${css}\n</style>`);

    // Inline JS
    html = html.replace('<script src="script.js"></script>', `<script>\n${js}\n</script>`);

    // Replace image paths
    // 1. Handle background-image in CSS (now inlined)
    // 2. Handle <img> tags in HTML
    
    // Replace "images/" with repoBaseUrl + "images/"
    // Also handle URL encoded spaces %20
    html = html.replace(/(src|href)="images\//g, `$1="${repoBaseUrl}images/`);
    html = html.replace(/url\(["']?images\//g, (match) => match.replace('images/', repoBaseUrl + 'images/'));

    fs.writeFileSync(distFile, html);
    console.log(`Successfully bundled into ${distFile}`);
}

bundle();
