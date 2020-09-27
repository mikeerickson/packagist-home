# git-remote-upstream-url [![Build Status](https://travis-ci.org/RichardLitt/git-remote-upstream-url.svg?branch=master)](https://travis-ci.org/RichardLitt/git-remote-upstream-url)

> Get the remote upstream url of a git repository

Based entirely on [Sindre Sorhus' git-remote-origin-url](//github.com/sindresorhus/git-remote-origin-url).

## Install

```
$ npm install --save git-remote-upstream-url
```


## Usage

```js
const gitRemoteUpstreamUrl = require('git-remote-upstream-url');

gitRemoteUpstreamUrl().then(url => {
	console.log(url);
	//=> 'git@github.com:RichardLitt/git-remote-upstream-url.git'
});
```


## gitRemoteupstreamUrl([cwd])

### cwd

Type: `string`<br>
Default: `process.cwd()`

Working directory.


## License

MIT © [Richard Littauer](http://burntfen.com)
