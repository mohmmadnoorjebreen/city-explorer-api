class moveModel {
    constructor(value){
      this.title = value.original_title,
      this.overview = value.overview
      this.average_votes = value.vote_average
      this.total_votes = value.vote_count
      this.image_url= value.poster_path
      this.popularity = value.popularity
      this.released_on = value.release_date
    }
  }
  
module.exports = moveModel;



