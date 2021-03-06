module.exports.autoreload = {
    active: true,
    usePolling: false,
    dirs: [
        "api/models",
        "api/controllers",
        "api/services",
        "views/",
        "config"
    ],
    ignored: [
        // Ignore all files with .ts extension
        "**.ts"
    ]
};