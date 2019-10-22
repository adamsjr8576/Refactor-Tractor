class Sleep {
  constructor(sleepData, userID) {
    this.sleepData = sleepData;
    this.userID = userID;
  }

  findUser() {
    return this.sleepData.filter(user => user.userID === this.userID);
  }

  returnWeekOfData(week, userData) {
    return [...userData].splice((-7 * week), 7);
  }

  returnWeek(week) {
    var specificUser = this.findUser()
    return [...specificUser].splice(-7 * week, 7).map(day => day.date);
  }

  returnAvgSleepInfo(sleepInfo) {
    let specificUser = this.findUser();
    return Number((specificUser.reduce((acc, day) => {
      acc += day[sleepInfo];
      return acc;
    }, 0) / specificUser.length).toFixed(2));
  };

  returnSleepInfo(date, sleepInfo) {
    let specificUser = this.findUser();
    return specificUser.find(day => day.date === date)[sleepInfo];
  }

  returnWeekOfSleepInfo(week, sleepInfo) {
    let specificUser = this.findUser();
    return this.returnWeekOfData(week, specificUser).map(day => day[sleepInfo]);
  }
}


export default Sleep;
