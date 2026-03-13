const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const appDir = path.join(__dirname, 'app');

walkDir(appDir, (filePath) => {
    if (filePath.endsWith('page.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if comment already exists to avoid duplicates
        if (content.includes('// PAGE OVERVIEW')) {
            return;
        }

        // Determine page name from path
        const relativePath = path.relative(appDir, filePath);
        const folderName = path.dirname(relativePath);
        
        let pageTitle = folderName === '.' ? 'Home' : folderName.replace(/\\/g, '/');
        
        // Capitalize and format
        pageTitle = pageTitle.split('/').map(part => 
            part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ')
        ).join(' - ');

        const comment = `/**\n * PAGE OVERVIEW: \n * This page component handles the rendering and functionality for the "${pageTitle}" section.\n * It connects the necessary data stores and components to provide a smooth user experience.\n */\n`;

        // Insert after 'use client' if it exists, otherwise at the top
        if (content.startsWith("'use client';") || content.startsWith('"use client";')) {
            const lines = content.split('\n');
            lines.splice(1, 0, '\n' + comment);
            content = lines.join('\n');
        } else {
            content = comment + '\n' + content;
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Added comment to ${filePath}`);
    }
});
