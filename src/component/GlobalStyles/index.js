import './GlobalStyles.scss'

function GlobalStyles({ children }) {
    return (children)
}

export default GlobalStyles


// import classNames from 'classnames/bind';
// import styles from './List.module.scss';
// import React, { useState, useRef, useEffect } from 'react';

// const cx = classNames.bind(styles);

// function List() {

//     const [values, setValues] = useState({
//         name: '',
//         code: '',
//         school: '',
//         age: '',
//     })

//     const nameInput = useRef()
//     const button = useRef()
//     const [valid, setValid] = useState({});
//     const [edit, setEdit] = useState('')
//     const [filters, setFilter] = useState('')

//     const handleNameChange = (event) => {
//         event.persist();
//         setValues((values) => ({
//             ...values,
//             name: event.target.value,
//         }));

//     };

//     const handleCodeChange = (event) => {
//         event.persist();
//         setValues((values) => ({
//             ...values,
//             code: event.target.value,
//         }));
//     };

//     const handleSchoolChange = (event) => {
//         event.persist();
//         setValues((values) => ({
//             ...values,
//             school: event.target.value,
//         }));
//     };

//     const handleAgeChange = (event) => {
//         event.persist();
//         setValues((values) => ({
//             ...values,
//             age: event.target.value,
//         }));
//     };

//     const [result, setResult] = useState([])

//     useEffect(() => {
//         const result = JSON.parse(localStorage.getItem('result'));
//         if (result) {
//             setResult(result);
//         }
//     }, []);



//     useEffect(() => {
//         const validate = (values) => {
//             const newCode = result.find((item) => item.code === values.code)
//             const newIndex = result.find((values) => values.code === edit.code)
//             const valid = {}
//             if (!values.name.trim()) {
//                 valid.name = "Vui lòng nhập tên";
//             }
//             if (!values.code.trim()) {
//                 valid.code = "Vui lòng nhập mã sinh viên";

//             } else if (newCode !== undefined && newCode !== newIndex) {
//                 valid.code = "Mã sinh viên đã tồn tại";
//             }
//             if (!values.school.trim()) {
//                 valid.school = "Vui lòng nhập tên trường";
//             }
//             if (!values.age.trim()) {
//                 valid.age = "Vui lòng nhập số tuổi";

//             }
//             return valid;
//         };


//         setValid(validate(values));

//     }, [values, result, edit.code])

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         nameInput.current.focus()

//         setValues({
//             name: '',
//             code: '',
//             school: '',
//             age: '',
//         })


//         if (values.name && values.code && values.school && values.age && (Object.keys(valid).length === 0)) {

//             setResult(prev => {
//                 const newValues = [...prev, values]
//                 const jsonValues = JSON.stringify(newValues)

//                 localStorage.setItem('result', jsonValues)

//                 return newValues
//             })

//         } return;


//     }

//     const handleDelete = (index) => {
//         setResult(() => {
//             const newValue = result.filter((values, indexItem) => indexItem !== index)
//             localStorage.setItem('result', JSON.stringify(newValue))
//             return newValue
//         })
//         setEdit('')
//         setValues({
//             name: '',
//             code: '',
//             school: '',
//             age: '',
//         })
//     }

//     const handleEdit = (index) => {

//         let listStudent = localStorage.getItem('result') ? JSON.parse(localStorage.getItem('result')) : []

//         setValues({
//             name: listStudent[index].name,
//             code: listStudent[index].code,
//             school: listStudent[index].school,
//             age: listStudent[index].age,
//         })
//         setEdit(listStudent[index])

//         localStorage.getItem('result')

//     }

//     const handleUpdate = () => {
//         const newIndex = result.findIndex((values, indexItem) => values.code === edit.code)
//         setResult(prev => {
//             let newValues = [...prev]

//             newValues[newIndex] = {
//                 name: values.name,
//                 code: values.code,
//                 school: values.school,
//                 age: values.age,
//             }

//             const jsonValues = JSON.stringify(newValues)

//             localStorage.setItem('result', jsonValues)

//             return newValues
//         })

//         setValues({
//             name: '',
//             code: '',
//             school: '',
//             age: '',
//         })

//         setEdit('')

//     }


