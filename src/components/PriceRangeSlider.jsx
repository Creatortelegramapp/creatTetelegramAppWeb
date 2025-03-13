import { useEffect, useState } from "react";

const PriceRangeInput = ({ min, onChange, initialValues }) => {
    const [values, setValues] = useState(initialValues);
    const [delayRequest, setDelayRequest] = useState(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (delayRequest[0] !== "" && delayRequest[1] !== "") {
                onChange(delayRequest);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [delayRequest, onChange]);

    const handleChange = (e, index) => {
        const newValue = e.target.value === "" ? "" : Number(e.target.value);
        const newValues = [...values];
        newValues[index] = newValue;

        if (newValue !== "") {
            if (newValues[0] < min) newValues[0] = min;
            if (newValues[0] > newValues[1]) newValues[0] = newValues[1];
        }

        setValues(newValues);
        setDelayRequest(newValues);
    };

    return (
        <div className="w-full flex items-center gap-4">
            <input
                type="number"
                className="border p-2 rounded-lg w-24 focus:outline-none"
                value={values[0] === "" ? "" : values[0]}
                onChange={(e) => handleChange(e, 0)}
                min={min}
            />
            <span className="text-lg font-semibold">-</span>
            <input
                type="number"
                className="border p-2 rounded-lg w-24 focus:outline-none"
                value={values[1] === "" ? "" : values[1]}
                onChange={(e) => handleChange(e, 1 )}
                min={values[0]}
            />
        </div>
    );
};

export default PriceRangeInput;
