import React from 'react'
import { FaBook, FaHandPointRight, FaUserCircle } from 'react-icons/fa'
import { FcAlarmClock } from 'react-icons/fc'

export default function Information() {
    return (
        <div className="w-11/12 mx-auto">
            <div className="px-5 text-center my-10">
                <h1 className="text-2xl lg:text-5xl font-semibold mb-4">
                    Library Information
                </h1>
                <p className="text-gray-600">
                    Everything you need to know about using our digital library
                    — from opening hours to membership rules.
                </p>
            </div>

            <section>
                <div className="flex items-center gap-2 mb-5">
                    <FcAlarmClock className="text-3xl" />
                    <h1 className="text-3xl font-semibold">Opening Hours</h1>
                </div>

                <div>
                    <h3 className="font-bold mb-2">Friday - Tuesday</h3>
                    <ul className="space-y-1 list-disc pl-5">
                        <li>
                            {' '}
                            <span className="font-semibold">Open:</span> 09:00
                            AM
                        </li>
                        <li>
                            {' '}
                            <span className="font-semibold">Break:</span> 01:00
                            PM - 02:00 PM
                        </li>
                        <li>
                            {' '}
                            <span className="font-semibold">Close:</span> 085:00
                            PM
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-1 mt-5">Wednesday - Thusday</h3>
                    <li className="font-semibold">Closed</li>
                </div>
            </section>

            <section>
                <div className="flex items-center gap-2 text-3xl font-semibold mb-2 mt-8">
                    <FaBook></FaBook>
                    <h1>Collections</h1>
                </div>
                <p>
                    Our digital library offers a wide variety of academic and
                    general resources to support your learning and research. The
                    collections include:
                </p>

                <ul className="mt-3 space-y-2">
                    <li className="flex items-center gap-2">
                        <FaHandPointRight />
                        <span>Course-related textbooks</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaHandPointRight />
                        <span> Digital media (PDF resources)</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaHandPointRight />
                        <span> Daily newspapers and journals</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaHandPointRight />
                        <span>
                            {' '}
                            Department-specific collections (CSE, BBA, EEE,
                            English, Civil, Law, Islamic Studies)
                        </span>
                    </li>
                </ul>
            </section>

            <section>
                <div className="flex items-center gap-2 text-3xl font-semibold mb-2 mt-8">
                    <FaUserCircle />
                    <h1>Library Membership</h1>
                </div>
                <p>
                    To borrow books or access restricted materials, you must be
                    a registered library member.
                </p>
                <ul className="mt-3 space-y-2">
                    <li className="flex items-center gap-2">
                        <FaHandPointRight />
                        <span> Membership is open to students of PUB.</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaHandPointRight />
                        <span> Use your university email to register.</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaHandPointRight />
                        <span> Approved members can borrow books</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaHandPointRight />
                        <span>
                            Members must follow library policies and maintain
                            proper behavior while using the platform.
                        </span>
                    </li>
                </ul>
            </section>
        </div>
    )
}
