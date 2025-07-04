import React from 'react'
import {
    FaRunning,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaVoicemail,
} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function Contact() {
    return (
        <div className="w-11/12 mx-auto">
            <div className="px-5 text-center my-10">
                <h1 className="text-2xl lg:text-5xl font-semibold mb-4">
                    Contact Us
                </h1>
                <p className="text-gray-600">
                    We're here to help! Whether you have questions, suggestions,
                    or need assistance using our digital library, feel free to
                    reach out to us.
                </p>
            </div>

            {/* Contact Info Section */}
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 py-10">
                {/* Location */}
                <div className="flex-1 flex flex-col items-center bg-gray-100 py-8 rounded shadow-sm mx-2">
                    <div className="bg-cyan-600 rounded-full p-4 mb-4">
                        <FaMapMarkerAlt className="text-white text-3xl" />
                    </div>
                    <h2 className="text-lg font-semibold mb-2 tracking-wide">
                        LOCATION
                    </h2>
                    <p className="text-gray-600 text-center">
                        Library Building, Ground Floor, PUB
                    </p>
                    <p className="text-gray-600 text-center">Gokul, Bogura</p>
                </div>
                {/* Phone */}
                <div className="flex-1 flex flex-col items-center bg-gray-100 py-8 rounded shadow-sm mx-2">
                    <div className="bg-cyan-600 rounded-full p-4 mb-4">
                        <FaPhoneAlt className="text-white text-3xl" />
                    </div>
                    <h2 className="text-lg font-semibold mb-2 tracking-wide">
                        PHONE NUMBER
                    </h2>
                    <p className="text-gray-600">017 XXXXXXXX</p>
                    <p className="text-gray-600">019 XXXXXXXX</p>
                </div>
                {/* Office Location */}
                <div className="flex-1 flex flex-col items-center bg-gray-100 py-8 rounded shadow-sm mx-2">
                    <div className="bg-cyan-600 rounded-full p-4 mb-4">
                        <MdEmail className="text-white text-3xl" />
                    </div>
                    <h2 className="text-lg font-semibold mb-2 tracking-wide">
                        Email Address
                    </h2>
                    <p className="text-gray-600 text-center">
                        support@digitallibrary.edu.bd
                    </p>
                    <p className="text-gray-600 text-center">
                        support1@digitallibrary.edu.bd
                    </p>
                </div>
            </div>
        </div>
    )
}