//     // ô tìm kiếm không dấu, có dấu, ...
//     const parse = (str) => str
//         .normalize("NFD")
//         .replace(/[\u0300-\u036f]/g, "")
//         .replace(/đ/g, "d")
//         .replace(/Đ/g, "D")
//         .toLowerCase()

//     return (
//         <>
//             <div className={cx('wrapper')}>
//                 <form className={cx('form')} onSubmit={handleSubmit}>
//                     <h1 className={cx('form-heading')}>Thông tin sinh viên</h1>

//                     <div className={cx('form-group')}>
//                         <label htmlFor="fullname" className={cx('form-label')}>Tên đầy đủ</label>
//                         <input
//                             ref={nameInput}
//                             value={values.name}
//                             onChange={handleNameChange}
//                             id="fullname"
//                             type="text"
//                             placeholder="VD: abc"
//                             className={cx('form-control')}
//                         />
//                         {valid ? (<span className={cx('form-message')}>{valid.name}</span>) : null}
//                     </div>

//                     <div className={cx('form-group')}>
//                         <label htmlFor="code" className={cx('form-label')}>Mã sinh viên</label>
//                         <input
//                             value={values.code}
//                             onChange={handleCodeChange}
//                             id="code"
//                             type="text"
//                             placeholder="VD: SV123456"
//                             className={cx('form-control')}
//                         // disabled={edit}
//                         />
//                         {valid ? <span className={cx('form-message')}>{valid.code}</span> : null}

//                     </div>

//                     <div className={cx('form-group')}>
//                         <label htmlFor="school" className={cx('form-label')}>Trường</label>
//                         <input
//                             value={values.school}
//                             onChange={handleSchoolChange}
//                             id="school"
//                             type="text"
//                             placeholder="VD: Đại học A"
//                             className={cx('form-control')}
//                         />
//                         {valid ? <span className={cx('form-message')}>{valid.school}</span> : null}

//                     </div>
//                     <div className={cx('form-group')}>
//                         <label htmlFor="age" className={cx('form-label')}>Tuổi</label>
//                         <input
//                             value={values.age}
//                             onChange={handleAgeChange}
//                             id="age"
//                             type="number"
//                             placeholder="VD: 18"
//                             className={cx('form-control')}
//                         />
//                         {valid ? <span className={cx('form-message')}>{valid.age}</span> : null}

//                     </div>

//                     {edit
//                         ?
//                         <button ref={button} className={cx('form-submit')} type="submit" onClick={handleUpdate}>Update</button>
//                         :
//                         <button ref={button} className={cx('form-submit')} type="submit">Add</button>
//                     }
//                 </form>

//             </div>

//             <div className={cx('result')}>
//                 <ul>

//                     List Students:
//                     <input
//                         type='text'
//                         className={cx('find-result')}
//                         placeholder='Search...'
//                         value={filters}
//                         onChange={event => setFilter(event.target.value)}
//                     />
//                     {result
//                         .filter(values =>
//                             parse(values.name).includes(parse(filters))
//                         )
//                         .map((values, index) => (
//                             <div key={index}>
//                                 <li>{`Name: ${values.name} - Code: ${values.code} - School: ${values.school} - Age: ${values.age}`}</li>
//                                 <button className={cx('form-delete')} onClick={() => handleDelete(index)}>Xoá</button>
//                                 <button className={cx('form-fix')} onClick={() => handleEdit(index)}>Sửa</button>
//                             </div>
//                         ))}
//                 </ul>
//             </div>

//         </>

//     )
// }

// export default List



// {/* <div className={cx('result')}>
// <div className={cx('result-header')} >
//     <div>
//         List Students:
//         <input
//             type='text'
//             className={cx('find-result')}
//             placeholder='Search...'
//             value={filters}
//             onChange={event => setFilter(event.target.value)}
//         />
//     </div>
//     <button className={cx('btn-icon-add')}>+</button>
// </div>
// <ul>
//     {result
//         .filter(values =>
//             parse(values.name).includes(parse(filters))
//         )
//         .map((values, index) => (
//             <div key={index}>
//                 <li>{`Name: ${values.name} - Code: ${values.code} - School: ${values.school} - Age: ${values.age}`}</li>
//                 <button className={cx('form-delete')} onClick={() => handleDelete(index)}>Xoá</button>
//                 <button className={cx('form-fix')} onClick={() => handleEdit(index)}>Sửa</button>
//             </div>
//         ))}
// </ul>
// </div> */}
