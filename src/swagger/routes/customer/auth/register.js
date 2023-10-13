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
 *                               address:
 *                                  type: string
 *                               LGA:
 *                                  type: string
 *                            example:
 *                               shopName: Amuse Finance
 *                               password: financial
 *                               address: New Line Mall
 *                               LGA: New York, California
 *              responses:
 *                  "200":
 *                      description: Resquest Successful
 *
 *
 */
