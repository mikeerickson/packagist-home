'use strict';
const gitconfig = require('gitconfiglocal');
const pify = require('pify');

module.exports = dir => {
	return pify(gitconfig)(dir || process.cwd()).then(config => {
		var url = config.remote && config.remote.upstream && config.remote.upstream.url;

		if (!url) {
			throw new Error('Couldn\'t find upstream url');
		}

		return url;
	});
};
