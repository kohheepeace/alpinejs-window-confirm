# Intro

This is a repository that shows how to create a global modal equivalent to `window.confirm` with Alpinejs.

![](./step-3-1.gif)

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

![](step-3-1.gif)

## Step 4 Add function `onOk` and `onCancel`

In this step, we're going to add function when modal OK and Cancel is clicked.

`script.js`

```js
document.addEventListener('alpine:init', () => {
  Alpine.store('confirmModal', {
    open: false,
    toggle() {
      this.open = !this.open;
    },
    onOk() {
      console.log('onOk clicked');
      return true;
    },
    onCancel() {
      console.log('onCancel clicked');
      return false;
    },
  });
});
```

Then in `index.html`

```html
...
  <!-- Mimic nested div -->
  <div>
    <div>
      <button
        x-data
        @click="
          isConfirmed = window.customConfirm();
          console.log(isConfirmed);
        "
      >
        open dialog
      </button>
    </div>
  </div>

  <!-- Modal -->
  <div x-data x-show="$store.confirmModal.open">
    <div style="background: pink; border: solid; padding: 40px">
      <h1>Modal Title</h1>
      <p>Modal message</p>
      <button
        @click="
          $store.confirmModal.onCancel();
        "
      >
        Cancel
      </button>
      <button
        @click="
          $store.confirmModal.onOk();
        "
      >
        OK
      </button>
    </div>
  </div>
...
```

Now, we can assign `onOk` and `onCancel` function to buttons in modal.

**But it does not return boolean true or false**.

In the next step, we will learn how to fix this issue.

## Step 5 Promise

To get boolean value from `window.customConfirm`, we need to use `Promise`.

For example, let's re write `window.customConfirm`

`script.js`

```js
window.customConfirm = () => {
  return new Promise((resolve, reject) => {
    resolve(true);
    // resolve(123) 👈 try returning various values by using `resolve`
    // resolve("hoge")
  });
  // Alpine.store('confirmModal').toggle();
};
```

And in `index.html`

```html
<button
  x-data
  @click="
    isConfirmed = await window.customConfirm();
    console.log(isConfirmed);
  "
>
  open dialog
</button>
```

Alpine `@click` does not need to declare `async`, just using `await` is enough.

You will see now, `window.customConfirm` returns boolean `true` in console.

## Step 6 Assign `resolve(true)` to `onOk` and `onCancel`

First we make store `onOk` and `onCancel` blank function at begining.

```js
document.addEventListener('alpine:init', () => {
  Alpine.store('confirmModal', {
    open: false,
    toggle() {
      this.open = !this.open;
    },
    onOk() {},
    onCancel() {},
  });
});
```

Then modify `window.customConfirm` like below.

```js
window.customConfirm = () => {
  return new Promise((resolve, reject) => {
    const confirmModal = Alpine.store('confirmModal');

    // Open Modal
    confirmModal.open = true;

    // Assign logic: when OK button is clicked, close modal and return true
    confirmModal.onOk = () => {
      confirmModal.open = false;
      resolve(true);
    };

    // Assign logic: when Cancel button is clicked, close modal and return false
    confirmModal.onCancel = () => {
      confirmModal.open = false;
      resolve(false);
    };
  });
};
```

By doing this, we override `onOk` and `onCancel` logic when `window.customConfirm` is called to return boolean `true` or `false`.

## Finish!.

This is the final code of this tutorial.

https://web-platform-rrgo1m.stackblitz.io

## Realworld example with Tailwind

https://stackblitz.com/edit/web-platform-nwc4sm
