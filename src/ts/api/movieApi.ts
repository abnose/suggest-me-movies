import axios  from "axios";
import { KEY } from "@/secrets/key";
export default class Api {

    protected key : string = KEY

    constructor() {}

    request(key:string) {
        return axios.create({
            baseURL: "https://api.themoviedb.org/3",
            headers: {
            accept: "application/json",
            Authorization: key,
            },
        });
    }
}

// create() {
//     axios.create({
//         baseURL: "https://api.themoviedb.org/3",
//         headers: {
//           accept: "application/json",
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzg3YTBkOTMzZTNmNmQzYWI3ZDQ2ZjZjZjkxZmQzMSIsInN1YiI6IjYxNDczMDk2MmI1MzFkMDAyOTNhY2VmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rdes2zo_cYS-ASUUpHzUg7tUr3E8AOLpsdX4BvSHOJ4",
//         },
//     });
// }

