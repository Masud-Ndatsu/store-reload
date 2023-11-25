/**
 * @openapi
 * /customer/orders/{order_id}:
 *          put:
 *              summary: Update Order by orderId
 *              operationId: update-order-id
 *              tags:
 *                 - Customer
 *              parameters:
 *                  - in: path
 *                    name: order_id
 *                    required: true
 *              requestBody:
 *                   required: true
 *                   content:
 *                      application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                               ordered_items:
 *                                  type: array
 *                                  items:
 *                                     type: string
 *                               total_price:
 *                                  type: number
 *                               shipping_address:
 *                                  type: string
 *                            example:
 *                               ordered_items:
 *                                       - "6527e94fab99fe6977ed14c5"
 *                                       - "6527e94fab99fe6977ed14c5"
 *                                       - "6527e94fab99fe6977ed14c5"
 *                                       - "6527e94fab99fe6977ed14c5"
 *                               total_price: 50000
 *                               shipping_address: Gwagwalada, Abuja, Nigeria
 *              responses:
 *                  "200":
 *                     description: Request successful
 *
 *
 */
