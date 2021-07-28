#!/usr/bin/env node

/*-------------------------------------------------------------------------------------------
 * Copyright (c) Mike Erickson / Codedungeon.  All rights reserved.
 * Licensed under the MIT license.  See LICENSE in the project root for license information.
 * -----------------------------------------------------------------------------------------*/

// need to disable for the file as eslint is hammering async code

/*eslint-disable */

const fs = require("fs")
const path = require("path")
const execa = require("execa")
const Messenger = require("@codedungeon/messenger")

;(async () => {
    try {
        let { stdout } = await execa("eslint", ["./**/*.{ts,tsx,js,jsx,vue}", "--fix"], { stdio: "inherit" })
        console.log("")
        Messenger.success("No linting errors found", "SUCCESS")
    } catch (err) {
        console.log(err.stdout)
    }
})()
