/**
 * @openapi
 * /customer/orders/{orderId}:
 *          delete:
 *              summary: Delete Order by orderId
 *              operationId: delete-order-id
 *              tags:
 *                 - Customer
 *              parameters:
 *                  - in: path
 *                    name: orderId
 *                    required: true
 *              responses:
 *                  "200":
 *                     description: Request successful
 *
 *
 */
