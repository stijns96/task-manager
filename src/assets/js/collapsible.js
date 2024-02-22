/*
Make a collapsible webcomponent

HTML Usage with single group
<collapsible-element data-options='{}'>
  <div class="group" data-collapsible-group>
    <button
      type="button"
      data-collapsible-trigger
    >
      The trigger
      {%- render 'global-icon',
        icon: 'chevron-down',
        icon_class: 'w-3 absolute right-0 top-1/2 -translate-y-1/2 rotate-0 group-[.collapsible-is-open]:rotate-180'
      -%}
    </button>
    <div
      class="
        group-[.collapsible-is-open]:your-tailwind-class-state-example
      "
      data-collapsible-target
    >
      <div class="overflow-hidden">
        Your content goes here.
      </div>
    </div>
  </div>
</collapsible-element>

HTML Usage with multiple & nested groups
<collapsible-element
  data-options='
    {
      "closeSiblings": true
    }
  '
>
  <div class="group" data-collapsible-group>
    <button
      type="button"
      data-collapsible-trigger
    >
      The trigger
      {%- render 'global-icon',
        icon: 'chevron-down',
        icon_class: 'w-3 absolute right-0 top-1/2 -translate-y-1/2 rotate-0 group-[.collapsible-is-open]:rotate-180'
      -%}
    </button>
    <div
      class=""
      data-collapsible-target
    >
      <div class="overflow-hidden">
        Your content goes here.
      </div>
    </div>
  </div>
  <div class="group" data-collapsible-group>
    <button
      type="button"
      data-collapsible-trigger
    >
      The trigger
      {%- render 'global-icon',
        icon: 'chevron-down',
        icon_class: 'w-3 absolute right-0 top-1/2 -translate-y-1/2 rotate-0 group-[.collapsible-is-open]:rotate-180'
      -%}
    </button>
    <div
      class=""
      data-collapsible-target
    >
      <div class="overflow-hidden">
        Your content goes here.
      </div>
    </div>
  </div>
</collapsible-element>
*/

