var should = require('chai').should(),
    S3CR = require('../index'),
    s3CheckRename = new S3CR('bucketName');

describe('#clean', function(){
  it('crème brûlée', function(){
    s3CheckRename.clean('crème brûlée').should.equal('creme-brulee');
  });
  it('ùhsdu+ *ksjkueüjsnja pl', function(){
    s3CheckRename.clean('ùhsdu+ *ksjkueüjsnja pl').should.equal('uhsdu+-*ksjkueujsnja-pl');
  });
});

var arr = {
  one: {
    Key:'any-name-thing-0.png'
  },
  two: {
    Key:'any-name-thing-5.png'
  },
  three: {
    Key:'any-name-thing-3.png'
  },
  four: {
    Key:'any-name-thing-1.png'
  },
  five: {
    Key:'any-name-thing-8.png'
  },
};

describe('#getMaxIndex', function(){
  it(arr, function(){
    s3CheckRename.getMaxIndex(arr).should.equal(9);
  });
});

describe('#rename', function(){
  it('file-name-9.png', function(){
    s3CheckRename.rename({name: 'file-name', ext: 'png'}, 9).should.equal('file-name-9.png');
  });
});