import UserFitness from "./UserFitness";

class Activity extends UserFitness {
  constructor(activityData, user) {
    super(activityData, user);
    this.user = user;
    this.activityData = activityData;
  }

  returnMilesWalked() {
    return Number((this.user.strideLength * this.userData[this.userData.length - 1].numSteps / 5280).toFixed(2))
  }

  returnActivityDay(date, property) {
    return this.userData.find(day => day.date === date)[property];
  }

returnAverageForWeek(week, activityData) {
    let weekOfData = this.returnWeekOfData(week, this.userData);
    return Math.floor(weekOfData.reduce((acc, day) => {
      acc += day[activityData]
      return acc
    }, 0) / 7)
  }

  metStepGoal(date) {
    let numSteps = this.userData.find(day => day.date === date).numSteps
    return numSteps >= this.user.dailyStepGoal
  }

  returnAllStepGoalDays() {
    let stepGoal = this.user.dailyStepGoal;
    return this.userData.filter(day => day.numSteps >= stepGoal).map(day => day.date);
  }

  returnStepRecord() {
    return [...this.userData].sort((a, b) => b.flightsOfStairs - a.flightsOfStairs)[0].flightsOfStairs
  }

  returnFriendsStepCount() {
    let friends = this.user.friends.map(friend => this.activityData.filter(el => el.userID === friend));
    let friendDataForDates = friends.map(friend => [...friend].splice(-7));
    let totalStepsPerFriend = friendDataForDates.map(friend => friend.reduce((totalSteps, day) => {
      totalSteps += day.numSteps
      return totalSteps
    }, 0));
    var stepObj = this.user.friends.reduce((friendSteps, friend, index) => {
      friendSteps[friend] = totalStepsPerFriend[index];
      return friendSteps
    }, {})
    return [stepObj, this.user.friends[totalStepsPerFriend.indexOf(Math.max(...totalStepsPerFriend))]]
  }

  returnThreeDayStreak(activityData) {
    let specificUser = this.userData.reverse();
    let dates = [];
    specificUser.some((user, i, specificUser) => {
      if (specificUser[i][activityData] < specificUser[i + 1][activityData] && specificUser[i + 1][activityData] < specificUser[i + 2][activityData]) {
        dates.push(specificUser[i].date);
        dates.push(specificUser[i + 1].date);
        dates.push(specificUser[i + 2].date);
      }
      return dates.length === 3;
    });

    return dates;
  }

  returnTwoDayStreak(activityData) {
    var specificUser = this.userData.reverse();
    let dates = [];
    specificUser.some((user, i, specificUser) => {
      if (specificUser[i][activityData] > specificUser[i + 1][activityData]) {
        dates.push(specificUser[i].date);
        dates.push(specificUser[i + 1].date);
      }
      return dates.length === 2;
    });

    return dates;
  }


}

export default Activity;
