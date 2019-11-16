if (window.testThree !== undefined) {
    throw new Error('Script should not be loaded more than once: Test Three');
}
console.log('Test Three is loading...');
const {testOne,testTwo} = window;
window.testThree = `Test Three | ${testOne} | ${testTwo}`;