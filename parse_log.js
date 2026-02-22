const fs = require('fs');
try {
    const content = fs.readFileSync('startup_log.txt', 'utf8');
    const json = JSON.parse(content);
    console.log('--- STDOUT ---');
    console.log(json.stdout);
    console.log('--- STDERR ---');
    console.log(json.stderr);
} catch (e) {
    console.error('Failed to parse:', e);
}
