var listAvgMonthBudget={"Jan":0, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0};
var listMonthHaveBudgetDays ={"Jan":0, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0, "Aug":0, "Sep":0, "Oct":0, "Nov":0, "Dec":0};
var listMonthName={"01":"Jan","02":"Feb","03":"Mar", "04":"Apr", "05":"May", "06":"Jun", "07":"Jul", "08":"Aug", "09":"Sep", "10":"Oct", "11":"Nov", "12":"Dec"};
var listMonthDays = {"Jan":31, "Feb":28, "Mar":31, "Apr":30, "May":31, "Jun":30, "Jul":31, "Aug":31, "Sep":30, "Oct":31, "Nov":30, "Dec":313}; 
var arrayMonthName=["Jan","Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var finalBudget =0;

function budget(monthlyBudget, StartDate, EndDate){
  finalBudget=0;
  //判斷開始日期與結束日期是否為跨年年份

  if (!StartDate || !EndDate){
    return "請輸入預算期間";
  }
  
  var startYear = StartDate.substr(0,4);
  var endYear = EndDate.substr(0,4);

  if (startYear==endYear){
    finalBudget=calBudget(monthlyBudget[startYear], StartDate, EndDate);
  } else{
    var startYearInt = parseInt(StartDate.substr(0,4));
    var endYearInt = parseInt(EndDate.substr(0,4));
  
    while ( startYearInt <= endYearInt  ) {

      //if (startYearInt == 2020){
      if (leapYear(startYearInt)==true){      
        listMonthDays["Feb"]=29;
      }else{
        listMonthDays["Feb"]=28;
      }
      if (startYearInt == parseInt(StartDate.substr(0,4))){
        finalBudget += calBudget(monthlyBudget[startYearInt.toString()], StartDate, startYearInt.toString()+"1231");
      } else if((startYearInt == parseInt(EndDate.substr(0,4)))){
        finalBudget += calBudget(monthlyBudget[startYearInt.toString()], endYearInt.toString()+"0101", EndDate);
      }else {
        finalBudget += calBudget(monthlyBudget[startYearInt.toString()], startYearInt.toString()+"0101", startYearInt.toString()+"1231");
      }
      startYearInt++;
    }
  }
  return finalBudget;
  
}

function calBudget(monthlyBudget, StartDate, EndDate){
  var budget=0;
  //初始化listAvgMonthBudget
  for(var key in listAvgMonthBudget){
    listAvgMonthBudget[key]=0; 
  }
  for(var key in listMonthHaveBudgetDays){
    listMonthHaveBudgetDays[key]=0; 
  }
  //根據輸入的每月份預算，計算出每月每天的平均預算  
  calAvgMonthBudget(monthlyBudget);
  //根據輸入的開始和結束時間，計算每個月佔有預算的天數
  calMonthHasBudgetDays(StartDate, EndDate);

  //用每月的平均預算*每月有預算的天數，相加後即可得到最後的預算
  for(var key in listAvgMonthBudget){
    budget += listAvgMonthBudget[key]*listMonthHaveBudgetDays[key];
  }
  return budget;
}

module.exports = budget;

function calAvgMonthBudget(listMonthBudget){
  for(var key in listMonthBudget){
    //listAvgMonthBudget[key]=0; //初始化listAvgMonthBudget
    listAvgMonthBudget[key]=listMonthBudget[key]/listMonthDays[key];
  }
}
function calMonthHasBudgetDays(sDate,eDate){
  //先初始化listMonthHaveBudgetDays
  var totalBudgetDays = calIntervalDays(sDate,eDate); //輸入的總天數 ex:15天
  var startMonth = listMonthName[sDate.substr(4,2)]; //開始日期的月份
  var endMonth = listMonthName[eDate.substr(4,2)]; //結束日期的月份
  if (startMonth == endMonth){
    listMonthHaveBudgetDays[startMonth] = totalBudgetDays;
  } else{
    var firstMonthDays = listMonthDays[startMonth] - parseInt(sDate.substr(6,2))+1; //第一個月份有預算的天數
    listMonthHaveBudgetDays[startMonth]= firstMonthDays;
    var addMonthIndex=0;
    var nextMonthDays = listMonthDays[arrayMonthName[parseInt(sDate.substr(4,2))+addMonthIndex]];
    var lastDays = totalBudgetDays-firstMonthDays; //扣除第一個月份的天數後，剩下的天數
    while ( nextMonthDays < lastDays  ) {
      listMonthHaveBudgetDays[arrayMonthName[parseInt(sDate.substr(4,2))+addMonthIndex]] = nextMonthDays;
      lastDays=lastDays-nextMonthDays;
      addMonthIndex++;      
      nextMonthDays=listMonthDays[arrayMonthName[parseInt(sDate.substr(4,2))+addMonthIndex]];
    }
    listMonthHaveBudgetDays[endMonth]= lastDays;
  }
}

function calIntervalDays(sDate,eDate){
  var msecPerMinute = 1000 * 60;
  var msecPerHour = msecPerMinute * 60;
  var msecPerDay = msecPerHour * 24;
  var begDateStr = "" + sDate.substring(4,6) + "/" + sDate.substring(6) + "/" + sDate.substring(0,4);
  var endDateStr = "" + eDate.substring(4,6) + "/" + eDate.substring(6) + "/" + eDate.substring(0,4);
  var begDate = new Date(begDateStr);
  var endDate = new Date(endDateStr);
  var interval = endDate.getTime() - begDate.getTime();
  var days = Math.floor(interval / msecPerDay)+1;   
  return days;
}


//判斷是否為閏年
function leapYear(year) {
  return !(year % (year % 100 ? 4 : 400));
}