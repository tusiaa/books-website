import React from 'react'
import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {useFormik} from 'formik';
import axios from 'axios'

const AddEditForm = ({ksiazki, setAdd}) => {
    const {id: Id} = useParams();
    const [Ksiazka, setKsiazka] = useState({})

    useEffect(() => {
        if(Id !== undefined){
            setKsiazka(ksiazki.find(a => a.id === Number(Id)))
            setKsiazka(Ksiazka => ({ ...Ksiazka, release_date: new Date(Ksiazka.release_date).toLocaleDateString('en-CA') }) )
        }
    },[Id, ksiazki])

    const validate = values => {
        const errors = {};
        if (!values.title) {
            errors.title = 'Wymagany';
        } else if (values.title !== Ksiazka.title && ksiazki.find(a => a.title === values.title) !== undefined) {
            errors.title = 'Nie może się powtarzać';
        }

        if (!values.author) {
            errors.author = 'Wymagany';
        }
    
        if (!values.genre) {
            errors.genre = 'Wymagany';
        } else if (values.genre.length > 50) {
            errors.genre = 'Nie może być dłuższy od 50';
        }

        if (!values.description) {
            errors.description = 'Wymagany';
        }

        if (!values.release_date) {
            errors.release_date = 'Wymagany';
        } else if ( Date(values.release_date) === 'Invalid Date') {
            errors.release_date = 'Musi być datą';
        }
    
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            genre: '',
            description: '',
            release_date: '',
            image_url: ''
        },
        validate,
        onSubmit: values => {
            if(Id !== undefined){
                axios.put(`http://localhost:3001/api/book/${Id}`, values)
                    .then((response) => {
                        alert("Zaktualizowano ksiązkę!")
                        console.log("Zaktualizowano ksiażkę o id: " + Id);
                    }, (error) => {
                        console.log("Błąd!");
                    });
            } else {
                axios.post(`http://localhost:3001/api/book`, values)
                    .then((response) => {
                        setAdd(false)
                        setAdd(true)
                        alert("Dodano ksiązkę!")
                        console.log("Dodano ksiażkę o id: " + response.data.id);
                    }, (error) => {
                        console.log("Błąd!");
                    });
            }
        },
    });

    const onChange = (e) => {

        formik.setFieldValue(e.target.name, e.target.value)
        if(formik.values.title === '') formik.setFieldValue('title', Ksiazka.title); 
        if(formik.values.author === '') formik.setFieldValue('author', Ksiazka.author); 
        if(formik.values.genre === '') formik.setFieldValue('genre', Ksiazka.genre); 
        if(formik.values.description === '') formik.setFieldValue('description', Ksiazka.description); 
        if(formik.values.release_date === '') formik.setFieldValue('release_date', Ksiazka.release_date); 
        if(formik.values.image_url === '') formik.setFieldValue('image_url', Ksiazka.image_url); 
    }
    
    
    

    return (
        <form className='container' onSubmit={formik.handleSubmit}>
            <div className='AddEditForm'>
            <label>Tytuł</label>
            <input
                id="title"
                name="title"
                type="text"
                onChange={onChange}
                onBlur={formik.handleBlur}
                defaultValue={Ksiazka.title}
            />
            {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}
            </div><div className='AddEditForm'>
            <label>Autor</label>
            <input
                id="author"
                name="author"
                type="text"
                onChange={onChange}
                onBlur={formik.handleBlur}
                defaultValue={Ksiazka.author}
            />
            {formik.touched.author && formik.errors.author ? <div>{formik.errors.author}</div> : null}
            </div><div className='AddEditForm'>
            <label>Gatunek</label>
            <input
                id="genre"
                name="genre"
                type="text"
                onChange={onChange}
                onBlur={formik.handleBlur}
                defaultValue={Ksiazka.genre}
            />
            {formik.touched.genre && formik.errors.genre ? <div>{formik.errors.genre}</div> : null}
            </div><div className='AddEditForm'>
            <label>Data wydania</label>
            <input
                id="release_date"
                name="release_date"
                type="date"
                onChange={onChange}
                onBlur={formik.handleBlur}
                defaultValue={Ksiazka.release_date}
            />
            {formik.touched.release_date && formik.errors.release_date ? <div>{formik.errors.release_date}</div> : null}
            </div><div className='AddEditForm'>
            <label>Link do okładki</label>
            <input
                id="image_url"
                name="image_url"
                type="text"
                onChange={onChange}
                onBlur={formik.handleBlur}
                defaultValue={Ksiazka.image_url}
            />
            {formik.touched.image_url && formik.errors.image_url ? <div>{formik.errors.image_url}</div> : null}
            </div><div className='AddEditForm' style={{minhHeight: '90px'}}>
            <label>Opis</label>
            <textarea
                id="description"
                name="description"
                onChange={onChange}
                onBlur={formik.handleBlur}
                defaultValue={Ksiazka.description}
            />
            {formik.touched.description && formik.errors.description ? <div>{formik.errors.description}</div> : null}
            </div><div className='AddEditForm'>
                <button type='submit' className='btn btn-block'> Wyślij </button>
            </div>
        </form>
    )
}

export default AddEditForm
