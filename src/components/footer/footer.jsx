import React from 'react'
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10 mt-10">
            <nav className="grid grid-flow-col gap-4">
                <Link to={'/about'} className="link link-hover">
                    About us
                </Link>
                <Link to={'/information'} className="link link-hover">
                    Information
                </Link>
                <Link to={'/contact'} className="link link-hover">
                    Contact
                </Link>
                <Link to={'/'} className="link link-hover">
                    Librarian
                </Link>
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a>
                        <FaLinkedin className="text-2xl"></FaLinkedin>
                    </a>
                    <a>
                        <FaTwitter className="text-2xl"></FaTwitter>
                    </a>
                    <a>
                        <FaFacebook className="text-2xl"></FaFacebook>
                    </a>
                </div>
            </nav>
            <aside>
                <p>
                    Copyright © {new Date().getFullYear()} - All right reserved
                    by Library Management of PUB
                </p>
            </aside>
        </footer>
    )
}
