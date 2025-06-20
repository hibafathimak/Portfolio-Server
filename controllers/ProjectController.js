const Project = require('../Models/projects');

exports.addProjectController = async (req, res) => {
  console.log("Inside addProjectController");
  const { name, description, technologies, category, sourceCode, liveDemoLink } = req.body;
  
  if (!req.file) {
    return res.status(400).json("Image is required. Please upload an image.");
  }

const image = req.file.path;
  console.log("Request body:", { name, description, technologies, category, sourceCode, liveDemoLink });
  console.log("Uploaded file:", req.file.filename);

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
    console.error("Error adding project:", error);
    res.status(401).json(error);
  }
};

exports.allProjectsController = async (req, res) => {
  console.log("Inside allProjectsController");
  try {
    const allHomeProjects = await Project.find();
    res.status(200).json(allHomeProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(401).json(error);
  }
};

exports.editProjectController = async (req, res) => {
  console.log("Inside editProjectController");
  const id = req.params.id;
  const { name, description, technologies, category, sourceCode, liveDemoLink, image } = req.body;
  
const reUploadImage = req.file ? req.file.path : image;

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
    
    if (!updatedProject) {
      return res.status(404).json("Project not found");
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(401).json(error);
  }
};

exports.removeProjectController = async (req, res) => {
  console.log("Inside removeProjectController");
  const { id } = req.params;
  try {
    const deletedProject = await Project.findOneAndDelete({ _id: id });
    if (!deletedProject) {
      return res.status(404).json("Project not found");
    }
    res.status(200).json("Project deleted successfully!");
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(401).json(error);
  }
};