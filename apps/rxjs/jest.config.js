module.exports = {
  name: 'rxjs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/rxjs',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
