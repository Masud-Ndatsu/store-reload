/**
 * @openapi
 * /customer/products/category:
 *          get:
 *              summary: Customer Product by category
 *              operationId: customer-product-category
 *              tags:
 *                 - Customer
 *              parameters:
 *                  - in: query
 *                    name: category
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
