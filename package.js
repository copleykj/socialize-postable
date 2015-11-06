Package.describe({
    name: "socialize:feed",
    summary: "A package for impmementing a social network style news feed",
    version: "0.1.0",
});

Package.onUse(function(api) {
    api.versionsFrom("1.0.2.1");

    api.use([
        "socialize:friendships@0.3.4", "socialize:commentable@0.2.0"
    ]);

    //Add the post-model files
    api.addFiles(["post-model/common/post-model.js", "user-extensions.js"]);
    api.addFiles(["post-model/server/server.js", "post-model/server/publications.js"], "server");

    api.export(["Post"]);
});
