// Add this snippet to your shop under: customer events > Add custom pixel
console.log('Web pixel loaded');

(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-556R6K5');

const CODE_HELPER = {
  getItemsFromLineItems(lineItems) {
    let items = [];
    for (const item of lineItems) {
      items.push({
        item_id: item.variant.product.id,
        item_name: item.variant.product.title,
        currency: item.variant.price.currencyCode,
        price: item.variant.price.amount,
        quantity: item.quantity,
      });
    }

    return items;
  },

  getPageViewData(evt) {
    let ctx = evt.context;
    return {
      event: 'page_view',
      page_location: ctx.document.location.href,
      page_title: ctx.document.title,
      language: ctx.navigator.language,
    };
  },

  getCollectionViewData(evt) {
    return {
      event: 'view_collection',
      collection_title: evt.data.collection.title,
    };
  },

  getSearchData(evt) {
    return {
      event: 'search_submitted',
      search_term: evt.data.searchResult.query,
    };
  },

  getViewItemData(evt) {
    return {
      event: 'view_item',
      currency: evt.data.productVariant.price.currencyCode,
      value: evt.data.productVariant.price.amount,
      items: [
        {
          item_id: evt.data.productVariant.id,
          item_name: evt.data.productVariant.product.title,
        },
      ],
    };
  },

  getAddToCartData(evt) {
    return {
      event: 'add_to_cart',
      currency: evt.data.cartLine.merchandise.price.currencyCode,
      value: evt.data.cartLine.merchandise.price.amount,
      items: [
        {
          item_id: evt.data.cartLine.merchandise.id,
          item_name: evt.data.cartLine.merchandise.product.title,
        },
      ],
    };
  },

  getCustomEventData(evt) {
    return {
      currency: evt.customData.currency,
      value: evt.customData.value,
      items: evt.customData.items,
    };
  },

  getPaymentInfoData(evt) {
    return {
      currency: evt.data.checkout.currencyCode,
      value: evt.data.checkout.totalPrice.amount,
      items: this.getItemsFromLineItems(evt.data.checkout.lineItems),
    };
  },

  getCheckoutStartData(evt) {
    return {
      event: 'checkout_started',
      currency: evt.data.checkout.currencyCode,
      value: evt.data.checkout.totalPrice.amount,
      items: this.getItemsFromLineItems(evt.data.checkout.lineItems),
    };
  },

  getCheckoutInfoData(evt) {
    return {
      event: 'checkout_info',
      currency: evt.data.checkout.currencyCode,
      value: evt.data.checkout.totalPrice.amount,
      items: this.getItemsFromLineItems(evt.data.checkout.lineItems),
    };
  },

  getCheckoutAdressData(evt) {
    return {
      event: 'checkout_address',
      currency: evt.data.checkout.currencyCode,
      value: evt.data.checkout.totalPrice.amount,
      items: this.getItemsFromLineItems(evt.data.checkout.lineItems),
    };
  },

  getCheckoutShippingData(evt) {
    return {
      event: 'checkout_shipping',
      currency: evt.data.checkout.currencyCode,
      value: evt.data.checkout.totalPrice.amount,
      items: this.getItemsFromLineItems(evt.data.checkout.lineItems),
    };
  },

  getCheckoutPaymentData(evt) {
    return {
      event: 'checkout_payment',
      currency: evt.data.checkout.currencyCode,
      value: evt.data.checkout.totalPrice.amount,
      items: this.getItemsFromLineItems(evt.data.checkout.lineItems),
    };
  },

  getCheckoutData(evt) {
    return {
      currency: evt.data.checkout.currencyCode,
      value: evt.data.checkout.totalPrice.amount,
      items: this.getItemsFromLineItems(evt.data.checkout.lineItems),
    };
  },

  getCheckoutCompletData(evt) {
    return {
      event: 'purchase',
      transaction_id: evt.data.checkout.order.id,
      currency: evt.data.checkout.currencyCode,
      value: evt.data.checkout.totalPrice.amount,
      shipping: evt.data.checkout.shippingLine.price.amount,
      items: this.getItemsFromLineItems(evt.data.checkout.lineItems),
    };
  },
};

// Shopify analytics events
analytics.subscribe('checkout_address_info_submitted', async (event) => {
  window.dataLayer.push(CODE_HELPER.getCheckoutAdressData(event));
});

analytics.subscribe('checkout_completed', async (event) => {
  window.dataLayer.push(CODE_HELPER.getCheckoutCompletData(event));
});

analytics.subscribe('checkout_contact_info_submitted', async (event) => {
  window.dataLayer.push(CODE_HELPER.getCheckoutInfoData(event));
});

analytics.subscribe('checkout_shipping_info_submitted', async (event) => {
  window.dataLayer.push(CODE_HELPER.getCheckoutShippingData(event));
});

analytics.subscribe('checkout_started', async (event) => {
  window.dataLayer.push(CODE_HELPER.getCheckoutStartData(event));
});

analytics.subscribe('collection_viewed', async (event) => {
  window.dataLayer.push(CODE_HELPER.getCollectionViewData(event));
});

analytics.subscribe('page_viewed', async (event) => {
  window.dataLayer.push(CODE_HELPER.getPageViewData(event));
});

analytics.subscribe('payment_info_submitted', async (event) => {
  window.dataLayer.push(CODE_HELPER.getCheckoutPaymentData(event));
});

analytics.subscribe('product_added_to_cart', async (event) => {
  window.dataLayer.push(CODE_HELPER.getAddToCartData(event));
});

analytics.subscribe('product_viewed', async (event) => {
  window.dataLayer.push(CODE_HELPER.getViewItemData(event));
});

analytics.subscribe('search_submitted', async (event) => {
  window.dataLayer.push(CODE_HELPER.getSearchData(event));
});

// Custom analytics events - you need to trigger 'your_custom_name' before this is reachable with pixel
// analytics.subscribe("your_custom_name", async (event) => {
// window.dataLayer.push(CODE_HELPER.getCustomEventData(event));
// });
