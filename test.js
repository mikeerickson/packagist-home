const test = require("ava")
const execa = require("execa")

test("default cli", async (t) => {
    await t.notThrowsAsync(execa("./cli.js"))
})

test("cli with suppoed repo", async (t) => {
    await t.notThrowsAsync(execa("./cli.js", ["codedungeon/phpunit-result-printer"]))
})
