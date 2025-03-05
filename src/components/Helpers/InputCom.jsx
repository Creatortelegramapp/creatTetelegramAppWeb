export default function InputCom({
  label,
  name,
  inputHandler,
  value,
  labelClasses = "text-gray text-[13px] font-normal",
}) {
  return (
    <div className="input-com w-full h-full">
      {label && (
        <label
          className={`input-label capitalize block  mb-2 ${labelClasses || ""}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
        <input
            type="text"
            name={name}
            value={value}
            onChange={inputHandler}
            placeholder={label}
            className="h-[25px] text-black"
        />
        {/*{children && children}*/}
      </div>
    </div>
  );
}
