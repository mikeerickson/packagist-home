const test = require("ava")
const execa = require("execa")

test("default cli", async (t) => {
    await t.notThrowsAsync(execa("./lib/cli.js", ["--dry-run"]))
})

test("cli with suppoed repo", async (t) => {
    await t.notThrowsAsync(execa("./lib/cli.js", ["codedungeon/phpunit-result-printer", "--dry-run"]))
})
