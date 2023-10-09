/**
 * @openapi
 * /customer/auth/register:
 *          post:
 *              summary: Customer Register
 *              operationId: customer-register
 *              tags:
 *                 - Customer
 *              requestBody:
 *                   required: true
 *                   content:
 *                      application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                               shopName:
 *                                  type: string
 *                               password:
 *                                  type: string
 *              responses:
 *                  "200":
 *                      description: Resquest Successful
 *
 *
 */
