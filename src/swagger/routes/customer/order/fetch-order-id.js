/**
 * @openapi
 * /customer/orders/{orderId}:
 *          get:
 *              summary: Customer Order by orderId
 *              operationId: customer-order-id
 *              tags:
 *                 - Customer
 *              parameters:
 *                  - in: path
 *                    name: order_id
 *                    required: true
 *              responses:
 *                  "200":
 *                     description: Request successful
 *
 *
 */
