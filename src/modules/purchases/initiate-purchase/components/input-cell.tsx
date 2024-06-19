import { CellContext } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

interface TableMeta<TData> {
    updateData: (rowIndex: number, columnId: string, value: string) => TData
}

export function InputCell<TData, TValue>({ getValue, row, column, table }: CellContext<TData, TValue>) {
    const initialValue = getValue() as string
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    const onBlur = () => (table.options.meta as TableMeta<TData>).updateData(row.index, column.id, value)

    return <input value={value} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />
}
