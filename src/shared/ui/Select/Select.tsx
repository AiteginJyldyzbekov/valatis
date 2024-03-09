import { classNames } from "shared/lib/classNames/classNames"
import styles from "./Select.module.scss"
import { memo, useState } from "react";
import { filterTypes } from "entities/Product/model/types/ProductSchema";


export type FilterValueHandler = (newValue: string, fieldType: filterTypes) => void;

interface SelectProps {
    className?: string;
    onChange?: FilterValueHandler;
    options: Array<string>;
    field: filterTypes;
    value: string;
    setState: (value: string) => void;
}

const Select: React.FC<SelectProps> = memo((props) => {

    const {
        className,
        onChange,
        options,
        field,
        value,
        setState
    } = props

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setState(newValue);
        onChange(newValue, field);
    };

    const renderOptions = () => {
        return options.map((option, index) => (
            <option key={`${option}_${index}`} value={option}>
                {option}
            </option>
        ));
    }

    return (
        <div className={classNames(styles.select, {}, [className])}>
            <select value={value} onChange={(e) => handleChange(e)}>
                {value == null && (
                    <option value="none" selected disabled hidden>Select a {field}</option>
                )}
                {renderOptions()}
            </select>
        </div>
    )
})

export default Select