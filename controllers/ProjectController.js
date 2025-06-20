const Project = require('../Models/projects');
const { v2: cloudinary } = require('cloudinary');


exports.addProjectController = async (req, res) => {
  console.log("Inside addProjectController");
  const { name, description, technologies, category, sourceCode, liveDemoLink } = req.body;

  if (!req.file) {
    return res.status(400).json("Image is required. Please upload an image.");
  }

  try {
    let imageUrl = "";
    if (req.file?.path) {
      const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto" });
      imageUrl = result.secure_url;
    }

    const existingProject = await Project.findOne({ sourceCode });
    if (existingProject) {
      return res.status(406).json("Project already exists in our collection. Please upload another.");
    }

    const newProject = new Project({
      name,
      description,
      technologies,
      category,
      image: imageUrl,
      sourceCode,
      liveDemoLink,
    });

    await newProject.save();
    res.status(200).json(newProject);
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

  try {
    let newImage = image;
    if (req.file?.path) {
      const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto" });
      newImage = result.secure_url;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      { _id: id },
      {
        name,
        description,
        technologies,
        category,
        image: newImage,
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