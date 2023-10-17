/**
 * @openapi
 * /customer/products/search:
 *          get:
 *              summary: Customer Product by searchText
 *              operationId: customer-product-search
 *              tags:
 *                 - Customer
 *              parameters:
 *                  - in: query
 *                    name: search_text
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
