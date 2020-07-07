const qiniu = require("qiniu");
const uuid = require("uuid");
const CommonResult = require("../common/commonResult");
const config = require("../common/config");

const { accessKey, secretKey } = config.qiniu;
qiniu.conf.ACCESS_KEY = accessKey;
qiniu.conf.SECRET_KEY = secretKey;
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

// 要上传的空间名称
const bucket = "footprintapp";

// 签名鉴权，详情见：https://developer.qiniu.com/kodo/sdk/1289/nodejs#4
async function signature(ctx) {
  const body = ctx.request.body;
  const cloud = body.cloud;
  console.log(cloud);
  // 生成上传到七牛后保存的文件名
  let key = uuid.v4() + ".jpeg";
  const options = {
    scope: bucket,
    returnBody:
      '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
  };
  putPolicy = new qiniu.rs.PutPolicy(options);
  const token = putPolicy.uploadToken(mac);
  ctx.body = new CommonResult(2000, "创建成功", {
    token,
    key
  });
}

module.exports = { signature };
