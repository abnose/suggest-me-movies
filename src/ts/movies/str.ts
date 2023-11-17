export default class FaveMovie {
    static movieList: any = [];
    constructor() {}
  
    static addMovie(name: string, genre: string[]) {
      FaveMovie.movieList = [
        ...FaveMovie.movieList!,
        { id: Math.random(), name: name, genre: genre },
      ];
    }
  
    static removeMovie(id: number) {
      FaveMovie.movieList = FaveMovie.movieList.filter(
        (item: any) => item.id != id
      );
    }
  
    static getMovie() {
      return FaveMovie.movieList;
    }
  }