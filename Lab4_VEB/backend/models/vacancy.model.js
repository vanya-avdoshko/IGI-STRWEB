import mongoose from "mongoose";

const vacancySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },    
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Vacancy = mongoose.model("Vacancy", vacancySchema);

export default Vacancy; 