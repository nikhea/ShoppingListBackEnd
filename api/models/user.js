const mongoose = require('mongoose');
bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	profileImageUrl: {
		type: String
	}
});

userSchema.pre('save', async function(next) {
	try {
		if (!this.isModified('password')) {
			return next();
		}
		let hashPassword = bcrypt.hash(this.password, 10);
		this.password = hashPassword;
		return next();
	} catch (error) {
		return next(error);
	}
});

userSchema.method.comparePassword = async function(userpassword, next) {
	try {
		let isMatch = await bcrypt.compare(userpassword, this.password);
		return isMatch;
	} catch (error) {
		return next(error);
	}
};

userSchema.set('timestamps', true);
let User = mongoose.model('User', userSchema);

module.exports = User;
