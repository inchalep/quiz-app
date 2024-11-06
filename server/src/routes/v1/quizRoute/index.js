const Router = require("express");
const quizCtrl = require("../../../controller/v1/quiz");
const router = Router();

//topics
router.post("/add-topic", quizCtrl.addTopics);
router.post("/select-topic", quizCtrl.selectTopis);
router.post("/delete-topic", quizCtrl.deleteTopic);
router.post("/remove-selected-topic", quizCtrl.removeTopic);
router.get("/topiclist", quizCtrl.fetchTopicList);

//questions
router.post("/add-question", quizCtrl.addQuestion);
router.post("/delete-question", quizCtrl.deleteQuestion);
router.post("/edit-question", quizCtrl.editQuestion);
router.post("/fetch-questions", quizCtrl.fetchQuestion);
router.post("/update-score", quizCtrl.updateScore);

module.exports = router;
