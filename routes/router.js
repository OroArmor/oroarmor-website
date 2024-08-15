const router = {
    data: {

    },
    get: function(path, callback) {
        router.data[path] = callback;
        return router;
    }
}

module.exports = router;