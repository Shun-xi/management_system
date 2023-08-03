// Commitizen 配置文件
// 定义提交类型列表
module.exports = {
  types: [
    {
      value: "feat",
      name: "feat:      增加新功能",
    },
    {
      value: "fix",
      name: "fix:       修改bug",
    },
    {
      value: "docs",
      name: "docs:      项目文档发生改变",
    },
    {
      value: "style",
      name: "style:     不影响功能但是调整了代码的格式(空白字符，格式调整，缺少分号等)",
    },
    {
      value: "refactor",
      name: "refactor:  既没用修复bug也没有增加新功能",
    },
    {
      value: "perf",
      name: "perf:      提升性能",
    },
    {
      value: "test",
      name: "test:      测试",
    },
    {
      value: "chore",
      name: "chore:     修改构建工具配置或其他配置和文档生成等库",
    },
    {
      value: "revert",
      name: "revert:    代码回滚",
    },
    {
      value: "WIP",
      name: "WIP:       工作中",
    },
  ],

  // 定义提交范围列表
  scopes: [
    { name: "home" },
    { name: "store" },
    { name: "account" },
    { name: "menu" },
    { name: "more" },
  ],

  // 是否使用预备的提交信息
  usePreparedCommit: false,
  // 是否允许使用票号
  allowTicketNumber: false,
  // 是否要求票号
  isTicketNumberRequired: false,
  // 票号前缀
  ticketNumberPrefix: "TICKET-",
  // 票号匹配规则
  ticketNumberRegExp: "\\d{1,5}",

  // 提示消息的配置
  messages: {
    type: "选择您要提交的更改类型:",
    scope: "\n指定此更改的范围（可选）:",
    customScope: "指定此更改的范围:",
    subject: "写一个简短、命令式的描述:\n",
    body: "提供更改的详细描述（可选）。使用“|”来换行:\n",
    breaking: "列出任何重大更改（可选）:\n",
    footer: "列出此更改所解决的任何问题（可选）。例如：#31, #34:\n",
    confirmCommit: "您确定要继续上面的提交吗?",
  },

  // 是否允许自定义提交范围
  allowCustomScopes: true,
  // 允许提交类型中包含重大更改
  allowBreakingChanges: ["feat", "fix"],
  // 提交主题的字符数限制
  subjectLimit: 100,
};
