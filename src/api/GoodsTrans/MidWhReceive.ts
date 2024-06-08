import request from '../../utils/request';

// 仓库发出-提交
export const ConfirmMidRecive = async (data: any, vouchCode: string) => {
  const res = await request({
    url: '/GTSaleOrderDetail/ConfirmMidRecive' + '?vouchCode=' + vouchCode,
    method: 'post',
    data: data
  });
  return res.data;
};

//  仓库发出-扫描单号
export const GetMidReciveInfo = async (data: any) => {
  const res = await request({
    url: '/GTSaleOrder/GetMidReciveInfo',
    method: 'get',
    params: data,
    noshowMsg: true
  });
  return res.data;
};

//  仓库发出-获取仓库
export const GetWareHouse = async (data: any) => {
  const res = await request({
    url: '/GTSaleOrder/GetWareHouse',
    method: 'get',
    params: data,
    noshowMsg: true
  });
  return res.data;
};
