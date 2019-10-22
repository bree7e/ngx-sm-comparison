module.exports = {
  name: 'akita',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/akita',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
