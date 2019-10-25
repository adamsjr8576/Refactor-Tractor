class SleepRepo {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  returnAllSleepQuality() {
    return Number((this.sleepData.reduce((totalQuality, eachPerson) => {
      totalQuality += eachPerson.sleepQuality;
      return totalQuality;
    }, 0) / this.sleepData.length).toFixed(1));
  }

  returnAboveAverageSleepers(date) {
    let dataByUser = this.sleepData.reduce((arr, user) => {
      if (!arr[user.userID - 1]) {
        arr[user.userID - 1] = [user];
      } else {
        arr[user.userID - 1].push(user);
      }
      return arr;
    }, []);
    let dataDate = dataByUser[0].map(data => data.date);
    let dateIndex = dataDate.lastIndexOf(date);
    let avgSleepQualityPerUser = dataByUser.map(user => [...user].splice(dateIndex - 7, 7)).map(user => user.reduce((totalQuality, day) => {
      totalQuality += day.sleepQuality;
      return totalQuality;
    }, 0)).map(user => Number((user / 7).toFixed(2)));

    let goodSleepers = [];
    avgSleepQualityPerUser.forEach((user, index) => {
      if (user >= 3) {
        goodSleepers.push(index + 1);
      }
    });
    return goodSleepers;
  }

  returnLongestSleepers(date) {
    var dateData = this.sleepData.filter(day => day.date === date);
    var sortedSleepers = [...dateData].sort((a, b) => b.hoursSlept - a.hoursSlept);
    return sortedSleepers.filter(day => day.hoursSlept === sortedSleepers[0].hoursSlept).map(user => user.userID);
  }

  returnWeeklyLongestSleepers(date) {
    this.sleepData.splice(-5, 5);

    let dataByUser = this.sleepData.reduce((arr, user) => {
      if (!arr[user.userID - 1]) {
        arr[user.userID - 1] = [user];
      } else {
        arr[user.userID - 1].push(user);
      }
      return arr;
    }, []);
    let dataDate = dataByUser[0].map(data => data.date);
    let dateIndex = dataDate.lastIndexOf(date);
    let avgSleepHoursPerUser = dataByUser.map(user => [...user].splice(dateIndex - 7, 7)).map(user => user.reduce((totalHours, day) => {
      totalHours += day.hoursSlept;
      return totalHours;
    }, 0));
    return [Math.round(Math.max(...avgSleepHoursPerUser)), avgSleepHoursPerUser.indexOf(Math.max(...avgSleepHoursPerUser)) + 1];
  }
}



export default SleepRepo;
