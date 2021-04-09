
const typeDefinition = `
 extend type Query  {
    guestUser: AuthToken
	registeredUser(encodeStr : String!):AuthToken,
	refreshToken(currentToken : String!):AuthToken,
	invalidateToken(currentToken : String!) :String,
	oAuthToken(encodeStr : String!) : AuthToken,
	envAuthToken(encodeStr : String!) : AuthToken
}
type AuthToken{
	auth_type:String,
	customer_id:String,
	customer_no:String
	token: String,
	scope:String,
	token_type: String,
	expires_in : Int,
	error : String
}

`

export default typeDefinition;