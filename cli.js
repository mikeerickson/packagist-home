#!/usr/bin/env node

"use strict"

const fs = require("fs")
const meow = require("meow")
const open = require("open")
const path = require("path")
const execa = require("execa")
const colors = require("colors")
const Messenger = require("@codedungeon/messenger")

const cli = meow(`
	Usage
	  $ packagist-home [repo | flags]

	Examples
	  $ packagist-home
	  $ packagist-home --github
	  $ packagist-home -g
`)

const repo = cli.input[0]

;(async () => {
    if (repo) {
        let url = `https://packagist.org/packages/${repo}`
        await open(url)
        return `open url ${url}`
    } else {
        let composerFile = path.join(process.cwd(), "composer.json")
        let composerInfo = { name: "" }
        try {
            if (fs.existsSync(composerFile)) {
                const jsonString = fs.readFileSync(composerFile)
                composerInfo = JSON.parse(jsonString)
            }
        } catch (err) {
            Messenger.error(err, "ERROR")
        }

        let pkgName = composerInfo.name
        if (pkgName.length === 0) {
            console.log("")
            Messenger.error("Couldn't find the project composer.json, or supplied package name.", "ERROR")
            process.exit(1)
        }
        let url = `https://packagist.org/packages/${pkgName}`
        await open(url)
        return `open url ${url}`
    }
})()
