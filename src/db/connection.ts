import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI ?? '')
.then(() => {
	console.log('connected')
}).catch(error => {
	console.error(error)
});