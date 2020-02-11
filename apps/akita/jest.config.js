module.exports = {
  name: 'akita',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/akita',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
