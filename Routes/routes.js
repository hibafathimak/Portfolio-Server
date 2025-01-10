const express = require('express');
const router = new express.Router();
const messageController = require('../controllers/MessageController');  
const skillController = require('../controllers/SkillsController');  
const reminderController = require('../controllers/ReminderController');  
const multerMiddleware = require('../middlewares/multerMiddleware');
const projectController =require('../controllers/ProjectController'); 

// Skill routes
router.post('/skills', skillController.createSkillController);  
router.get('/skills', skillController.getAllSkillsController);  
router.put('/skills/:id', skillController.editSkillController);  
router.delete('/skills/:id', skillController.deleteSkillController);

// Messages routes
router.post('/send-messages', messageController.createMessageController);
router.get('/messages', messageController.getAllMessagesContoller);
router.delete('/messages/:id', messageController.deleteMessageController);

// Reminders routes
router.post('/reminders', reminderController.addReminder);  
router.get('/reminders', reminderController.getAllReminders);  
router.delete('/reminders/:id', reminderController.deleteReminder); 

//projects routes
router.post('/add-project',multerMiddleware.single('image'),projectController.addProjectController)
router.get('/all-projects',projectController.allProjectsController)
router.put('/projects/:id/edit',multerMiddleware.single('image'),projectController.editProjectController)
router.delete('/projects/:id/remove',projectController.removeProjectController)


module.exports = router;
