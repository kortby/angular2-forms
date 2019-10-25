export class CustomValidator {
  static requiredWhen(requiredControlName, controlToCheckName) {
    return control => {
      const required = control.get(requiredControlName).value;
      const toCheck = control.get(controlToCheckName).value;
      return required || (toCheck && !required) ? null : { requiredWhen: true };
    };
  }
}
