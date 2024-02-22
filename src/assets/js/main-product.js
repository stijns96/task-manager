if (!customElements.get('product-info')) {
  class ProductInfo extends HTMLElement {
    constructor() {
      super();
      this.productForm = this.querySelector('product-form');
      this.productFormQuantity = this.productForm?.querySelector('input[name="quantity"]');
      this.quantityInput = this.querySelector('quantity-input');
      this.quantityInputElement = this.quantityInput?.querySelector('input[name="quantity"]');
      this.quantityInputElement?.addEventListener('change', () => {
        this.handleQuantityInput();
      });
    }

    /**
     * handleQuantityInput
     * @description Set the quantity from the quantity input web component to the product form web component.
     */
    handleQuantityInput() {
      this.productFormQuantity.value = this.quantityInputElement.value;
    }
  }
  customElements.define('product-info', ProductInfo);
}
