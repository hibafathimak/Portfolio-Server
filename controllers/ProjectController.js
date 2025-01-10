const Project = require('../Models/projects');

exports.addProjectController = async (req, res) => {
  console.log("Inside addProjectController");
  const { name, description, technologies, category, sourceCode, liveDemoLink } = req.body;
  console.log(req.file.filename);
  const image = req.file.filename; 
  console.log(name, description, technologies, category, sourceCode, liveDemoLink, image);

  try {
    const existingProject = await Project.findOne({ sourceCode });
    if (existingProject) {
      res
        .status(406)
        .json("Project already exists in our collection. Please upload another.");
    } else {
      const newProject = new Project({
        name,
        description,
        technologies,
        category,
        image,
        sourceCode,
        liveDemoLink,
      });
      await newProject.save();
      res.status(200).json(newProject);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.allProjectsController = async (req, res) => {
  console.log("Inside allProjectsController");
  try {
    const allHomeProjects = await Project.find()
    res.status(200).json(allHomeProjects);
  } catch (error) {
    res.status(401).json(error);
  }
};



exports.editProjectController = async (req, res) => {
  console.log("Inside editProjectController");
  const id = req.params.id;
  const { name, description, technologies, category, sourceCode, liveDemoLink, image } = req.body;
  const reUploadImage = req.file ? req.file.filename : image;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      { _id: id },
      {
        name,
        description,
        technologies,
        category,
        image: reUploadImage,
        sourceCode,
        liveDemoLink,
      },
      { new: true }
    );
    await updatedProject.save();
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.removeProjectController = async (req, res) => {
  console.log("Inside removeProjectController");
  const { id } = req.params;
  try {
    const deletedProject = await Project.findOneAndDelete({ _id: id });
    res.status(200).json("Project deleted successfully!");
  } catch (error) {
    res.status(401).json(error);
  }
};
