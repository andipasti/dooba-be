import authRoutes from "./auth";
import userRoutes from "./user";
import usersRoutes from  "./users"

const swagger = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for Dooba',
    version: '1.0.0',
    description: 'The REST API for Dooba service'
  },
  paths: {
    ...authRoutes,
    ...userRoutes,
    ...usersRoutes,
  },
}

export default swagger