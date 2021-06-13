import { FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

export function metadataValidator(): ValidatorFn {
  return (arr: FormArray) : ValidationErrors | null => {
    let metaDataValid = false;

    if (arr.length > 0) {
        arr.value.map((item) => {
            if (item.keyData || item.valueData) {
                metaDataValid = true;
            }
        });
    }

    return !metaDataValid ? { metaData:true }: null;

  }
}
