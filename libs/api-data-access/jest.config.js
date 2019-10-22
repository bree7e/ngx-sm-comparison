module.exports = {
  name: 'api-data-access',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/api-data-access',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
