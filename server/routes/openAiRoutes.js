const { summaryController,paragraphController,chatbotController, jsconvertorController,scifiImageController } = require("../controllers/openAiController");

const router = require("express").Router();


router.post("/summary",summaryController)
router.post("/paragraph",paragraphController)
router.post("/chatbot",chatbotController)
router.post("/js-convertor",jsconvertorController)
router.post("/scifi-image",scifiImageController)







module.exports = router;