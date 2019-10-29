import UserFitness from "./UserFitness";

class Sleep extends UserFitness {
  constructor(sleepData, user) {
    super(sleepData, user);
  }

  returnSleepInfo(date, sleepInfo) {
    return this.userData.find(day => day.date === date)[sleepInfo];
  }

  returnWeekOfSleepInfo(date, sleepInfo) {
    return this.returnWeekOfData(date, this.userData).map(day => day[sleepInfo]);
  }
}


export default Sleep;
