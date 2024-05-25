import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Upload = ({ name, label, register, setValue, defaultContent }) => {

  const { UpdateBlog } = useSelector((s) => s.blog);
  const [image, setimage] = useState(UpdateBlog?defaultContent:null);

  const handelonchange = (e) => {
    const file = e.target.files[0];
    setValue(name, e.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setimage(reader.result);
      }
      reader.readAsDataURL(file);
    }
    else {
      console.log("no file");
    }
  }

  useEffect(() => {
  }, [])




  return (
    <div>
      {
        image ? (
          <div className="flex flex-col space-y-2">
            <label className="mb-3 block text-base font-medium text-white" htmlFor={label}>Blog Image</label>
            <img src={image} alt="" className="h-[200px] md:h-[250px w-full rounded-md object-cover" />
            <button type="button" onClick={() => { setimage(null); setValue(name, null) }} className="text-sm text-richblack-5">Remove</button>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <label className="mb-3 block text-base font-medium text-white" htmlFor={label}>
              <div>
                Blog Image
              </div>

              <div className="bg-richblack-700 flex min-h-[175px] md:min-h-[225px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500">
                <div
                  className="flex w-full flex-col items-center p-6"
                  role="presentation"
                  tabIndex={0}
                >
                  <input id={label} name={name} type="file" accept="image/*,.jpeg,.jpg,.png" tabIndex="-1" multiple=""  {...register(name)} onChange={handelonchange} onDrop={handelonchange} className="hidden" />
                  <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-2xl text-blue-100"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="16 16 12 12 8 16"></polyline>
                      <line x1="12" y1="12" x2="12" y2="21"></line>
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                      <polyline points="16 16 12 12 8 16"></polyline>
                    </svg>
                  </div>
                  <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                    Drag and drop an image, or click to{" "}
                    <span className="font-semibold text-blue-100">Browse</span> a file
                  </p>

                </div>
              </div>
            </label>

          </div>
        )

      }



    </div>
  )
}

export default Upload