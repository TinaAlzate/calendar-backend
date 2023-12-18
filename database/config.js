const mongoose = require('mongoose');


const dbConnection = async() => {
  try {
    await mongoose.connect( process.env.BD_CNN );
    console.log('db online')
  } catch (error) {
    console.log(error)
    throw new Error('Error in database ')
  }
}

module.exports = {
  dbConnection
}