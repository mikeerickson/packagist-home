#!/usr/bin/env node

"use strict"

const fs = require("fs")
const meow = require("meow")
const open = require("open")
const path = require("path")
const execa = require("execa")
const colors = require("colors")

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
            console.log(colors.error(err))
        }

        let pkgName = composerInfo.name
        if (pkgName.length === 0) {
            console.log("")
            console.error(colors.red("Couldn't find the project composer.json, or supply package name."))
            process.exit(1)
        }
        let url = `https://packagist.org/packages/${pkgName}`
        await open(url)
        return `open url ${url}`
    }
})()
