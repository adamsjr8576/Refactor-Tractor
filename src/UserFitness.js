class UserFitness {
  constructor(data, user) {
    this.userData = this.findUser(data, user.id);
  }

  findUser(data, id) {
    return data.filter(user => user.userID === id);
  }

  returnWeekOfData(week) {
    return [...this.userData].splice((-7 * week), 7);
  }

  returnWeek(week) {
    return this.returnWeekOfData(week).map(day => day.date);
  }

}

export default UserFitness;