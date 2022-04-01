const fs = require('fs');
const path = require('path');
const { SuccessModel, ErrorModel } = require('../model/response');

const readFile = dir => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, `../static/${dir}.json`),
      function (err, data) {
        if (err) {
          reject(new ErrorModel('获取失败'));
        }
        const json = JSON.parse(data.toString());
        resolve(new SuccessModel('获取成功', json));
      }
    );
  });
};

const getAllData = () => {
  return readFile('all_data');
};

const getRiskArea = () => {
  return readFile('risk_area');
};

module.exports = { getAllData, getRiskArea };
