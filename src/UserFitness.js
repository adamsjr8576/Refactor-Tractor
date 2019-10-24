class UserFitness {
  constructor(data, user) {
    this.userData = this.findUser(data, user.id);
  }

  findUser(data, id) {
    return data.filter(user => user.userID === id);
  }

  returnWeekOfData(date) {
    let dataDate = this.userData.map(data => data.date);
    let dateIndex = dataDate.lastIndexOf(date);
    let weekData = this.userData.slice(dateIndex - 7, dateIndex + 1);
    return weekData;
    // return [...this.userData].splice((-7 * week), 7);
  }

  returnWeek(date) {
    return this.returnWeekOfData(date).map(day => day.date);
  }

}

export default UserFitness;
