import { APIGatewayProxyEvent,  APIGatewayProxyResult } from "aws-lambda";

export const handle = async (event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    const response = {
        status: "PAID"
    }

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }



}
