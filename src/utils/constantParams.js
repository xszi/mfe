const developmentIframeUrl = {
  'applicationUser': 'https://uat-open.fxnotary.com/sys/applicationUser',
  'roleManage': 'https://uat-open.fxnotary.com/sys/role',
  // 'depManage': 'http://192.168.88.115:18314/config/depManage'
  'depManage': 'https://uat-open.fxnotary.com/config/depManage',
  'template': 'https://uat-template.fxnotary.com/operation/cloud',
  'iframePage': 'http://172.16.11.31:9528'
}

const testIframeUrl = {
  'applicationUser': 'https://uat-open.fxnotary.com/sys/applicationUser',
  'roleManage': 'https://uat-open.fxnotary.com/sys/role',
  'depManage': 'https://uat-open.fxnotary.com/config/depManage',
  'template': 'https://uat-template.fxnotary.com/operation/cloud',
  'iframePage': 'https://uat-sign-process-config.fxnotary.com'
}

const productionIframeUrl = {
  'applicationUser': 'https://nc-open.fxnotary.com/sys/applicationUser',
  'roleManage': 'https://nc-open.fxnotary.com/sys/role',
  'depManage': 'https://nc-open.fxnotary.com/config/depManage',
  'template': 'https://nc-template.fxnotary.com/operation/cloud',
  'iframePage': 'https://sign-process-config.fxnotary.com'
}

export default {
  developmentIframeUrl,
  testIframeUrl,
  productionIframeUrl
}
