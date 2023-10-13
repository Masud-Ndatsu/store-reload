/**
 * @openapi
 * /customer/products/type:
 *          get:
 *              summary: Customer Product by type
 *              operationId: customer-product-type
 *              tags:
 *                 - Customer
 *              parameters:
 *                  - in: query
 *                    name: type
 *                    required: true
 *                  - in: query
 *                    name: limit
 *                  - in: query
 *                    name: page
 *              responses:
 *                  "200":
 *                     description: Request successful
 *
 *
 */
