import React from 'react'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className='footer-main padding2'>
            <div className='footer-wrap-bg'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <div className="footer-logo-block">
                                <Link href="#"><img src="/images/logo.png" alt="footer logo" /></Link>
                                <p>Connecting Enterpreneurs with local and Global Investor</p>
                                <ul className='footer-social-links'>
                                    <li><Link href="#"><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        viewBox="0 0 152 152"
                                    >
                                        <g id="Layer_2" data-name="Layer 2">
                                            <g id="Color">
                                                <g id="_04.Twitter" data-name="04.Twitter">
                                                    <circle
                                                        id="Background"
                                                        cx="76"
                                                        cy="76"
                                                        r="76"
                                                        fill="#03a9f4"
                                                    ></circle>
                                                    <path
                                                        id="Icon"
                                                        fill="#fff"
                                                        d="M125.23 45.47a42 42 0 0 1-11.63 3.19 20.06 20.06 0 0 0 8.88-11.16 40.3 40.3 0 0 1-12.8 4.89 20.18 20.18 0 0 0-34.92 13.8 21 21 0 0 0 .47 4.6 57.16 57.16 0 0 1-41.61-21.11 20.2 20.2 0 0 0 6.21 27 19.9 19.9 0 0 1-9.12-2.49v.22a20.28 20.28 0 0 0 16.17 19.82 20.1 20.1 0 0 1-5.29.66 18 18 0 0 1-3.83-.34 20.39 20.39 0 0 0 18.87 14.06 40.6 40.6 0 0 1-25 8.61 36.5 36.5 0 0 1-4.83-.28 56.8 56.8 0 0 0 31 9.06c37.15 0 57.46-30.77 57.46-57.44 0-.89 0-1.75-.07-2.61a40.2 40.2 0 0 0 10.04-10.48"
                                                    ></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg></Link></li>
                                    <li><Link href="#"><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        viewBox="0 0 176 176"
                                    >
                                        <g id="Layer_2" data-name="Layer 2">
                                            <g id="_01.facebook" data-name="01.facebook">
                                                <circle id="background" cx="88" cy="88" r="88" fill="#3a559f"></circle>
                                                <path
                                                    id="icon"
                                                    fill="#fff"
                                                    d="m115.88 77.58-1.77 15.33a2.87 2.87 0 0 1-2.82 2.57h-16l-.08 45.45a2.05 2.05 0 0 1-2 2.07H77a2 2 0 0 1-2-2.08V95.48H63a2.87 2.87 0 0 1-2.84-2.9l-.06-15.33a2.88 2.88 0 0 1 2.84-2.92H75v-14.8C75 42.35 85.2 33 100.16 33h12.26a2.88 2.88 0 0 1 2.85 2.92v12.9a2.88 2.88 0 0 1-2.85 2.92h-7.52c-8.13 0-9.71 4-9.71 9.78v12.81h17.87a2.88 2.88 0 0 1 2.82 3.25"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg></Link></li>
                                    <li><Link href="#"><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        id="Layer_1"
                                        width="45"
                                        height="45"
                                        viewBox="0 0 512 512"
                                    >
                                        <linearGradient
                                            id="SVGID_1_"
                                            x1="84.679"
                                            x2="404.429"
                                            y1="427.321"
                                            y2="107.571"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0" stopColor="#fee411"></stop>
                                            <stop offset="0.052" stopColor="#fedb16"></stop>
                                            <stop offset="0.138" stopColor="#fec125"></stop>
                                            <stop offset="0.248" stopColor="#fe983d"></stop>
                                            <stop offset="0.376" stopColor="#fe5f5e"></stop>
                                            <stop offset="0.5" stopColor="#fe2181"></stop>
                                            <stop offset="1" stopColor="#9000dc"></stop>
                                        </linearGradient>
                                        <circle cx="256" cy="256" r="225" fill="url(#SVGID_1_)"></circle>
                                        <g fill="#fff">
                                            <path d="M303.8 131h-95.5c-42.6 0-77.2 34.6-77.2 77.2v95.5c0 42.6 34.6 77.2 77.2 77.2h95.5c42.6 0 77.2-34.6 77.2-77.2v-95.5c0-42.6-34.6-77.2-77.2-77.2m49.3 172.8c0 27.2-22.1 49.4-49.4 49.4h-95.5c-27.2 0-49.4-22.1-49.4-49.4v-95.5c0-27.2 22.1-49.4 49.4-49.4h95.5c27.2 0 49.4 22.1 49.4 49.4z"></path>
                                            <path d="M256 192.1c-35.2 0-63.9 28.7-63.9 63.9s28.7 63.9 63.9 63.9 63.9-28.7 63.9-63.9-28.7-63.9-63.9-63.9m0 102.7c-21.4 0-38.8-17.4-38.8-38.8s17.4-38.8 38.8-38.8 38.8 17.4 38.8 38.8-17.4 38.8-38.8 38.8"></path>
                                            <circle
                                                cx="323.1"
                                                cy="188.4"
                                                r="10.8"
                                                transform="rotate(-9.25 323.353 188.804)"
                                            ></circle>
                                        </g>
                                    </svg></Link></li>
                                    <li><Link href="#">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlSpace="preserve"
                                            id="Capa_1"
                                            width="40"
                                            height="40"
                                            x="0"
                                            y="0"
                                            version="1.1"
                                            viewBox="0 0 112.196 112.196"
                                        >
                                            <circle cx="56.098" cy="56.097" r="56.098" fill="#007AB9"></circle>
                                            <path
                                                fill="#F1F2F2"
                                                d="M89.616 60.611v23.128H76.207V62.161c0-5.418-1.936-9.118-6.791-9.118-3.705 0-5.906 2.491-6.878 4.903-.353.862-.444 2.059-.444 3.268v22.524h-13.41s.18-36.546 0-40.329h13.411v5.715c-.027.045-.065.089-.089.132h.089v-.132c1.782-2.742 4.96-6.662 12.085-6.662 8.822 0 15.436 5.764 15.436 18.149m-54.96-36.642c-4.587 0-7.588 3.011-7.588 6.967 0 3.872 2.914 6.97 7.412 6.97h.087c4.677 0 7.585-3.098 7.585-6.97-.089-3.956-2.908-6.967-7.496-6.967m-6.791 59.77H41.27v-40.33H27.865z"
                                            ></path>
                                        </svg>
                                    </Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <div className='footer-links'>
                                <h4>company</h4>
                                <ul>
                                    <li><Link href="#">About us</Link></li>
                                </ul>
                            </div>

                        </div>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <div className='footer-links'>
                                <h4>legal</h4>
                                <ul>
                                    <li><Link href="#">privacy policy</Link></li>
                                    <li><Link href="#">terms & conditions</Link></li>
                                    <li><Link href="#">return policy</Link></li>
                                </ul>
                            </div>

                        </div>
                        <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                            <div className='footer-links footer-contact-block'>
                                <h4>contact us</h4>
                                <ul>
                                    <li><Link href="#">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlSpace="preserve"
                                            width="25"
                                            height="25"
                                            viewBox="0 0 512 512"
                                        >
                                            <path
                                                fill="#5d5d5d"
                                                fillRule="evenodd"
                                                d="m62.843 98.364 138.32 138.38c30.168 30.11 79.482 30.136 109.675 0l138.32-138.38a3.144 3.144 0 0 0-.426-4.814c-14.108-9.839-31.273-15.672-49.763-15.672H113.033c-18.491 0-35.656 5.834-49.764 15.672a3.144 3.144 0 0 0-.426 4.814m-36.964 66.667a86.5 86.5 0 0 1 9.955-40.353 3.144 3.144 0 0 1 5.019-.762l136.569 136.569c43.247 43.31 113.885 43.335 157.158 0l136.569-136.569a3.144 3.144 0 0 1 5.019.762 86.5 86.5 0 0 1 9.955 40.353v181.937c0 48.093-39.121 87.154-87.154 87.154H113.033c-48.032 0-87.154-39.061-87.154-87.154z"
                                                clipRule="evenodd"
                                                data-original="#000000"
                                            ></path>
                                        </svg>

                                        connect@findmyinvestor.in</Link></li>
                                    <li>
                                        <Link href="#"><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlSpace="preserve"
                                            width="25"
                                            height="25"
                                            viewBox="0 0 492.456 492.456"
                                        >
                                            <path
                                                fill="#5d5d5d"
                                                d="M13.448 208.9c-8.7-23.5-15-47.5-13.1-73 1.2-15.7 7.1-29.1 18.6-40.1 12.5-11.8 24.3-24.2 36.6-36.2 16-15.8 36.1-15.7 52.1 0 9.9 9.7 19.7 19.6 29.5 29.5 9.5 9.5 19.1 19 28.6 28.6 16.7 16.9 16.8 36.6.1 53.4-12 12-23.9 24.1-36.1 35.9-3.2 3.1-3.5 5.7-1.8 9.6 8 19.2 19.6 36.3 32.6 52.3 26.2 32.2 55.8 60.8 91.1 82.9 7.6 4.7 15.9 8.2 23.8 12.5 4.1 2.2 6.8 1.5 10.1-1.9 11.9-12.3 24.1-24.4 36.3-36.5 16-15.8 36-15.9 52 0q29.4 29.1 58.5 58.5c16.3 16.4 16.2 36.5-.2 53-11.1 11.2-22.8 21.8-33.2 33.5-15.2 17-34.4 22.6-56.2 21.4-31.8-1.7-61.1-12.3-89.4-26-62.8-30.5-116.4-72.8-161.3-126.2-33.2-39.6-60.6-82.6-78.6-131.2m479 35.8c0-134.9-109.8-244.7-244.7-244.7v46.6c109.2 0 198.1 88.9 198.1 198.1zm-134 0h46.6c0-86.7-70.6-157.3-157.3-157.3V134c29.6 0 57.4 11.5 78.3 32.4s32.4 48.7 32.4 78.3"
                                                data-original="#000000"
                                            ></path>
                                        </svg> +91 995837200</Link></li>
                                </ul>
                            </div>

                        </div>
                    </div>

                    <div className='footer-copyright'>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <p>© 2024 Copyright. all right reserved</p>
                            </div>
                            <div className='col-12 col-md-6'>
                                <p>Made by VOCSO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
