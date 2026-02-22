const fs = require('fs');
try {
    const content = fs.readFileSync('cli_help.json', 'utf8');
    const json = JSON.parse(content);
    console.log(json.stdout);
} catch (e) {
    console.error(e);
}
