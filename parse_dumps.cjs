const fs = require('fs');

function parseDump(filename) {
    try {
        const content = fs.readFileSync(filename, 'utf16le'); // Try UTF-16LE first
        // If JSON parsing fails, regex extract stdout
        const stdoutMatch = content.match(/"stdout":"((?:[^"\\]|\\.)*)"/);
        if (stdoutMatch) {
            let stdout = stdoutMatch[1]
                .replace(/\\n/g, '\n')
                .replace(/\\r/g, '')
                .replace(/\\"/g, '"')
                .replace(/\\\\/g, '\\');
            console.log(`--- CONTENT OF ${filename} ---`);
            console.log(stdout);
        } else {
            console.log(`Could not extract stdout from ${filename}`);
            console.log(content.substring(0, 200));
        }
    } catch (e) {
        console.error(e);
    }
}

parseDump('env_dump.txt');
parseDump('config_dump.json');
