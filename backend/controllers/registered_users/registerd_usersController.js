import {registered_users} from "../../models/registered_users/init.js"


export const getAllUsers = async (req, res) => {
    try {
        const usersList = await registered_users.findAll(); 
        res.json(usersList);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving users" });
    }
};


export const getUser = async (req, res) => {
    try {
        const { email,password} = req.params;
        const user = email
            ? await registered_users.findOne({where:{email}}) 
            : await registered_users.findOne({ where: { password } }); 
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving user" });
    }
};

export const addUser = async (req, res) => {
    try {
        const user = await registered_users.create(req.body); 
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


