module.exports = {
  name: 'ngxs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngxs',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
