import React, {FormEvent, useState} from 'react';
import Input from "../../components/common/Input";
import {tagAPI} from "../../api/API";

const AddTagForm = () => {
    const [titleValue, setTitleValue] = useState('')
    const [slugValue, setSlugValue] = useState('')

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = {
            title: titleValue,
            slug: slugValue
        }

        tagAPI.createTag(data).then(() => {
            setTitleValue('')
            setSlugValue('')
        })
    }

    return (
        <form className="add-form" onSubmit={submit}>
            <h2>Добавить тэг</h2>
            <Input
                type={'text'}
                placeholder={'Название тэга'}
                isRequired={true}
                name={'projectTitle'}
                value={titleValue}
                setValue={setTitleValue}
            />
            <Input
                type={'text'}
                placeholder={'Слаг название'}
                isRequired={true}
                value={slugValue}
                setValue={setSlugValue}
            />

            <button className="btn">Добавить тэг</button>
        </form>
    );
};

export default AddTagForm;