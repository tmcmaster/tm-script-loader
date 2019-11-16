if (window.testOne !== undefined) {
    throw new Error('Script should not be loaded more than once: Test One');
}
console.log('Test One is loading...');
window.testOne = 'Test One';