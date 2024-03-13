# Code Base Theme

## Introduction

The Code Base Theme is a Shopify theme designed to be used by developers within our company. It provides a starting point for new theme projects, with up-to-date best practices and solutions.

## Getting Started

To get started with the Code Base Theme, follow these steps:

- Clone the theme repository to your local machine.
- Install the theme in your Shopify admin.
- Customize the theme to meet your needs.
- Publish the theme to your store.

---

## Folder structure

This section describes the structure and purpose of the folders in the Code Base Theme.

#### Paths with asterisks (\*)

_Some paths in this section have an asterisk (\*) at the end. This indicates that there is extended information available for that path. To view the extended information, scroll down to the bottom of this section._

- [**src**](src) \*
  - [**assets**](src/assets)
    - [**js**](src/assets/js)
    - [**public**](src/assets/public) \*
      - _favicon.ico_
      - _etc..._
    - [**scss**](src/assets/scss) \*
    - [**tailwind**](src/assets/tailwind)
      - [**plugins**](src/assets/tailwind/plugins) \*
        - [**base**](src/assets/tailwind/plugins/base)
        - [**components**](src/assets/tailwind/plugins/components)
        - [**utilities**](src/assets/tailwind/plugins/utilities)
        - [**variants**](src/assets/tailwind/plugins/variants)
      - [**scss**](src/assets/tailwind/scss) \*
- [**theme**](theme)

### Additional notes

#### src

The `src` folder contains the source code for the theme. This is where you can make changes to the theme.

#### public

Files contained within the `public/` directory are not modified by the build process

#### scss

You can create subfolders in the src/assets/scss folder. The name of the subfolder will be included in the final file name to keep it consistent. Subfolders can also contain subfolders.

**Example:** `src/assets/scss/sections/featured/product-grid.scss` -> `sections-featured-product-grid.css`

The first subfolder in `src/assets/scss` is also the name of the @layer that is used around the transpiled SCSS.

**Example:**

    @layer sections {
      // CSS result
    }

#### Tailwind

##### Plugins

The `src/assets/tailwind/plugins` folder contains the Tailwind CSS plugins that are used in the tailwind.config.js file.

##### scss

**You shouldn't touch these files.**

The `src/assets/tailwind/scss` folder contains the base Tailwind CSS files, where the base, components, and utilities are imported.

---
