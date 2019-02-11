// 待确认网销客户 / 已确认网销客户
const netSaleClientTableTop = {
  1: [
    {
      prop: 'type',
      label: '客户类型'
    },
    {
      prop: 'user',
      label: '客户'
    },
    {
      prop: 'langlibUser',
      label: '朗播账号'
    },
    {
      prop: 'source',
      label: '用户来源'
    },
    {
      prop: 'time',
      label: '微信添加时间'
    }
  ],
  2: [
    {
      prop: 'priority',
      label: '优先级'
    },
    {
      prop: 'type',
      label: '客户类型'
    },
    {
      prop: 'user',
      label: '客户'
    },
    {
      prop: 'langlibUser',
      label: '朗播账号'
    },
    {
      prop: 'experienceProduct',
      label: '体验产品'
    },
    {
      prop: 'relationSale',
      label: '关联电销人员'
    },
    {
      prop: 'source',
      label: '用户来源'
    },
    {
      prop: 'sensitiveBehavior',
      label: '敏感行为'
    },
    {
      prop: 'time',
      label: '微信添加时间'
    }
  ]
}

// 用户信息表头
const clientInfoTableTop = {
  1: [
    {
      prop: 'date',
      label: '联系时间'
    },
    {
      prop: 'priority',
      label: '优先级'
    },
    {
      prop: 'record',
      label: '联系记录'
    },
    {
      prop: 'name',
      label: '操作人'
    }
  ],
  2: [
    {
      prop: 'date',
      label: '时间'
    },
    {
      prop: 'operation',
      label: '操作'
    }
  ],
  4: [
    {
      prop: 'products',
      label: '已购产品'
    },
    {
      prop: 'buyTime',
      label: '购买时间'
    },
    {
      prop: 'actualPayment',
      label: '实际支付金额'
    },
    {
      prop: 'openTime',
      label: '方法课开课时间'
    },
    {
      prop: 'practiceEndTime',
      label: '在线练习/智能训练结束时间'
    },
    {
      prop: 'endTime',
      label: '陪练课结束时间'
    }
  ],
  5: [
    {
      prop: 'date',
      label: '发送时间'
    },
    {
      prop: 'message',
      label: '短信内容'
    }
  ],
  6: [
    {
      prop: 'money',
      label: '优惠券金额'
    },
    {
      prop: 'testType',
      label: '考试类型'
    },
    {
      prop: 'date',
      label: '到期时间'
    },
    {
      prop: 'name',
      label: '操作人'
    },
    {
      prop: 'status',
      label: '状态'
    },
    {
      prop: 'remark',
      label: '备注'
    }
  ]
}

export {
  netSaleClientTableTop,
  clientInfoTableTop
}
