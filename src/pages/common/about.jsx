import React from 'react'
import { Helmet } from 'react-helmet-async'
import aboutImg from '../../assets/about.jpg'

export default function About() {
    return (
        <div className="w-11/12 mx-auto my-10">
            <Helmet>
                <title>Library | About</title>
            </Helmet>
            <div className="flex justify-between items-center gap-10">
                <div className="flex-1/2">
                    <h1 className="text-5xl font-bold mb-4">About Us</h1>
                    <p className="text-xl font-bold text-gray-800 mb-5">
                        Welcome to the Digital Library
                    </p>
                    <p className="text-justify">
                        The Digital Library is a modern online platform designed
                        to provide students, educators, and researchers with
                        easy and organized access to academic and research
                        resources across various disciplines. Our mission is to
                        empower learning through technology by offering a
                        user-friendly, accessible, and well-categorized digital
                        collection of books and study materials.
                    </p>
                </div>
                <div className="flex-1/2">
                    <img className="w-[500px]" src={aboutImg} alt="Image" />
                </div>
            </div>
            <section className="mt-10">
                <h3 className="text-3xl font-bold mb-2">Our Mission</h3>
                <p>
                    Our mission is to make academic knowledge accessible,
                    organized, and available to every student and faculty
                    member, regardless of time or location. We aim to foster a
                    culture of self-learning, research, and curiosity by
                    providing a digital platform where users can explore a wide
                    range of books and academic materials. Through innovation
                    and simplicity, we empower students to engage with their
                    studies more effectively and support educators in enhancing
                    their teaching methods. Our library is committed to
                    continuous growth, inclusivity, and delivering resources
                    that align with educational goals and future learning needs.
                </p>
            </section>
            <section>
                <h3 className="text-3xl font-bold mb-2 mt-10">Our Vision</h3>
                <p>
                    Our vision is to become a leading digital learning hub that
                    transforms the way students and educators access academic
                    resources. We aspire to create a platform that bridges
                    traditional education with modern technology, enabling
                    seamless access to quality learning materials across
                    departments. By building a resource-rich and user-friendly
                    digital environment, we aim to support lifelong learning,
                    promote academic collaboration, and encourage intellectual
                    exploration. We envision a future where knowledge knows no
                    barriers, and every learner is just one click away from the
                    books and tools they need to succeed.
                </p>
            </section>
        </div>
    )
}
