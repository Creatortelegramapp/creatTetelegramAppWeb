import { useEffect, useState } from "react";

const PriceRangeInput = ({ min, max, onChange, initialValues }) => {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    const handleChange = (e, index) => {
        const newValue = e.target.value === "" ? "" : Number(e.target.value);
        const newValues = [...values];
        newValues[index] = newValue;
        if (newValue !== "") {
            if (newValues[0] < min) newValues[0] = min;
            if (newValues[1] > max) newValues[1] = max;
            if (newValues[0] > newValues[1]) newValues[0] = newValues[1];
        }
        setValues(newValues);
        if (newValue !== "") onChange(newValues);
    };

    return (
        <div className="w-full p-4 flex items-center gap-4">
            <input
                type="number"
                className="border p-2 rounded w-24"
                value={values[0] === "" ? "" : values[0]}
                onChange={(e) => handleChange(e, 0)}
                min={min}
                max={values[1]}
            />
            <span className="text-lg font-semibold">-</span>
            <input
                type="number"
                className="border p-2 rounded w-24"
                value={values[1] === "" ? "" : values[1]}
                onChange={(e) => handleChange(e, 1)}
                min={values[0]}
                max={max}
            />
        </div>
    );
};

export default PriceRangeInput;
