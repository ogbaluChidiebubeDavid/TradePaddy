import { Router, type IRouter } from "express";
import healthRouter from "./health";
import tradesRouter from "./trades";
import journalRouter from "./journal";
import portfolioRouter from "./portfolio";
import analysisRouter from "./analysis";
import behaviorRouter from "./behavior";
import coachingRouter from "./coaching";
import replayRouter from "./replay";
import chatRouter from "./chat";
import riskRouter from "./risk";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dashboardRouter);
router.use(tradesRouter);
router.use(journalRouter);
router.use(portfolioRouter);
router.use(analysisRouter);
router.use(behaviorRouter);
router.use(coachingRouter);
router.use(replayRouter);
router.use(chatRouter);
router.use(riskRouter);

export default router;
