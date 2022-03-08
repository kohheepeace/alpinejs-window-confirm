// Define alpine store for confirmModal
document.addEventListener('alpine:init', () => {
  Alpine.store('confirmModal', {
    open: false,
    title: '',
    message: '',
    color: 'red',
    okText: 'OK',
    onOk() {},
    onCancel() {},
  });
});

window.customConfirm = (props) => {
  return new Promise((resolve, reject) => {
    const confirmModal = Alpine.store('confirmModal');

    Object.assign(confirmModal, props);

    confirmModal.onOk = () => {
      confirmModal.open = false;
      resolve(true);
    };

    confirmModal.onCancel = () => {
      confirmModal.open = false;
      resolve(false);
    };

    confirmModal.open = true;
  });
};
