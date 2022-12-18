import classNames from 'classnames/bind';
import styles from './List.module.scss';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { deleteValue, editValue, openFormValue } from '~/redux/actions'
import { resultSelector } from '~/redux/selector'
import { useSelector } from 'react-redux'


const cx = classNames.bind(styles);

function List() {
    const dispatch = useDispatch()
    const result = useSelector(resultSelector)
    const [searchtext, setSearchText] = useState('')


    const handleSearchText = (e) => {
        setSearchText(e.target.value)
    }

    const handleDelete = (index) => {
        dispatch(deleteValue(index))
    }

    const handleEdit = (name, code, school, age, index) => {
        dispatch(editValue({
            name: name,
            code: code,
            school: school,
            age: age,
            index
        }))

        dispatch(openFormValue(true))

    }

    // ô tìm kiếm không dấu, có dấu, ...
    const parse = (str) => str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase()


    return (
        <>
            <div className={cx('result')}>
                <div>
                    List Students:
                    <input
                        type='text'
                        className={cx('find-result')}
                        placeholder='Search...'
                        value={searchtext}
                        onChange={handleSearchText}
                    />
                </div>
                <ul>
                    {result && Array.isArray(result) && result
                        .filter(values =>
                            parse(values.name).includes(parse(searchtext))
                        )
                        .map((values, index) => (
                            <div key={index}>
                                <li>{`Name: ${values.name} - Code: ${values.code} - School: ${values.school} - Age: ${values.age}`}</li>
                                <button className={cx('form-delete')} onClick={() => handleDelete(index)}>Xoá</button>
                                <button className={cx('form-fix')} onClick={() => handleEdit(values.name, values.code, values.school, values.age, index)} >Sửa</button>
                            </div>
                        ))}
                </ul>
            </div >

        </>

    )
}

export default List