import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        lang: {
            type: String,
            default: 'en',
        },
        passwordResetToken: {
            type: String,
        },
        passwordResetTokenDt: {
            type: Date,
        },
    },
    { timestamps: true }
);
const User = mongoose.model('User', UserSchema);
export default User;
