import { Router } from 'express';
import userRoutes from './user-routes.js';
import chatRoutes from './chat-routes.js';
const appRouter = Router();
//seems to be the chain of routers to diffrent end points 
//depending on the different links(eg.domain / api / v1 / chats)
appRouter.use("/user", userRoutes); //domain/api/v1/user
appRouter.use("/chat", chatRoutes);
export default appRouter;
//# sourceMappingURL=index.js.map