/**
 * @openapi
 * /customer/users/me:
 *          get:
 *              summary: Customer Profile
 *              operationId: customer-profile
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
