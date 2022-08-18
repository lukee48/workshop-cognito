import { APIGatewayProxyEvent,  APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuid } from 'uuid';
import fetch from 'node-fetch';


export const handle = async (event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    const shippingEndPoint = process.env.shipping_endpoint;
    const billingEndPoint = process.env.billing_endpoint;

    const shippingResponse = await fetch(shippingEndPoint);

    if(shippingResponse.status !== 200) {

        return {
            statusCode: shippingResponse.status,
            body: await shippingResponse.text()
        }
    }

    const shippingPayload = (await shippingResponse.json()) as any;

    const billingResponse = await fetch(billingEndPoint, {
        method: "POST"
    });

    if(billingResponse.status !== 200) {

        return {
            statusCode: billingResponse.status,
            body: await billingResponse.text()
        }
    }

    const billingPayload = (await billingResponse.json()) as any;

    const order = {
        orderNumber: uuid(),
        deliveryDate: shippingPayload.deliveryDate,
        paymentStatus: billingPayload.status
    };

    return {
        statusCode: 200,
        body: JSON.stringify(order)
    }
}
