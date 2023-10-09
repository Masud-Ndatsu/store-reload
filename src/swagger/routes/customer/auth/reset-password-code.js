/**
 * @openapi
 * /customer/auth/reset-password-code:
 *          post:
 *              summary: Customer Forgot Password Code
 *              operationId: customer-forgot-password-code
 *              tags:
 *                 - Customer
 *              requestBody:
 *                   required: true
 *                   content:
 *                      application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                               code:
 *                                  type: string
 *              responses:
 *                  "200":
 *                      description: Resquest Successful
 *
 *
 */