if (!customElements.get('collapsible-element')) {
  class Collapsible extends HTMLElement {
    constructor() {
      super();

      // Options
      this.options = {
        toggleClass: 'collapsible-is-open',
        toggleBodyClass: '',
        closeSiblings: false,
        closeChildren: true,
        onHover: false,
        hoverDelay: 0,
        closeOnMouseleave: false,
      };

      // Get options from element data and combine with this.options
      if (this?.dataset?.options) {
        const dataOptions = JSON.parse(this.dataset.options);
        this.options = {
          ...this.options,
          ...dataOptions,
        };
      }

      // Reduce actions (So the event can also be removed)
      this.reducer = {
        clickTarget: (e) => this.debounceClickEvent(e),
        mouseEnterTarget: (e) => this.debouncedOnMouse(e, 'open'),
        mouseLeaveGroup: (e) => this.debouncedOnMouse(e, 'close'),
        mouseLeaveContainer: (e) => this.debouncedOnMouse(e, 'closeAll'),
      };

      this.timeout = null;

      // Construct webcomponent
      this.construct();
    }

    /*
      Construct webcomponent
    */
    construct() {
      // Init elements
      this.groups = this.hasAttribute('data-collapsible-group')
        ? [this.closest('[data-collapsible-group]')]
        : this.querySelectorAll('[data-collapsible-group]');
      this.triggers = this.querySelectorAll('[data-collapsible-trigger]');

      // Init events
      // Trigger events on [data-collapsible-trigger]
      this.triggers.forEach((trigger) => {
        trigger.removeEventListener('click', this.reducer.clickTarget);
        trigger.addEventListener('click', this.reducer.clickTarget);

        // Mouse enter
        if (this.options.onHover) {
          trigger.removeEventListener('mouseenter', this.reducer.mouseEnterTarget);
          trigger.addEventListener('mouseenter', this.reducer.mouseEnterTarget);
        }
      });

      // Trigger events on [data-collapsible-group]
      this.groups.forEach((group) => {
        // Mouse leave
        if (this.options.onHover) {
          group.removeEventListener('mouseleave', this.reducer.mouseLeaveGroup);
          group.addEventListener('mouseleave', this.reducer.mouseLeaveGroup);
        }
      });

      // Trigger mouseleave on container <collapsible-element>
      if (this.options.closeOnMouseleave) {
        this.removeEventListener('mouseleave', this.reducer.mouseLeaveContainer);
        this.addEventListener('mouseleave', this.reducer.mouseLeaveContainer);
      }
    }

    /*
      Debounce click event
      @param e {object}: mouseevent
      Called by add event listener -> reducer.
    */
    debounceClickEvent(e) {
      if (!e) {
        return false;
      }
      const buttonType = e.currentTarget.nodeName.toLowerCase();
      const group = e.currentTarget.closest('[data-collapsible-group]');
      // only toggle if is closed or target is not an <a> tag
      if (!group.classList.contains(this.options.toggleClass) || buttonType != 'a') {
        e.preventDefault();
        this.toggle(group);
      }
    }

    /*
      Debounced mouse event
      @param e {object}: mouseevent
      @param type {string}: open/close/closeAll
      Called by add event listener -> reducer.
    */
    debouncedOnMouse(e, type) {
      if (!e) {
        return false;
      }

      // clear old trigger
      clearTimeout(this.timeout);

      // add new trigger
      this.timeout = setTimeout(() => {
        const group = e?.target?.closest('[data-collapsible-group]');
        switch (type) {
          case 'open':
            this.open(group);
            break;
          case 'close':
            this.close(group);
            break;
          case 'closeAll':
            this.closeAll();
            break;
          default:
            break;
        }
      }, this.options.hoverDelay);
    }

    /*
      Open collapsible group
      @param group {node}: group selector
    */
    open(group) {
      if (!group) {
        return false;
      }

      // Close sibblings if option is on
      this.options.closeSiblings && this.closeSiblings(group);

      // Open active group
      group.classList.add(this.options.toggleClass);

      // Add body class
      this.toggleBodyClass(true);
    }

    /*
      close collapsible group,
      @param group {node}: group selector
    */
    close(group) {
      if (!group) {
        return false;
      }

      // Close active group
      group.classList.remove(this.options.toggleClass);

      // Close child collapsibles
      if (this.options.closeChildren) {
        group.querySelectorAll('[data-collapsible-group]').forEach((group) => {
          this.close(group);
        });
      }

      // Remove body class
      this.toggleBodyClass(false);
    }

    /*
      Toggle controller, open / close collapsibles
      @param group {node}: group selector
    */
    toggle(group) {
      if (!group) {
        return false;
      }

      // Check if already open
      if (!group.classList.contains(this.options.toggleClass)) {
        // Open
        this.open(group);
      } else {
        // Close
        this.close(group);
      }
    }

    /*
      Close all sibling collapsibles
      @param currentGroup {node}: current group selector
    */
    closeSiblings(currentGroup = null) {
      this.groups.forEach((group) => {
        if (
          group !== currentGroup &&
          !group.contains(currentGroup) &&
          !currentGroup.contains(group)
        ) {
          this.close(group);
        }
      });
    }

    /*
      Open+ all collapsibles
    */
    openAll() {
      this.groups.forEach((group) => {
        group.classList.add(this.options.toggleClass);
      });

      // Add body class
      this.toggleBodyClass(true);
    }

    /*
      Close all collapsibles
    */
    closeAll() {
      this.groups.forEach((group) => {
        group.classList.remove(this.options.toggleClass);
      });

      // Remove body class
      this.toggleBodyClass(false);
    }

    /*
      Toggle body class
      @param add {boolean}: true/false
    */
    toggleBodyClass(add) {
      if (!this.options.toggleBodyClass) {
        return false;
      }
      if (add) {
        document.querySelector('body').classList.add(this.options.toggleBodyClass);
      } else {
        document.querySelector('body').classList.remove(this.options.toggleBodyClass);
      }
    }
  }

  window.Collapsible = Collapsible;

  customElements.define('collapsible-element', Collapsible);
}
