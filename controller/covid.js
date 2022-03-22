const fs = require('fs');
const path = require('path');
const { SuccessModel, ErrorModel } = require('../model/response');

const getAllData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '../static/all_data.json'), function (err, data) {
      if (err) {
        reject(new ErrorModel('获取失败'));
      }
      const json = JSON.parse(data.toString());
      resolve(new SuccessModel('获取成功', json));
    });
  });
};

module.exports = { getAllData };
