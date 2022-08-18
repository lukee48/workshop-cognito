import { APIGatewayProxyEvent,  APIGatewayProxyResult } from "aws-lambda";

export const handle = async (event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    const response = {
        deliveryDate: new Date().getDate() + 3
    }

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
}
