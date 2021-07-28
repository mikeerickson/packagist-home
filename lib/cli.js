#!/usr/bin/env node

/*-------------------------------------------------------------------------------------------
 * Copyright (c) Mike Erickson / Codedungeon.  All rights reserved.
 * Licensed under the MIT license.  See LICENSE in the project root for license information.
 * -----------------------------------------------------------------------------------------*/

"use strict"

const fs = require("fs")
const meow = require("meow")
const open = require("open")
const path = require("path")
const execa = require("execa")
const colors = require("colors")
const Messenger = require("@codedungeon/messenger")

// description from package.json
// version from package.json (see how to use showVersion? method)
// help text inline by default (see how to use showHelp? method)

const cli = meow(`
	${colors.yellow("Usage:")}
	  $ packagist-home [repo] [flags]

	${colors.yellow("Examples:")}
	  $ packagist-home
	  $ packagist-home codedungeon/phpunit-result-printer
	  $ packagist-home -g
`)

const repo = cli.input[0]

;(async () => {
    console.log("")
    if (repo) {
        let url = `https://packagist.org/packages/${repo}`
        cli.flags.dryRun ? Messenger.warning(`open url: ${colors.cyan(url)}`) : await open(url)
    } else {
        let composerFilename = path.join(process.cwd(), "composer.json")
        let composerInfo = { name: "" }
        try {
            if (fs.existsSync(composerFilename)) {
                const jsonString = fs.readFileSync(composerFilename)
                composerInfo = JSON.parse(jsonString)
            }
        } catch (err) {
            Messenger.error(err, "ERROR")
        }

        let pkgName = composerInfo.name
        if (pkgName.length === 0) {
            Messenger.error("Unable to locate project `composer.json`, or supplied package name.", "ERROR")
            process.exit(1)
        }
        let url = `https://packagist.org/packages/${pkgName}`
        cli.flags.dryRun ? Messenger.warning(`open url: ${colors.cyan(url)}`) : await open(url)
    }
})()
