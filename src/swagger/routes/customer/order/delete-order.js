/**
 * @openapi
 * /customer/orders/{order_id}:
 *          delete:
 *              summary: Delete Order by orderId
 *              operationId: delete-order-id
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
