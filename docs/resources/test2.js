if (window.testTwo !== undefined) {
    throw new Error('Script should not be loaded more than once: Test Two');
}
console.log('Test Two is loading...');
window.testTwo = 'Test Two';