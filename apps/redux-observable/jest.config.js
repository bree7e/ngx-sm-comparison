module.exports = {
  name: 'redux-observable',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/redux-observable',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
