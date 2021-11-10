import { Router } from "express";
import swaggerUI from "swagger-ui-express"
import docs from "../docs"

const router = Router();

router.use('/api-docs', swaggerUI.serve)
router.get('/api-docs', swaggerUI.setup(docs));

export default router