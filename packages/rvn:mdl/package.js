Package.describe({
  name: 'rvn:mdl',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  var c = 'client',
      s = 'server',
      cs = [c, s];

  api.use([
    'ui',
    'templating',
    'zodiase:mdl@1.1.0',
    'percolate:velocityjs',
    'reactive-var',
    'momentjs:moment',
    'rvn:light'
  ], c);

  api.use([
    'underscore'
  ], c);

  api.addFiles([
    'mdl/card.html',
    'components/player-card.html',
    'components/actionPicker/actionPicker.html',
    'components/actionPicker/actionPicker.js',
    'components/list/list.html',
    'components/list/list.js',
    'components/header/header.html',
    'components/header/header.js',
    'components/tabbar/tabbar.html',
    'components/tabbar/tabbar.js',
    'components/dropdown/dropdown.html',
    'components/dropdown/dropdown.js',
    'components/snackbar/snackbar.html',
    'components/snackbar/snackbar.js',
    'components/dialog/dialog.html',
    'components/dialog/dialog.js',
    'components/carousel/carousel.html',
    'components/carousel/carousel.js',
    'components/datePicker/datePicker.html',
    'components/datePicker/datePicker.js'
  ], c);
});
