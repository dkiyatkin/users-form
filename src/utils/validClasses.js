export default function validClasses (props) {
  if (!props) return
  if (props.pristine) return
  return {
    'is-valid': props.valid,
    'is-invalid': !props.valid
  }
}
