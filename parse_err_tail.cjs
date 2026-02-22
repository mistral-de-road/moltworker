const fs = require('fs');
try {
    const content = fs.readFileSync('startup_log.txt', 'utf16le'); // or 'utf8' depending on curl output

    const stderrMatch = content.match(/"stderr":"((?:[^"\\]|\\.)*)"/);
    if (stderrMatch) {
        let stderr = stderrMatch[1]
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '')
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, '\\');

        console.log('--- STDERR TAIL ---');
        console.log(stderr.substring(stderr.length - 2000));
    } else {
        console.log('Could not extract stderr via regex');
    }
} catch (e) {
    console.error(e);
}
