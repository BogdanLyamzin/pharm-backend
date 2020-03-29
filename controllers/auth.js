const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authHelper = require('../helpers/authHelper');
const {secret} = require('../config/db').jwt;

const LoginShema = require('../models/login/login');
const TokenShema =  require('../models/login/token');

const updateTokens = (userId) => {
    const accessToken = authHelper.generatorAccessToken(userId);
    const refreshToken = authHelper.generatorRefreshToken();
    authHelper.replaceDbRefreshToken(refreshToken.id, userId);
    const tokens = {
        accessToken,
        refreshToken: refreshToken.token,
        };
    return tokens
};

const signIn = async (req, res) => {
    const { login, password } = req.body;

    try {
        const user = await LoginShema.findOne( { login } ).exec();
        if ( !user ) {
            return res.status( 401 ).json( { message: 'User does not exist!' } );
        }

        try {
            const isMatch = await bcrypt.compare( password, user.password );

            if ( isMatch ) {
                const tokens = await updateTokens( user._id );
                res.json( tokens );
            } else {
                res.status( 401 ).json( { message: 'Invalid credentials!' } )
            }
        } catch (err) {
            res.status( 500 ).json( { message: err.message } )
        };
    } catch (err) {
        res.status( 500 ).json( { message: err.message } )
    }
};

const refreshTokens = async (req, res) => {
    const { refreshToken } = req.body;
    let payload;
    try {
        payload = jwt.verify( refreshToken, secret );
        if ( payload.type !== 'refresh' ) {
            res.status( 400 ).json( { message: 'Invalid token!' } );
            return;
        }

    } catch (err) {
        if ( err instanceof jwt.TokenExpiredError ) {
            res.status( 400 ).json( { message: 'Token expired!' } );
            return;
        } else if ( err instanceof jwt.JsonWebTokenError ) {
            res.status( 400 ).json( { message: 'Invalid token!' } );
            return;
        };
    }

    try {
        const token = await TokenShema.findOne( { tokenId: payload.id } ).exec();
        if ( token === null ) {
            throw new Error( 'Invalid token!' );
        }
        const tokens = updateTokens( token.userId );
        res.json( tokens );
    }  catch (err) {
        res.status( 400 ).json( { message: err.message } )
    };
};

module.exports = {
    refreshTokens,
    signIn
};