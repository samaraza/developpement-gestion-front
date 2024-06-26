import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export function quantityValidator(produitControlName: string, quantityControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const form = formGroup as FormGroup;
    const produitControl = form.get(produitControlName);
    const quantityControl = form.get(quantityControlName);

    if (produitControl && quantityControl) {
      const produit = produitControl.value;
      const quantity = quantityControl.value;

      if (produit && quantity > produit.quantiteInitiale) {
        quantityControl.setErrors({ quantityExceeds: true });
        return { quantityExceeds: true };
      } else {
        quantityControl.setErrors(null);
      }
    }

    return null;
  };
}
