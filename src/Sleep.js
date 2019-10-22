import UserFitness from "./UserFitness";

class Sleep extends UserFitness {
  constructor(sleepData, user) {
    super(sleepData, user);
  }

  returnAvgSleepHours() {
    return Number((this.userData.reduce((totalHours, day) => {
      totalHours += day.hoursSlept;
      return totalHours;
    }, 0) / this.userData.length).toFixed(2));
  }

  returnAvgSleepQuality() {
    return Number((this.userData.reduce((totalQuality, day) => {
      totalQuality += day.sleepQuality;
      return totalQuality;
    }, 0) / this.userData.length).toFixed(2));
  }

  returnSleepHours(date) {
    return this.userData.find(day => day.date === date).hoursSlept;
  }

  returnSleepQuality(date) {
    return this.userData.find(day => day.date === date).sleepQuality;
  }

  returnWeekOfSleepHours(week) {
    return this.returnWeekOfData(week).map(day => day.hoursSlept);
  }

  returnWeekOfSleepQuality(week) {
    return this.returnWeekOfData(week).map(day => day.sleepQuality);
  }
}


export default Sleep;
