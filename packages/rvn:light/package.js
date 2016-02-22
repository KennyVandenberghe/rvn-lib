Package.describe({
  summary: "Rvn package Light.",
  version: "0.0.1",
  name: "rvn:light"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  var c = 'client',
      s = 'server',
      cs = [c, s];

  api.addFiles([
    'namespace.js'
  ], c);

  api.export('Rvn', c);
});
