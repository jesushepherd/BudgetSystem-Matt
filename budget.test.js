const budget = require('./budget');
var monthlyBudget = {};

//測試預算期間為單一月份的case
test('輸入1月份預算31元，期間為20190101至20190101，結果應該為1元', () => {
  monthlyBudget ={"2019":{"Jan":31, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0}};
  expect(budget(monthlyBudget, "20190101","20190101")).toBe(1);
});

test('輸入1月份預算124元，期間為20190101至20190110，結果應該為40元', () => {
  monthlyBudget ={"2019":{"Jan":124, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0}};
  expect(budget(monthlyBudget, "20190101","20190110")).toBe(40);
});

test('輸入3月份預算31元，期間為20190301至20190301，結果應該為1元', () => { 
  monthlyBudget ={"2019":{"Jan":0, "Feb":0, "Mar":31, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0}};
  expect(budget(monthlyBudget, "20190301","20190301")).toBe(1);
});

//測試輸入預算為跨月份的case
test('輸入1月份預算31元，2月份預算56元，期間為20190101至20190201，結果應該為33元', () => { 
  monthlyBudget ={"2019":{"Jan":31, "Feb":56, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0}};
  expect(budget(monthlyBudget, "20190101","20190201")).toBe(33);
});

test('輸入1月份預算31元，2月份預算56元，期間為20190101至20190301，結果應該為87元', () => {  
  monthlyBudget ={"2019":{"Jan":31, "Feb":56, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0}};
  expect(budget(monthlyBudget, "20190101","20190301")).toBe(87);
});

test('輸入1月份預算31元，3月份預算93元，期間為20190101至20190301，結果應該為37元', () => {  
  monthlyBudget ={"2019":{"Jan":31, "Feb":0, "Mar":93, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0}};
  expect(budget(monthlyBudget, "20190101","20190302")).toBe(37);
});

//測試輸入預算和預算期間都有跨年度的case，跨兩年度，且2020年為閏年
test('輸入2019-1月份預算31元，2020-1月份預算31元，期間為20190131至20200101，結果應該為2元', () => {  
  monthlyBudget ={"2019":{"Jan":31, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0},
  "2020":{"Jan":31, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0}};
  expect(budget(monthlyBudget, "20190131","20200101")).toBe(2);
});

test('輸入2019-1月份預算31元，2020-2月份預算29元，期間為20190131至20200202，結果應該為3元', () => {  
  monthlyBudget ={"2019":{"Jan":31, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0},
  "2020":{"Jan":0, "Feb":29, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0}};
  expect(budget(monthlyBudget, "20190131","20200202")).toBe(3);
});

test('輸入2019-1月份預算31元，2019-3月份預算93元，2020-1月份預算31元，期間為20190131至20200301，結果應該為122元', () => {  
  monthlyBudget ={"2019":{"Jan":31, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0},
  "2020":{"Jan":0, "Feb":0, "Mar":93, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0}};
  expect(budget(monthlyBudget, "20190131","20200301")).toBe(4);
});

//測試輸入預算和預算期間都有跨年度的case，跨3個年度，且2020年為閏年
test('輸入2019-1月份預算31元，2020-3月份預算93元，2021-7月份預算124元，期間為20190131至20210701，結果應該為98元', () => {  
  monthlyBudget ={"2019":{"Jan":31, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0},
  "2020":{"Jan":0, "Feb":0, "Mar":93, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0},
  "2021":{"Jan":0, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":124, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0}};
  expect(budget(monthlyBudget, "20190131","20210701")).toBe(98);
});

//測試輸入預算和預算期間都有跨年度的case，跨2019~2024年，且2020年和2024年皆為閏年
test('輸入2019-1月份預算31元，2020-3月份預算93元，2024-7月份預算124元，期間為20190131至20210701，結果應該為98元', () => {  
  monthlyBudget ={"2019":{"Jan":31, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0},
  "2020":{"Jan":0, "Feb":0, "Mar":93, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0},
  "2024":{"Jan":0, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":124, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0}};
  expect(budget(monthlyBudget, "20190131","20240701")).toBe(98);
});

//如果沒有輸入預算或預算日期的case
test('沒有輸入預算，結果應該為0元', () => {  
  monthlyBudget ={};
  expect(budget(monthlyBudget, "20190131","20240701")).toBe(0);
});

test('沒有輸入預算期間，結果應該出現"請輸入預算期間"的訊息', () => {  
  monthlyBudget ={"2019":{"Jan":31, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0}};
  expect(budget(monthlyBudget)).toBe("請輸入預算期間");
});


