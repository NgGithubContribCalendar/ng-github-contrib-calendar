const cp = require('child_process');

const execParams = {env: process.env, cwd: process.cwd(), encoding: 'utf8'};

class ExecUtils {
  
  static get branchName() {
    let value = process.env.TRAVIS_BRANCH || cp.execSync('git branch', execParams).replace(/\*\s*/, '');
    
    value = value.trim();
    
    Object.defineProperty(ExecUtils, 'branchName', {value});
    
    return value;
  }
  
  static get tagName() {
    let value;
    
    if (process.env.TRAVIS_TAG) {
      value = process.env.TRAVIS_TAG;
    } else {
      try {
        value = cp.execSync('git describe --tags `git rev-list --tags --max-count=1`', execParams).trim();
      } catch (e) {
        console.error(e);
      }
    }
    
    if (!value) {
      value = ExecUtils.branchName;
    }
    
    value = value.trim();
    
    Object.defineProperty(ExecUtils, 'tagName', {value});
    
    return value;
  }
}

module.exports = ExecUtils;
