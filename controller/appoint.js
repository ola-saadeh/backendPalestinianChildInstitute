const appointSchema = require('../models/appoint');

exports.create = async (req, res) => {
    try {
        // قراءة البيانات من جسم الطلب (req.body)
        const { spicalistId, selectedDays, selectedSlots, classRoom } = req.body;

        // إنشاء نموذج البيانات
        const newappoint = new appointSchema({
            spicalistId,
            selectedDays,
            selectedSlots,
            classRoom,
        });

        // حفظ البيانات في قاعدة البيانات
        const savedAppoint = await newappoint.save();
 
        // إرسال رد بنجاح
        res.status(201).json({ success: true, data: savedAppoint }); 
    } catch (error) {
        // إرسال رد في حالة حدوث خطأ
        res.status(500).json({ success: false, error: error.message });
    }
};
 
exports.getAppointmentsBySpecialist = async (req, res) => {
    try {
        const spicalistId = req.params.spicalistId;

        // البحث عن جميع المواعيد التابعة للمتخصص
        const appointments = await appointSchema.find({ spicalistId });

        // إرسال رد ناجح
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        // إرسال رد في حالة حدوث خطأ
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;

        // البحث عن الموعد وحذفه
        const deletedAppointment = await appointSchema.findByIdAndDelete(appointmentId);

        if (!deletedAppointment) {
            // في حالة عدم العثور على الموعد
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        // إرسال رد بنجاح
        res.status(200).json({ success: true, data: deletedAppointment });
    } catch (error) {
        // إرسال رد في حالة حدوث خطأ
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteAppointmentsBySpecialist = async (req, res) => {
    try {
        const spicalistId = req.params.spicalistId;

        // البحث عن المواعيد وحذفها بناءً على spicalistId
        const deletedAppointments = await appointSchema.deleteMany({ spicalistId });

        if (deletedAppointments.deletedCount === 0) {
            // في حالة عدم العثور على المواعيد
            return res.status(404).json({ success: false, message: 'No appointments found for the specified specialist' });
        }

        // إرسال رد بنجاح
        res.status(200).json({ success: true, data: `Deleted ${deletedAppointments.deletedCount} appointments` });
    } catch (error) {
        // إرسال رد في حالة حدوث خطأ
        res.status(500).json({ success: false, error: error.message });
    }
};