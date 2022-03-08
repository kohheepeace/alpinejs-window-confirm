# Intro

This is a repository that shows how to create a global modal equivalent to `window.confirm` with Alpinejs.

![demo gif](/demo.gif)

```html
  isConfirmed = await window.customConfirm({...});
  console.log(isConfirmed) // 👈 true or false
```

## Step 0: Setup project

Please create Static HTML project at [https://stackblitz.com/](https://stackblitz.com/)

We, only use two files

- `index.html`
- `script.js`

In `index.html`, add Alpine.js cdn

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- Custom script -->
    <script src="script.js"></script>

    <!-- 👇 Alpine.js from cdn -->
    <script
      defer
      src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
    ></script>
  </head>
  <body>
    ...
  </body>
</html>
```

## Step 1: Define `window.customConfirm` and assign it to `@click` on button

In `script.js`

```js
window.customConfirm = () => {
  console.log('customConfirm called');
};
```

In `index.html`

```html
<button
  x-data
  @click="
    window.customConfirm();
  "
>
  open dialog
</button>
```

So, you can define `window.customConfirm` function and call it from button by using Alpinejs.

## Step 2: Add Modal

In this step, we're going to add modal.

Please modify `index.html` like below.

`index.html`

```html
<body>
   <!-- Mimic nested div -->
    <div>
      <div>
        <button x-data @click="window.customConfirm();">open dialog</button>
      </div>
    </div>

    <!-- Modal -->
    <div style="background: pink; border: solid; padding: 40px">
      <h1>Modal Title</h1>
      <p>Modal message</p>
      <button>Cancel</button>
      <button>OK</button>
    </div>
</body>
```

## Step 3 Add Alpine Store

To handle modal open state, let's add [Alpine store](https://alpinejs.dev/globals/alpine-store).

`script.js`

```js
document.addEventListener('alpine:init', () => {
  Alpine.store('confirmModal', {
    open: false,
    toggle() {
      this.open = !this.open;
    },
  });
});
```

Then, in `index.html`

```html
<body>
  ...
  <!-- Modal -->
  <div x-data x-show="$store.confirmModal.open"> <!-- 👈 Add this line -->
    <div style="background: pink; border: solid; padding: 40px">
      <h1>Modal Title</h1>
      <p>Modal message</p>
      <button>Cancel</button>
      <button>OK</button>
    </div>
  </div>
</body>
```

And then,
`script.js`

```js
window.customConfirm = () => {
  Alpine.store('confirmModal').toggle();
};
```

## stackblitz code

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/web-platform-nwc4sm)
