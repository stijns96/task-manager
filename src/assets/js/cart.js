/* Update cart items */
if (!customElements.get('cart-items')) {
  class CartItems extends HTMLElement {
    constructor() {
      super();

      this.lineItemStatusElement = document.getElementById('shopping-cart-line-item-status');
      this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]')).reduce(
        (total, quantityInput) => total + parseInt(quantityInput.value),
        0
      );

      this.debouncedOnChange = debounce((event) => {
        if (event.target != document.getElementById('Cart-note')) {
          this.onChange(event);
        }
      }, 300);

      this.addEventListener('change', this.debouncedOnChange.bind(this));
    }

    onChange(event) {
      this.updateQuantity(
        event.target.dataset.index,
        event.target.value,
        document.activeElement.getAttribute('name'),
        event
      );
    }

    getSectionsToRender() {
      return [
        {
          id: 'main-cart-items',
          section: document.getElementById('main-cart-items').dataset.id,
          selector: '.js-cart-item-contents',
        },
        {
          id: 'main-cart-footer',
          section: document.getElementById('main-cart-footer').dataset.id,
          selector: '.js-cart-footer-contents',
        },
        {
          id: 'cart-icon-bubble',
          section: 'cart-icon-bubble',
          selector: '[data-cart-icon-bubble]',
        },
      ];
    }

    /**
     * updateQuantity
     * @description Works together with the Ajax Cart API.
     * @see https://shopify.dev/docs/api/ajax/reference/cart
     * @param {Number} line
     * @param {Number} quantity
     * @param {String} name
     * @param {Object} event
     */
    async updateQuantity(line, quantity, name, event) {
      this.enableLoading(line);

      const body = JSON.stringify({
        line,
        quantity,
        sections: this.getSectionsToRender().map((section) => section.section),
        sections_url: window.location.pathname,
      });

      try {
        const response = await fetch(`${routes.cart_change_url}`, {
          ...fetchConfig(),
          body,
        });
        const parsedState = await response.json();

        this.classList.toggle('cart-is-empty', parsedState.item_count === 0);

        // Error returned in request
        if (response.status === 422 && parsedState.errors) {
          // Read current updated quantity element
          const itemQuantityInput = document.getElementById(`Quantity-${line}`);
          const currentValue = itemQuantityInput.value;
          const maxValue = itemQuantityInput.dataset.max;
          // Reset input value quantity
          if (currentValue > maxValue) itemQuantityInput.value = maxValue;
          // Show the error message to the users
          throw new Error(parsedState.errors);
        }

        // Tell the user that something is wrong when there are no sections returned from the call.
        if (!parsedState.sections) {
          event.target.value = event.target.defaultValue;
          throw new Error(window.cartStrings.error);
        }

        // Loop sections
        this.getSectionsToRender().forEach((section) => {
          const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) ||
            document.getElementById(section.id);

          elementToReplace.innerHTML = this.getSectionInnerHTML(
            parsedState.sections[section.section],
            section.selector
          );
        });

        this.updateLiveRegions(line, parsedState.item_count);
        document.getElementById(`CartItem-${line}`)?.querySelector(`[name="${name}"]`)?.focus();
        this.disableLoading();
      } catch (error) {
        document.querySelector('[data-cart-loader-active="show"]')?.classList.add('hidden');
        document.querySelector('[data-cart-loader-active="hidden"]')?.classList.remove('hidden');
        document.getElementById('cart-errors').textContent = error
          ? error
          : window.cartStrings.error;
        this.disableLoading();
      }
    }

    // show error texts, should not be deleted.
    updateLiveRegions(line, itemCount) {
      if (this.currentItemCount === itemCount) {
        document
          .getElementById(`Line-item-error-${line}`)
          .querySelector('.cart-item__error-text').innerHTML =
          window.cartStrings.quantityError.replace(
            '[quantity]',
            document.getElementById(`Quantity-${line}`).value
          );
      }

      this.currentItemCount = itemCount;
      this.lineItemStatusElement.setAttribute('aria-hidden', true);

      const cartStatus = document.getElementById('cart-live-region-text');
      cartStatus.setAttribute('aria-hidden', false);

      setTimeout(() => {
        cartStatus.setAttribute('aria-hidden', true);
      }, 1000);
    }

    getSectionInnerHTML(html, selector = '.shopify-section') {
      return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
    }

    enableLoading(line) {
      document.querySelector('cart-items').classList.add('cart-items-is-loading');
      document.querySelector('[data-cart-loader-active="show"]')?.classList.remove('hidden');
      document.querySelector('[data-cart-loader-active="hidden"]')?.classList.add('hidden');
      document.activeElement.blur();
      this.lineItemStatusElement.setAttribute('aria-hidden', false);
    }

    disableLoading() {
      document.querySelector('cart-items').classList.remove('cart-items-is-loading');
    }
  }
  customElements.define('cart-items', CartItems);
}

/* Remove item from the cart  */
if (!customElements.get('cart-remove-button')) {
  class CartRemoveButton extends HTMLElement {
    constructor() {
      super();
      this.addEventListener('click', (event) => {
        event.preventDefault();
        this.closest('cart-items').updateQuantity(this.dataset.index, 0);
      });
    }
  }
  customElements.define('cart-remove-button', CartRemoveButton);
}

/* Update the cart note */
if (!customElements.get('cart-note')) {
  class CartNote extends HTMLElement {
    constructor() {
      super();
      this.addEventListener(
        'change',
        debounce((event) => {
          const body = JSON.stringify({ note: event.target.value });
          fetch(`${routes.cart_update_url}`, { ...fetchConfig(), ...{ body } });
        }, 300)
      );
    }
  }
  customElements.define('cart-note', CartNote);
}
