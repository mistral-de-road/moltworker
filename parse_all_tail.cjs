const fs = require('fs');

function unescape(str) {
    return str.replace(/\\n/g, '\n').replace(/\\r/g, '').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
}

try {
    const content = fs.readFileSync('startup_log.txt', 'utf16le');

    const stderrMatch = content.match(/"stderr":"((?:[^"\\]|\\.)*)"/);
    const stdoutMatch = content.match(/"stdout":"((?:[^"\\]|\\.)*)"/);

    if (stderrMatch) {
        let stderr = unescape(stderrMatch[1]);
        console.log(`STDERR Length: ${stderr.length}`);
        console.log('--- STDERR TAIL ---');
        console.log(stderr.substring(stderr.length - 1000));
    } else {
        console.log('No stderr found');
    }

    if (stdoutMatch) {
        let stdout = unescape(stdoutMatch[1]);
        console.log(`STDOUT Length: ${stdout.length}`);
        console.log('--- STDOUT TAIL ---');
        console.log(stdout.substring(stdout.length - 1000));
    } else {
        console.log('No stdout found');
    }

} catch (e) {
    console.error(e);
}
