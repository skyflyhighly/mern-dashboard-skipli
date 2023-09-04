function TextInput({ value, label, ...rest }) {
  return (
    <>
      <label htmlFor={rest.id}>{label}</label>
      <input {...rest} type="text" value={value} />
    </>
  );
}

export default TextInput;
