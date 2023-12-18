const jwt = require('jsonwebtoken');

const generateJWT = ( uid, name ) => {

  return new Promise( ( resolve, reject ) => {

    const payload = { uid, name};

    jwt.sign( payload, process.env.SECRET_JWT_SEED, {

      expiresIn: '2h'

    }, ( err, token ) => {
      if ( err ){
        // Es importante saber que no siempre es bueno mostrar el error directamente porque podemos estar exponiendo información sensible del servidor
        reject( 'Token could not be generated' )
      }
      resolve( token )
    })
  })
}

module.exports = {
  generateJWT
}