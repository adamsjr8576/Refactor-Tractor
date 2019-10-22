import UserFitness from "./UserFitness";

class Sleep extends UserFitness {
  constructor(sleepData, user) {
    super(sleepData, user);
  }

  returnAvgSleepInfo(sleepInfo) {
    return Number((this.userData.reduce((acc, day) => {
      acc += day[sleepInfo];
      return acc;
    }, 0) / this.userData.length).toFixed(2));
  };

  returnSleepInfo(date, sleepInfo) {
    return this.userData.find(day => day.date === date)[sleepInfo];
  }

  returnWeekOfSleepInfo(week, sleepInfo) {
    return this.returnWeekOfData(week, this.userData).map(day => day[sleepInfo]);
  }
}


export default Sleep;
