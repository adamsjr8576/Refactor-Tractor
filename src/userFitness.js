class UserFitness {
  constructor(sleepData, activityData, hydrationData, userID) {
    this.sleepData = sleepData;
    this.activityData = activityData;
    this.HydrationData = hydrationData;
    this.userID = userID;
  }

  findUser(data) {
    return data.filter(user => user.userID === this.userID);
  }

}

module.exports = UserFitness;
