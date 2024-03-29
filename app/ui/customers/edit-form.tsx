'use client';

import { Customer } from '@/app/lib/definitions';
import Link from 'next/link';
import {
    AtSymbolIcon,
    UserIcon,

} from '@heroicons/react/24/outline';

import { Button } from '@/app/ui/button';
import {
    updateCustomer
} from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState, ChangeEvent } from 'react'

export default function Form({
    customers,
}: {
    customers: Customer;
}) {
    const initialState = { message: null, errors: {} };
    const updateCustomerWithId = updateCustomer.bind(null, customers.id);
    const [state, dispatch] = useFormState(updateCustomerWithId, initialState);

    // upload image
    const [images, setImages] = useState<{
        fileUrl: string;
        fileKey: string;
    }[]>([])

    const title = images.length ? (
        <>
            <p>Upload Complete!</p>
            <p className="mt-2">{images.length} files</p>
        </>
    ) : null

    const [json, setJson] = useState('');
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Update the state with the new value
        setJson(event.target.value);
    };

    const [currentImageUrl, setCurrentImageUrl] = useState(customers.image_url);

    return (
        <form action={dispatch}>
            {/* Customer Name */}
            <div className="rounded-md bg-gray-50 p-4 md:p-6">

                {/* Customer Name */}
                <div className="mb-4">
                    <label htmlFor="customertName" className="mb-2 block text-sm font-medium">
                        Enter Customer Name
                    </label>
                    <div className="relative mt-2 rounded-md">

                        <div className="relative">
                            <input
                                id="customerName"
                                name="customerName"
                                type="text"
                                step="0.01"
                                placeholder="Enter Customer Name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="name-error"
                                defaultValue={customers.name}
                            />
                            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>

                        <div id="name-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.name &&
                                state.errors.name.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Customer Email */}
                <div className="mb-4">
                    <label htmlFor="customerEmail" className="mb-2 block text-sm font-medium">
                        Enter Email
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="customerEmail"
                                name="customerEmail"
                                type="email"
                                step="0.01"
                                placeholder="Enter Email"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="email-error"
                                defaultValue={customers.email}
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>

                <div id="email-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.email &&
                        state.errors.email.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                </div>

                {/* Customer Image */}
                <div className="mb-4">
                    <label htmlFor="customerImage" className="mb-2 block text-sm font-medium">
                        Edit Customer Image
                    </label>
                    {/*  */}
                    <div className="flex justify-center py-3">
                        <img className="w-1/5" src={currentImageUrl || customers.image_url} />
                    </div>

                    <UploadButton
                        <OurFileRouter>
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            if (res) {
                                setImages(res)
                                const url = res[0].fileUrl;
                                let jsonString = JSON.stringify(url);
                                // response
                                jsonString = jsonString.slice(1, -1);
                                setJson(jsonString); // Update the state with JSON data
                                // To-DO
                                // how to replace before img with current url
                                setCurrentImageUrl(url)
                            }
                            alert("Upload Completed");
                        }}
                        onUploadError={(error: Error) => {
                            // Error alert
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                    < input
                        value={json}
                        onChange={handleInputChange}
                        id="customerImage"
                        name="customerImage"
                        type="text"
                        step="0.01"
                        className="invisible"
                    />
                    {title}
                </div>

                <div id="image-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.image_url &&
                        state.errors.image_url.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>
                                {error}
                            </p>
                        ))}
                </div>

            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/customers"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Update Customer</Button>
            </div>
        </form >
    );
}
