export function Required(value: any) {
  if (value == null) {
    throw new Error(`some @Input is required, but was not provided`);
  }
}
