import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ChipInput = ({ name, label, register, setValue, defaultContent }) => {
    const { UpdateBlog } = useSelector((s) => s.blog);
    const [tags, settags] = useState(UpdateBlog ? defaultContent : []);

    useEffect(() => {
        register(name);
        setValue(name, tags);
    }, [])

    return (
        <div className='mb-4'>
            <label className="mb-3 block text-base font-medium text-white" htmlFor={name}>{label}</label>
            <div className='flex flex-wrap gap-2 m-2'>
                {
                    tags.map((tag, index) => (
                        <div key={index} className='m-1 flex items-center rounded-full bg-blue-300 px-2 py-1 text-sm text-richblack-5'>
                            <span className='text-richblack-5'>{tag}</span>
                            <button
                                type='button'
                                onClick={() => {
                                    const updatedTags = [...tags];
                                    updatedTags.splice(index, 1);
                                    settags(updatedTags);
                                    setValue(name, updatedTags);
                                }}
                                className='ml-2 text-richblack-5'>
                                <FaTimes />
                            </button>
                        </div>
                    ))
                }
            </div>
            <input
                type='text'
                id={name}
                placeholder={`Press Enter or , to add a ${name}`}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md "
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault();
                        if (e.target.value) {
                            settags([...tags, e.target.value]);
                            setValue(name, [...tags, e.target.value]);
                            e.target.value = "";
                        }
                    }
                }}
            />


        </div>
    )
}

export default ChipInput;