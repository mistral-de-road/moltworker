const fs = require('fs');
try {
    const content = fs.readFileSync('startup_log.txt', 'utf8');
    // Simple regex for JSON string extraction (handling escaped quotes basic way)
    // This is fragile but better than failing JSON.parse on huge strings
    const stderrMatch = content.match(/"stderr":"((?:[^"\\]|\\.)*)"/);
    if (stderrMatch) {
        const stderr = stderrMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        console.log('--- EXTRACTED STDERR ---');
        console.log(stderr);
    } else {
        console.log('Could not extract stderr via regex');
        console.log('Raw content head:', content.substring(0, 200));
    }
} catch (e) {
    console.error(e);
}
