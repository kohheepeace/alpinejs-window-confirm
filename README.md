# Intro

これは、alpinejs で`window.confirm`に相当する global モダルを作成方法を紹介するレポジトリーです.

```html
  isConfirmed = await window.customConfirm({...});
  console.log(isConfirmed) // 👈 true or false
```

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/web-platform-nwc4sm)


## Step 1: Define `window.customConfirm` and assign it to `@click` on button

