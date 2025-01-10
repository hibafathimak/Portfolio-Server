
const messages = require('../Models/messages'); 

exports.createMessageController = async (req, res) => {
    console.log('Inside createMessageController')
    const { name, email, message } = req.body;
    console.log(name, email, message);
    
  try {

    const date = new Date().toISOString();
    const newMessage = new messages({ name, email, message,date});
    await newMessage.save();
    res.status(200).json("Message sent successfully!");
  } catch (error) {
    res.status(401).json(error);
  }
}

exports.getAllMessagesContoller = async (req, res) => {
    console.log('Inside getAllMessagesContoller')

  try {
    const allmessages = await messages.find();
    res.status(200).json(allmessages);
  } catch (error) {
    res.status(401).json(error);
  }
};


exports.deleteMessageController =  async (req, res) => {
    console.log('Inside deleteMessageController')

    const {id} = req.params
  try {
    const deletedMessage = await messages.findByIdAndDelete(id);
    if (!deletedMessage) {
        res.status(404).json('Message not found');
    } 
    res.status(200).json('Message deleted successfully');
  } catch (error) {
    res.status(401).json(error);
  }
};


