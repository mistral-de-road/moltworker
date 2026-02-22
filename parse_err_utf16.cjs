const fs = require('fs');
try {
    // PowerShell > often creates UTF-16LE file
    const content = fs.readFileSync('startup_log.txt', 'utf16le');

    const stderrMatch = content.match(/"stderr":"((?:[^"\\]|\\.)*)"/);
    if (stderrMatch) {
        const stderr = stderrMatch[1]
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '')
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, '\\');
        console.log('--- EXTRACTED STDERR ---');
        console.log(stderr);
    } else {
        console.log('Could not extract stderr via regex');
        console.log('Content snippet:', content.substring(0, 500));
    }
} catch (e) {
    console.error(e);
}
