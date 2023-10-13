/**
 * @openapi
 * /customer/users/wallet:
 *          get:
 *              summary: Customer Wallet
 *              operationId: customer-wallet
 *              tags:
 *                 - Customer
 *              parameters:
 *                  - in: header
 *                    name: Authorization
 *                    description: Bearer token for authentication
 *                    content:
 *                       application/json:
 *                          schema:
 *                             type: string
 *              responses:
 *                  "200":
 *                     description: Request successful
 *
 *
 */
