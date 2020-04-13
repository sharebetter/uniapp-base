module.exports = {
  checkIDCardNumber(idCardNumber) {
    // 1 "验证通过!", 0 //校验不通过
    var format =
      /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
    //号码规则校验
    if (!format.test(idCardNumber)) {
      return {
        'status': 0,
        'message': '身份证号格式错误'
      };
    }
    //区位码校验
    //出生年月日校验   前正则限制起始年份为1900;
    var year = idCardNumber.substr(6, 4), //身份证年
      month = idCardNumber.substr(10, 2), //身份证月
      date = idCardNumber.substr(12, 2), //身份证日
      time = Date.parse(month + '-' + date + '-' + year), //身份证日期时间戳date
      now_time = Date.parse(new Date()), //当前时间戳
      dates = (new Date(year, month, 0)).getDate(); //身份证当月天数
    if (time > now_time || date > dates) {
      return {
        'status': 0,
        'message': '身份证号出生日期错误'
      }
    }
    //校验码判断
    var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //系数
    var b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); //校验码对照表
    var array = idCardNumber.split("");
    var sum = 0;
    for (var k = 0; k < 17; k++) {
      sum += parseInt(array[k]) * parseInt(c[k]);
    }
    if (array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
      return {
        'status': 0,
        'message': '身份证号检验码错误'
      }
    }
    return {
      'status': 1,
      'message': '校验通过'
    }
  },
  checkPhoneNumber(phoneNumber) {
    // 1 "验证通过!", 0 //校验不通过
    var format = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    //号码规则校验
    if (!format.test(phoneNumber)) {
      return {
        'status': 0,
        'message': '请输入正确的手机号'
      };
    } else {
      return {
        'status': 1,
        'message': '校验通过'
      }
    }
  }
}
