const mongoose = require('mongoose');


const AppointmentSchema = new mongoose.Schema({
    patient_name: {type: String, required: true, minlength: 2},
    complaint: {type: String, required: true, minlength: 8},
    date: {type: Date}
})

mongoose.model('Appointment', AppointmentSchema)