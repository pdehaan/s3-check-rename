var AWS = require('aws-sdk'),
  s3 = new AWS.S3(),
  S = require('string');


var s3CheckRename = function(bucket) {
  this.bucket = bucket;
};

s3CheckRename.prototype.clean = function(name) {
  name = S(name).latinise().s;
  name = name.toLowerCase();
  name = S(name).dasherize().s;
  return name;
};

s3CheckRename.prototype.getNameAndExtension = function(name) {
  var arr = name.split('.');
  var obj = {
    name: this.clean(arr.slice(0, arr.length - 1).join('.')),
    ext: arr[arr.length - 1]
  };
  return obj;
};

s3CheckRename.prototype.rename = function(obj, index) {
  return obj.name + '-' + index + '.' + obj.ext;
};

s3CheckRename.prototype.getMaxIndex = function(arr) {
  var narr = [];
  var self = this;
  var name = 0;
  for(key in arr) {
    var obj = self.getNameAndExtension(arr[key].Key);
    var n = obj.name.split('-');
    n = n[n.length - 1];
    if(!isNaN(Number(n))) {
      narr.push(Number(n));
    }
  }
  return this.getMaxOfArray(narr) + 1;
};

s3CheckRename.prototype.getMaxOfArray = function(numArray) {
  return Math.max.apply(null, numArray);
};

s3CheckRename.prototype.check = function(name, callback) {
  var obj = this.getNameAndExtension(name);
  var output = '';
  var self = this;
  var params = {
    Bucket: this.bucket,
    Prefix: obj.name
  };
  s3.listObjects(params, function(err, data) {
      if(data['Contents'].length == 0) {
        output = obj.name + '.' + obj.ext;
      } else if(data['Contents'].length == 1) {
        output = self.rename(obj, 0);
      } else {
        output = self.rename(obj, self.getMaxIndex(data['Contents']));
      }
      callback(err, output);
  });
  return output;
};

module.exports = s3CheckRename;
