const assertRevert = async (promise) => {
    try {
        await promise;
        assert.fail('Expected revert not received');
    } catch (error) {
        const revertFound = error.message.search('revert') >= 0;
    }
};

module.exports = assertRevert;