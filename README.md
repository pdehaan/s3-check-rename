#S3 Check and Rename

This module provide a way to clean the filename and check if the name of the file exists in a **S3 Bucket** and provide a alternative name if the file exists to avoid override.

To clean the name the module remove the odd characters and spaces.

The alternative name add a increasing index in the end of the filename if the filename exists.

#####Ejem:#####

**"crème brûlée.png"** will be rename to **"creme-brulee.png"** if the file doesn't exist but if the file exists will be rename to **"creme-brulee-0.png"**.

###Requirements###
This module use **aws-sdk** package to get the bucket info for this we need create a folder called **.aws** in the home directory of our machine and put the AWS credentials file in the folder.

###How to use###

This module is helpful to use with **sails.js s3-skipper** module to upload files to amazon and maintain a better name more close to the original name.
The example is a modification of [FileController.js](https://github.com/sails101/file-uploads/blob/master/api/controllers/FileController.js) on sails 101 examples.


```
function(req, res) {
	var S3CR = require('s3-check-rename'),
	s3CRename = new S3CR('bucketName'),
	upload = req.file('avatar')._files[0].stream,
	originalName = upload.filename;
	
	s3CRename.check(originalName, function(err, name){
	req.file(req.param('id')).upload(
        {
          saveAs: name,
          adapter: require('skipper-s3'),
          bucket: 'bucketName',
          key: "aws key",
          secret: "aws secret"
        }, function whenDone(err, uploadedFiles) {
          if (err) return res.serverError(err);
          else return res.json({
            files: uploadedFiles,
            textParams: req.params.all()
          });
        });
	});
}
```

### Release History

* 0.1.0 Initial release