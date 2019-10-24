module.exports = {
  name: 'flux',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/flux',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
