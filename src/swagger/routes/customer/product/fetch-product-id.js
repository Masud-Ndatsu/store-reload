/**
 * @openapi
 * /customer/products/{productId}:
 *          get:
 *              summary: Customer Product by productId
 *              operationId: customer-product-id
 *              tags:
 *                 - Customer
 *              parameters:
 *                  - in: path
 *                    name: productId
 *                    required: true
 *              responses:
 *                  "200":
 *                     description: Request successful
 *
 *
 */