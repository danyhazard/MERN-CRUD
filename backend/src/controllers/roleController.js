import Role from "../models/Role.js";

export const getRoles = async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
};

export const createRole = async (req, res) => {
  const { key, name, permissions } = req.body;

  try {
    const role = new Role({
      key,
      name,
      permissions: permissions || [],
    });

    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;

  const role = await Role.findByIdAndUpdate(
    id,
    { permissions },
    { new: true }
  );

  res.json(role);
};
