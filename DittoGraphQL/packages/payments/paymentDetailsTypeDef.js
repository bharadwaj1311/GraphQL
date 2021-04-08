
 import { gql } from 'apollo-server-express';

const typeDefinition = `
	 type Query  {
		payment: Payment
	}
	type Mutation {
		createPaymentInstrument(input:PaymentCard!):PaymentData!
	}
	type Payment {
        count: Int,
		data : [PaymentData]
    }
	type PaymentData{
		creation_date : String,
        last_modified: String,
        payment_card : PaymentCardData,
		payment_instrument_id : String
	}
	type PaymentCardData{
		card_type : String,
		credit_card_expired : Boolean ,
		expiration_month : Int,
		expiration_year : Int
		holder	:	String,
		masked_number : String,
		number_last_digits : String,
		number : String
	}	
	input PaymentCardDetails{
		card_type : String,
		credit_card_expired : Boolean ,
		expiration_month : Int,
		expiration_year : Int
		holder	:	String,
		masked_number : String,
		number_last_digits : String,
		number : String
	}
	input PaymentCard{
		payment_card : PaymentCardDetails
	}
	
	 
	 
`

export default typeDefinition;