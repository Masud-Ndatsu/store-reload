/**
 * @openapi
 * /customer/users/wallet/debit:
 *          post:
 *              summary: Customer Wallet Debit
 *              operationId: customer-wallet-debit
 *              tags:
 *                 - Customer
 *              requestBody:
 *                   required: true
 *                   content:
 *                      application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                               amount:
 *                                  type: number
 *                            example:
 *                                 amount: 1000
 *              responses:
 *                  "200":
 *                     description: Request successful
 *
 *
 */
