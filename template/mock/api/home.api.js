
let homeApi = {
  '/home/homeStatistics': {
    'code': 200,
    'message': '',
    'data': {
      'todayInquiry': 1,
      'pastInquiry': 2,
      'todayPackSlip': 3,
      'pastPackSlip': 4,
      'todayOrder': 5,
      'unpayOrder': 6,
      'toFeedbackInquiry': 7,
      'pendingPackSlip': 8,
      'remindInquiry': 9,
      'pendingDeclaration': 10,
      'pendingOnSale': 11,
      'pendingAfterSale': 12
    }
  },
  '/getProvinceList': {"code":200,"message":"success","data":[{"id":110000,"parentId":1,"name":"北京"},{"id":120000,"parentId":1,"name":"天津"},{"id":130000,"parentId":1,"name":"河北省"},{"id":140000,"parentId":1,"name":"山西省"},{"id":150000,"parentId":1,"name":"内蒙古自治区"},{"id":210000,"parentId":1,"name":"辽宁省"},{"id":220000,"parentId":1,"name":"吉林省"},{"id":230000,"parentId":1,"name":"黑龙江省"},{"id":310000,"parentId":1,"name":"上海"},{"id":320000,"parentId":1,"name":"江苏省"},{"id":330000,"parentId":1,"name":"浙江省"},{"id":340000,"parentId":1,"name":"安徽省"},{"id":350000,"parentId":1,"name":"福建省"},{"id":360000,"parentId":1,"name":"江西省"},{"id":370000,"parentId":1,"name":"山东省"},{"id":410000,"parentId":1,"name":"河南省"},{"id":420000,"parentId":1,"name":"湖北省"},{"id":430000,"parentId":1,"name":"湖南省"},{"id":440000,"parentId":1,"name":"广东省"},{"id":450000,"parentId":1,"name":"广西壮族自治区"},{"id":460000,"parentId":1,"name":"海南省"},{"id":500000,"parentId":1,"name":"重庆"},{"id":510000,"parentId":1,"name":"四川省"},{"id":520000,"parentId":1,"name":"贵州省"},{"id":530000,"parentId":1,"name":"云南省"},{"id":540000,"parentId":1,"name":"西藏自治区"},{"id":610000,"parentId":1,"name":"陕西省"},{"id":620000,"parentId":1,"name":"甘肃省"},{"id":630000,"parentId":1,"name":"青海省"},{"id":640000,"parentId":1,"name":"宁夏回族自治区"},{"id":650000,"parentId":1,"name":"新疆维吾尔自治区"},{"id":710000,"parentId":1,"name":"台湾"},{"id":810000,"parentId":1,"name":"香港特别行政区"},{"id":820000,"parentId":1,"name":"澳门特别行政区"},{"id":990000,"parentId":1,"name":"海外"}],"success":true},
  '/getCityList': {"code":200,"message":"success","data":[{"id":130100,"parentId":130000,"name":"石家庄市"},{"id":130200,"parentId":130000,"name":"唐山市"},{"id":130300,"parentId":130000,"name":"秦皇岛市"},{"id":130400,"parentId":130000,"name":"邯郸市"},{"id":130500,"parentId":130000,"name":"邢台市"},{"id":130600,"parentId":130000,"name":"保定市"},{"id":130700,"parentId":130000,"name":"张家口市"},{"id":130800,"parentId":130000,"name":"承德市"},{"id":130900,"parentId":130000,"name":"沧州市"},{"id":131000,"parentId":130000,"name":"廊坊市"},{"id":131100,"parentId":130000,"name":"衡水市"}],"success":true},
  '/getDistrictList': {"code":200,"message":"success","data":[{"id":130602,"parentId":130600,"name":"新市区"},{"id":130603,"parentId":130600,"name":"北市区"},{"id":130604,"parentId":130600,"name":"南市区"},{"id":130621,"parentId":130600,"name":"满城县"},{"id":130622,"parentId":130600,"name":"清苑县"},{"id":130623,"parentId":130600,"name":"涞水县"},{"id":130624,"parentId":130600,"name":"阜平县"},{"id":130625,"parentId":130600,"name":"徐水县"},{"id":130626,"parentId":130600,"name":"定兴县"},{"id":130627,"parentId":130600,"name":"唐县"},{"id":130628,"parentId":130600,"name":"高阳县"},{"id":130629,"parentId":130600,"name":"容城县"},{"id":130630,"parentId":130600,"name":"涞源县"},{"id":130631,"parentId":130600,"name":"望都县"},{"id":130632,"parentId":130600,"name":"安新县"},{"id":130633,"parentId":130600,"name":"易县"},{"id":130634,"parentId":130600,"name":"曲阳县"},{"id":130635,"parentId":130600,"name":"蠡县"},{"id":130636,"parentId":130600,"name":"顺平县"},{"id":130637,"parentId":130600,"name":"博野县"},{"id":130638,"parentId":130600,"name":"雄县"},{"id":130681,"parentId":130600,"name":"涿州市"},{"id":130682,"parentId":130600,"name":"定州市"},{"id":130683,"parentId":130600,"name":"安国市"},{"id":130684,"parentId":130600,"name":"高碑店市"},{"id":130698,"parentId":130600,"name":"高开区"},{"id":130699,"parentId":130600,"name":"其它区"}],"success":true}
}

module.exports = homeApi
