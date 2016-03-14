Package.describe({
    name: "socialize:feed",
    summary: "A package for impmementing a social network style news feed",
    version: "0.2.3",
});

Package.onUse(function(api) {
    api.versionsFrom("1.0.2.1");

    api.use([
        "socialize:user-model@0.1.7", "socialize:commentable@0.2.1"
    ]);

    //Add the post-model files
    api.addFiles(["post-model/common/post-model.js", "user-extensions.js"]);
    api.addFiles(["post-model/server/server.js"], "server");

    api.export(["Post", "Feed"]);
});
