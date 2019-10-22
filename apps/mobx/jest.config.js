module.exports = {
  name: 'mobx',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/mobx',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
