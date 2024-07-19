# Shopify App Template - Bulk Pricing Cart Transform Function (app with extensions only)

This template for building a Cart Transform Function applies dynamic line item pricing based on the line item quantity added to the cart. This app does not include an app home UI.

It contains the basics for building a Shopify app that uses only app extensions. (https://shopify.dev/docs/apps/getting-started)
a
## Getting started

### Requirements

1. You must [download and install Node.js](https://nodejs.org/en/download/) if you don't already have it.
1. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don’t have one.
1. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).

### Clone the project
```
git clone https://github.com/nf-shopify/bulk-pricing.git
```
You can find function within /extensions/bulk-pricing-function

### Prerequisites

1. Creation of a json metafield on the varirant object to contain minimum quantity - namespace: "custom", key: "bulk_prices"
```
{
   "bulkPrices":[
      {
         "quantity":1,
         "price":"399.99"
      },
      {
         "quantity":4,
         "price":"299.99"
      },
      {
         "quantity":6,
         "price":"199.99"
      },
      {
        "quantity":8,
        "price":"99.99"
      }
   ]
}
```


### Local Development

[The Shopify CLI](https://shopify.dev/docs/apps/tools/cli) connects to an app in your Partners dashboard. It provides environment variables and runs commands in parallel..

You can develop locally using your preferred package manager. Run one of the following commands from the root of your app.

Using npm:

```shell
npm run dev
```

Open the URL generated in your console. Once you grant permission to the app, you can start to to test the function in your store.


## Developer resources

- [Introduction to Shopify apps](https://shopify.dev/docs/apps/getting-started)
- [App authentication](https://shopify.dev/docs/apps/auth)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
- [Shopify API Library documentation](https://github.com/Shopify/shopify-api-js#readme)



