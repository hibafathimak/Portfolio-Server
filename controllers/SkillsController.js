const skills = require('../Models/skills');  

exports.createSkillController = async (req, res) => {
    console.log('Inside createSkillController');
    const { name, level, category } = req.body;
    try {
        const newSkill = new skills({ name, level, category });
        await newSkill.save();
        res.status(200).json("Skill added successfully!");
    } catch (error) {
        res.status(401).json(error);
    }
};

exports.getAllSkillsController = async (req, res) => {
    console.log('Inside getAllSkillsController');

    try {
        const allSkills = await skills.find();
        res.status(200).json(allSkills);
    } catch (error) {
        res.status(401).json(error);
    }
};

exports.deleteSkillController = async (req, res) => {
    console.log('Inside deleteSkillController');

    const { id } = req.params;
    try {
        const deletedSkill = await skills.findByIdAndDelete(id);
        if (!deletedSkill) {
            return res.status(404).json('Skill not found');
        }
        res.status(200).json('Skill deleted successfully');
    } catch (error) {
        res.status(401).json(error);
    }
};

exports.editSkillController = async (req, res) => {
    console.log('Inside editSkillController');

    const { id } = req.params;
    const { level } = req.body;

    try {
        const updatedSkill = await skills.findByIdAndUpdate(
            id,
            { level },  
            { new: true }  
        );

        if (!updatedSkill) {
            return res.status(404).json('Skill not found');
        }

        res.status(200).json('Skill level updated successfully');
    } catch (error) {
        res.status(401).json(error);
    }
};
