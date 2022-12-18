import React, { useState, useEffect } from 'react'
import classNames from 'classnames/bind';
import styles from './Add.module.scss';
// import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { useDispatch } from 'react-redux'
import { addValue, openFormValue, closeFormValue, updateValue } from '~/redux/actions'
import { resultSelector, editSelector, openFormSelector } from '~/redux/selector'
import { useSelector } from 'react-redux'



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const cx = classNames.bind(styles);


export default function Add() {
    const dispatch = useDispatch();
    const [valid, setValid] = useState({});
    const [titleButton, setTitleButton] = useState(false)

    const [values, setValues] = useState({
        name: '',
        code: '',
        school: '',
        age: '',
    })

    const result = useSelector(resultSelector)
    const edit = useSelector(editSelector)
    const openForm = useSelector(openFormSelector)


    const handleNameChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            name: event.target.value,
        }));

    };

    const handleCodeChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            code: event.target.value,
        }));
    };

    const handleSchoolChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            school: event.target.value,
        }));
    };

    const handleAgeChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            age: event.target.value,
        }));
    };

    // Hàm Add
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('123')
        if (values.name && values.code && values.school && values.age && (Object.keys(valid).length === 0)) {
            console.log('123')


            dispatch(addValue({
                name: values.name,
                code: values.code,
                school: values.school,
                age: values.age,
            }))
        }


        setValues({
            name: '',
            code: '',
            school: '',
            age: '',
        })

        dispatch(closeFormValue(false))


    }

    // Hàm Update
    const handleUpdate = (event) => {
        event.preventDefault();

        var a = valid ? Object.keys(valid).length : []

        if (values.name && values.code && values.school && values.age && (a === 0)) {
            dispatch(updateValue({
                name: values.name,
                code: values.code,
                school: values.school,
                age: values.age,
            }))

            setValues({
                name: '',
                code: '',
                school: '',
                age: '',
            })
        }
        dispatch(closeFormValue(false))
    }


    // Check lỗi
    useEffect(() => {

        const validate = (values, edit) => {
            const newCode = result && Array.isArray(result) && result.find((item) => item.code === values.code)

            const valid = {}
            if (!values.name.trim()) {
                valid.name = "Vui lòng nhập tên";
            }
            if (!values.code.trim()) {
                valid.code = "Vui lòng nhập mã sinh viên";

            } else if (newCode !== undefined) {
                valid.code = "Mã sinh viên đã tồn tại";
            }

            if (edit !== undefined) {
                if (edit.code === values.code) {
                    return

                } else if (!values.code.trim()) {
                    valid.code = "Vui lòng nhập mã sinh viên";
                } else if (newCode === values.code) {
                    valid.code = "Mã sinh viên đã tồn tại";
                }
            }
            if (!values.school.trim()) {
                valid.school = "Vui lòng nhập tên trường";
            }
            if (!values.age.trim()) {
                valid.age = "Vui lòng nhập số tuổi";

            }
            return valid;
        };


        setValid(validate(values, edit));

    }, [values, result, edit])


    useEffect(() => {
        if (edit !== undefined) {
            setValues({
                name: edit.name,
                code: edit.code,
                school: edit.school,
                age: edit.age,
            })

            setTitleButton(false)
        }
    }, [edit])

    const handleClickOpen = () => {
        dispatch(openFormValue(true))
        setTitleButton(true)
    };

    const handleClose = () => {

        dispatch(closeFormValue(false))

        setValues({
            name: '',
            code: '',
            school: '',
            age: '',
        })

    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog
                open={openForm}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <div className={cx('wrapper')}>
                    <form className={cx('form')} onSubmit={!titleButton ? handleUpdate : handleSubmit} >
                        <h1 className={cx('form-heading')}>Thông tin sinh viên</h1>

                        <div className={cx('form-group')}>
                            <label htmlFor="fullname" className={cx('form-label')}>Tên đầy đủ</label>
                            <input
                                value={values.name}
                                onChange={handleNameChange}
                                id="fullname"
                                type="text"
                                placeholder="VD: abc"
                                className={cx('form-control')}
                            />
                            {valid ? (<span className={cx('form-message')}>{valid.name}</span>) : null}
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="code" className={cx('form-label')}>Mã sinh viên</label>
                            <input
                                value={values.code}
                                onChange={handleCodeChange}
                                id="code"
                                type="text"
                                placeholder="VD: SV123456"
                                className={cx('form-control')}
                            // disabled={edit}
                            />
                            {valid ? <span className={cx('form-message')}>{valid.code}</span> : null}

                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="school" className={cx('form-label')}>Trường</label>
                            <input
                                value={values.school}
                                onChange={handleSchoolChange}
                                id="school"
                                type="text"
                                placeholder="VD: Đại học A"
                                className={cx('form-control')}
                            />
                            {valid ? <span className={cx('form-message')}>{valid.school}</span> : null}

                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="age" className={cx('form-label')}>Tuổi</label>
                            <input
                                value={values.age}
                                onChange={handleAgeChange}
                                id="age"
                                type="number"
                                placeholder="VD: 18"
                                className={cx('form-control')}
                            />
                            {valid ? <span className={cx('form-message')}>{valid.age}</span> : null}

                        </div>

                        {!titleButton
                            ?
                            <button className={cx('form-submit')} type="submit">Update</button>
                            :
                            <button className={cx('form-submit')} type="submit">Add</button>
                        }
                    </form>

                </div>
            </Dialog>
        </div>
    );
}
