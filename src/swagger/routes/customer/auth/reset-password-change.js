/**
 * @openapi
 * /customer/auth/reset-password-change:
 *          post:
 *              summary: Customer Reset Password
 *              operationId: customer-reset-password
 *              tags:
 *                 - Customer
 *              requestBody:
 *                   required: true
 *                   content:
 *                      application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                               email:
 *                                  type: string
 *                               new_password:
 *                                  type: string
 *              responses:
 *                  "200":
 *                      description: Resquest Successful
 *
 *
 */
