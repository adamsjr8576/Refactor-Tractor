class UserFitness {
  constructor(data, user) {
    this.userData = this.findUser(data, user.id);
  }

  findUser(data, id) {
    return data.filter(user => user.userID === id);
  }

  returnWeekOfData(date) {
    let dataDate = this.userData.map(data => data.date);
    let dateIndex = dataDate.indexOf(date);
    let weekData = this.userData.slice(dateIndex - 7, dateIndex + 1);
    console.log("weekDate: ", weekData);
    return weekData;
  }

  returnWeek(date) {
    return this.returnWeekOfData(date).map(day => day.date);
  }

  returnAvgInfo(property) {
    return Number((this.userData.reduce((acc, day) => {
      acc += Number(day[property]);
      return acc;
    }, 0) / this.userData.length).toFixed(2));
  };

}

export default UserFitness;
