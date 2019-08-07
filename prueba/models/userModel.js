import mongoose, {
    Schema
} from 'mongoose';

/**
 * Create database scheme for notes
 */
const UserScheme = new Schema({
    identify: {
        type: Number,
        required: "What is the user Identify?"
    },
    name: {
        type: String,
        required: "What is the name?"
    },
     lastname: {
        type: String,
        required: "What is the lastname?"
    },
    birthday: {
        type: String,
        required: "What is the birthday?"
    }
});

export default mongoose.model('User', UserScheme);