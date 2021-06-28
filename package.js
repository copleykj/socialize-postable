/* global Package */
Package.describe({
    name: 'socialize:postable',
    summary: 'A package to create models which can be posted upon',
    version: '1.0.4',
    git: 'https://github.com/copleykj/socialize-postable.git',
});

Package.onUse(function _(api) {
    api.versionsFrom(['1.10.2', '2.3']);

    api.use('ecmascript');

    api.use([
        'socialize:commentable@1.0.5',
    ]);

    api.mainModule('./server/server.js', 'server');
    api.mainModule('./common/common.js', 'client');
});
