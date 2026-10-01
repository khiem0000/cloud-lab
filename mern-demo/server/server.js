const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


// ==========================
// Kết nối MongoDB Atlas
// ==========================

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:");
        console.error(error);
    });


// ==========================
// Student Model
// ==========================

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    }
});

const Student = mongoose.model("Student", studentSchema);


// ==========================
// API kiểm tra Backend
// ==========================

app.get("/api/hello", (req, res) => {
    res.json({
        message: "Backend is running"
    });
});


// ==========================
// GET danh sách sinh viên
// ==========================

app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find();

        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// ==========================
// POST thêm sinh viên
// ==========================

app.post("/api/students", async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});


// ==========================
// PUT cập nhật sinh viên
// ==========================

app.put("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});


// ==========================
// DELETE sinh viên
// ==========================

app.delete("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// ==========================
// Start Server
// ==========================

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});