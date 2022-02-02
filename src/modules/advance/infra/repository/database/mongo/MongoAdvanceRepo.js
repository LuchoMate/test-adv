module.exports = class MongoAdvanceRepo {
	constructor(credentials) {
		super(credentials)
	}

	display() {
		console.log(this.firstName + " " + this.lastName);
	}
}
