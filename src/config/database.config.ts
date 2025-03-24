import { connect } from "mongoose";

export const databaseConfig = {
    uri:process.env.MONGODB_URI, //uri de conexion
    options: {  //conexion con mongo
      
      //conectar con mongo
      connectTimeoutMS: 10000,
      // operaciones indivifuales
      WebSocketTimeoutMS: 45000,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    },
  };