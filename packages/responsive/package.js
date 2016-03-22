Package.describe({
  summary: "Responsive logic & helpers using enquire.js"
});

Package.on_use(function (api) {
  api.use([
    'mrt:modernizr-meteor@2.6.2',
    'templating',
    'blaze',
    'session'
  ], 'client');
  api.add_files([
    "modernizr_cssvwunit.js",
    "matchMedia_polyfill.js",
    "enquire.js",
    "stylefix.js",
    "vw_polyfill.js",
    "MediaClass.js",
    "helpers.js"
  ], "client");
  api.export('Responsive', 'client');
});
