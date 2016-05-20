Package.describe({
    name: "socialize:postable",
    summary: "A package to create models which can be posted upon",
    version: "1.0.0",
    git: "https://github.com/copleykj/socialize-postable.git"
});

Package.onUse(function(api) {
    api.versionsFrom("1.3");

    api.use("ecmascript");

    api.use([
        "socialize:commentable@0.2.1"
    ]);

    api.mainModule('server.js', 'server');
    api.mainModule('common.js');
});

Package.onTest(function(api){
    //write some tests please!
});
