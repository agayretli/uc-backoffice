import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        default: 0,
    },
});
const Role = mongoose.model('Role', RoleSchema);
export default Role;
