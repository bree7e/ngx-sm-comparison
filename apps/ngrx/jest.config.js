module.exports = {
  name: 'ngrx',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngrx',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
