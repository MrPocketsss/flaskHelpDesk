const Validator = () => {
  const check = (el, str) => {
    let ret = 5;
    switch(str) {
      case 'email':
        let re = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(el.value);
        if (re) { ret = 1 } else { ret = 0 }
        break;
      case 'password':
        let strongRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(el.value);
        let medRe = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(el.value);
        if (strongRe) { ret = 2 } else if (medRe) { ret = 1 } else { ret = 0 }
    }

    return ret;
  };

  const setValid = (el) => {
    if (el.classList.contains('invalid')) { el.classList.remove('invalid') };
    if (!el.classList.contains('valid')) { el.classList.add('valid'); }
  };

  const setInvalid = (el) => {
    if (el.classList.contains('valid')) { el.classList.remove('valid') };
    if (!el.classList.contains('invalid')) { el.classList.add('invalid'); }
  };

  const removeValidation = (el) => {
    el.classList.remove('valid');
    el.classList.remove('invalid');
  };


  return {
    check: check,
    setValid: setValid,
    setInvalid: setInvalid,
    remove: removeValidation
   }
};

const validator = Validator();
console.log('validator is loaded');