import Vacancy from "../models/vacancy.model.js";
import mongoose from "mongoose";

export const getVacancies = async (req, res) => {
    try {
        const vacancy = await Vacancy.find();
        res.status(200).json({success: true, data: vacancy});
    } catch (error) {
        console.log("Error fetching vacancies:", error.message);
        res.status(500).json({success: false, message: "Error fetching vacancies"});
    }
}

export const createVacancy  = async (req, res) => {
    const vacancy = req.body;    
    if(!vacancy.name || !vacancy.description || !vacancy.image || !vacancy.salary) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }
    const newVacancy = new Vacancy(vacancy);
    try {
        await newVacancy.save();
        res.status(201).json({success: true, message: "Vacancy created successfully", data: newVacancy});
    } catch (error) {
        console.error("Error creating vacancy:", error.message);
        res.status(500).json({success: false, message: "Error creating vacancy"});  
    }
}