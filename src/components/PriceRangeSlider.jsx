import { useEffect, useState } from "react";
import { Range } from "react-range";

const PriceRangeSlider = ({ min, max, step, onChange, initialValues }) => {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    const handleChange = (newValues) => {
        setValues(newValues);
        onChange(newValues);
    };


    return (
        <div className="w-full p-4">
            <Range
                step={step}
                min={min}
                max={max}
                values={values}
                onChange={setValues}
                onFinalChange={handleChange}
                renderTrack={({ props, children }) => (
                    <div {...props} className="h-2 bg-gray-300 rounded relative">
                        <div
                            className="absolute h-2 bg-gray-600 rounded"
                            style={{
                                left: `${((values[0] - min) / (max - min)) * 100}%`,
                                right: `${100 - ((values[1] - min) / (max - min)) * 100}%`,
                            }}
                        />
                        {children}
                    </div>
                )}
                renderThumb={({ props, index }) => {
                    const { key, ...restProps } = props;

                    return <div
                        key={index}
                        {...restProps}
                        className="w-5 h-5 bg-white border border-gray-500 rounded-full shadow cursor-pointer"
                    />
                }}
            />
            <div className="text-center mt-2 text-lg font-semibold">
                ${values[0]} - ${values[1]}
            </div>
        </div>
    );
};

export default PriceRangeSlider;
