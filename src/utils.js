module.exports = {
    toJson: (data) => {
        return JSON.stringify(data)
    },
    fromJson: (data) => {
        return JSON.parse(data)
    },
}
