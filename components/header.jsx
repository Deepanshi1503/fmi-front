"use client"
import Image from 'next/image';
import React from 'react'
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


export default function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" className="main-navigation-block">
            <Container>
                <Navbar.Brand href="#home">
                    <Link href="/" className="logo">
                        <Image
                            loading="lazy"
                            className="img-fluid"
                            src="/images/logo.png"
                            alt="logo"
                            width={164}
                            height={69}
                        />
                    </Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href="#features">businesses</Nav.Link>
                        <Nav.Link href="#pricing">investors</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#">contact us</Nav.Link>
                        {/* <button href="/signup"className='signin-btn'>Sign in</button> */}
                        <Link href="/signup" passHref>
                            <button className="signin-btn">Sign in</button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>




    )
}
