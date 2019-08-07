import mongoose, {
    Schema
} from 'mongoose';


const CreditScheme = new Schema({
    nit: {
        type: Number,
        required: "What is the user Nit?"
    },
    nameCompany: {
        type: String,
        required: "What is the nameCompany?"
    },
     salary: {
        type: Number,
        required: "What is the salary?"
    },
    dateEntry: {
        type: String,
        required: "What is the dateEntry?"
    },
    valueCredit :{
    	type: Number,
        required: "What is the user valueCredit?"
    },
     userId: {
        type: String,
        required: "What is the userId?"
    }
});

export default mongoose.model('Credit', CreditScheme);