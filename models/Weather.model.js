class weather {
    constructor(Data){
      this.description = Data.weather.description,
      this.date = Data.valid_date
    }
  }


  module.exports = weather;