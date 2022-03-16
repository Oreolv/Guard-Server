const fs = require('fs');
const uuid = require('uuid');
const { SuccessModel, ErrorModel } = require('../model/response');
const { qiniuSecret } = require('../config/secret');
const qiniu = require('qiniu');

const getQiniuSecret = () => {
  const mac = new qiniu.auth.digest.Mac(
    qiniuSecret.AccessKey,
    qiniuSecret.SecretKey
  );
  const options = {
    scope: qiniuSecret.bucket,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  const config = new qiniu.conf.Config();
  config.zone = qiniu.zone.Zone_z2;
  return { uploadToken, config };
};

const uploadFile = file => {
  const { uploadToken, config } = getQiniuSecret();
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  const fileName = uuid.v1();
  const reader = fs.createReadStream(file.path);
  const ext = file.name.split('.').pop();
  const fileUrl = `${fileName}.${ext}`;
  return new Promise((resolve, reject) => {
    formUploader.putStream(
      uploadToken,
      fileUrl,
      reader,
      putExtra,
      (err, res) => {
        const url = `https://img.xinyu.ink/${res.key}`;
        return err
          ? reject(new ErrorModel('上传失败'))
          : resolve(new SuccessModel('上传成功', url));
      }
    );
  });
};

module.exports = { uploadFile };
