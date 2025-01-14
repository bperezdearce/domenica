import "reflect-metadata";
import server from "./server";
import { AppDataSource } from "./config/data-source";
import { PORT } from "./config/envs";

AppDataSource.initialize()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto 3000`);
    });
    console.log("Base de Datos conectada");
  })
  .catch((error: any) => {
    console.error("Error al inicializar la base de datos:", error);
  });