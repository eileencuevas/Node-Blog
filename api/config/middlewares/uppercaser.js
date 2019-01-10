const uppercaser = (req, res, next) => {
    let name = req.body.name || '';

    if (name.length > 0) {
        req.uppercased = { name: name.toUpperCase() };
        next();
    } else {
        res.status(500).json({ "error": 'Could not find a name to Uppercase.' });
    }
}

module.exports = uppercaser;