import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Input.module.scss'
import { type InputHTMLAttributes, memo } from 'react'
import { filterTypes } from 'entities/Product/model/types/ProductSchema'


type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string
    value?: string | number
    label?: string
    onChange: (newValue: string | number, fieldType: filterTypes) => void;
    field: filterTypes
    setState: (value: string | number) => void;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        label,
        required,
        field,
        setState,
        ...otherProps
    } = props


    const onChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value), field)
        setState(Number(e.target.value))
    }

    return (
        <div className={classNames(styles.Input, {}, [className])}>
            <input
                type={type}
                value={value}
                onChange={onChageHandler}
                {...otherProps}
            />
        </div>
    )
})
