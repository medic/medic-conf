const path = require('path');
const assert = require('chai').assert;
const { execSync } = require('child_process');

describe('shell-completion', () => {

  it('should complete a partial command', () => {

    let completion_file = path.join(__dirname, '../..', 'src/cli/shell-completion.bash');
    let partial = 'comp';
    let bin = 'medic-conf';
    let input = bin + ' ' + partial;

    let cmd = `bash -i -c 'COMP_LINE="${input}"; COMP_WORDS=(${input}); COMP_CWORD=1; COMP_POINT=${input.length}; $(complete -p medic-conf | sed "s/.*-F \\([^ ]*\\) .*/\\1/") && echo \$\{COMPREPLY[*]\}'`; // eslint-disable-line no-useless-escape

    let output = execSync(cmd, { encoding: 'utf8' });

    assert.equal(output, 'compile-app-settings compress-pngs compress-svgs\n');

  });

});
