module.exports = {
  name: 'mobx',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/mobx',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
