module.exports = {
  '**/*.(ts|js|tsx|jsx)?(x)': (filenames) => `yarn lint ${filenames.join(' ')}`,
}
