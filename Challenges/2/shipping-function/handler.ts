import { APIGatewayProxyEvent,  APIGatewayProxyResult } from "aws-lambda";
import { CognitoJwtVerifier } from "aws-jwt-verify";

export const handle = async (event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    const token = event.headers["Authorization"];

    const verifier = CognitoJwtVerifier.create({
        userPoolId: process.env.user_pool_id,
        tokenUse: "access",
        clientId: null,
    });

    try {

        await verifier.verify(token);

        const response = {
            deliveryDate: new Date().getDate() + 3
        }
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        }

    } catch (ex) {

        console.log(ex);

        return {
            statusCode: 401,
            body: ex.message
        }
    }
}
