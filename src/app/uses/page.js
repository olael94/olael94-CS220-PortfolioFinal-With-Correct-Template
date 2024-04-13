import dynamic from 'next/dynamic';

import React from 'react';
const Navbar = dynamic(() => import('@/components/Navbar/Navbar'), { ssr: false });
import Footer from "@/components/Footer/Footer";
const ThemeSwitcher = dynamic(() => import('@/components/ThemeSwitcher/ThemeSwitcher'), { ssr: false });
import AboutMe from "@/components/AboutMe/AboutMe";
import Usescard from "@/components/Usescard/Usescard";

// Links for Footer
const links = [
    {
        title: 'Home',
        url: '/',
    },
    {
        title: 'About',
        url: '/about',
    },
    {
        title: 'Projects',
        url: '/projects',
    },
    {
        title: 'Uses',
        url: '/uses',
    },
];

export default function Home() {
    return (
        <div className="body">
            <header>
                <Navbar
                    options={[
                        { path: '/', label: 'Home' },
                        { path: '/about', label: 'About' },
                        { path: '/projects', label: 'Projects' },
                        { path: '/uses', label: 'Uses' },
                    ]}
                />
                <ThemeSwitcher />
            </header>
            <main>
                <div className="main-container">
                    <section className="intro">
                        <AboutMe
                            name={'Software I use, gadgets I love, and other things I recommend.'}
                            content4={'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi..'}
                        />
                    </section>
                    <section className="uses-container">
                        <section className="tool-container">
                            <div className="tool-text-container">
                                Workstation
                            </div>
                            <div className="items-container">
                                <Usescard
                                    name=" Apple Mac Pro M1 Max "
                                    content1="This beast has taken me thru all my coding projects at school. I saved for a while to buy it. It runs all my projects smothly and can handle my 500 tabs open without a problem"
                                />
                                <Usescard
                                    name="Acer Nitro XZ342CK  34 inches Curved Ultrawide Gaming Monitor"
                                    content1="This monitor allows me to look at multiple navigators, tabs and windows at the same time. It actually saves me a lot of time by not having to navigate to find a window I need to look at. "
                                />
                                <Usescard
                                    name="Urmust Laptop Notebook Stand Holder"
                                    content1="This amazgin stand allows me to put my Mac Pro at eye level, and my Ultrawide monitor level as well. This prevents me to develop my hunchback further. "
                                />
                                <Usescard
                                    name="Apple Homepod Mini"
                                    content1="Since I am pretty picky when it comes to sound, I need to have a sound-quality device for my different needs. The integration of this device with my Mac pro makes my media watching more enjoyable"
                                />
                                <Usescard
                                    name="HP Z Workstation"
                                    content1="Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.."
                                />
                            </div>
                        </section>
                        <section className="tool-container">
                            <div className="tool-text-container">
                                Development tools
                            </div>
                            <div className="items-container">
                                <Usescard
                                    name="Visual Studio Code"
                                    content1="A lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS, and Linux."
                                />
                                <Usescard
                                    name="Sublime Text"
                                    content1="A sophisticated text editor for code, markup, and prose. You'll love the slick user interface, extraordinary features, and amazing performance."
                                />
                                <Usescard
                                    name="Atom"
                                    content1="A hackable text editor for the 21st century, built on Electron, and based on everything we love about our favorite editors."
                                />
                            </div>
                        </section>
                        <section className="tool-container">
                            <div className="tool-text-container">
                                Design
                            </div>
                            <div className="items-container">
                                <Usescard
                                    name="Adobe Photoshop"
                                    content1="The industry standard in raster graphics editing. It allows you to create, edit, and compose raster images in multiple layers and supports masks, alpha compositing, and several color models."
                                />
                                <Usescard
                                    name="Sketch"
                                    content1="A digital design toolkit built to help you create your best work — from your earliest ideas, through to final artwork."
                                />
                            </div>
                        </section>
                        <section className="tool-container">
                            <div className="tool-text-container">
                                Productivity
                            </div>
                            <div className="items-container">
                                <Usescard
                                    name="Trello"
                                    content1="A collaboration tool that organizes your projects into boards. In one glance, Trello tells you what's being worked on, who's working on what, and where something is in a process."
                                />
                                <Usescard
                                    name="Slack"
                                    content1="A collaboration hub that connects your work to the people you work with. It integrates with the tools and services you need and centralizes your notifications, files, and data from 2,000+ other apps."
                                />
                                <Usescard
                                    name="Google Workspace"
                                    content1="A suite of cloud computing, productivity, and collaboration tools, software, and products developed and marketed by Google. It includes Gmail, Calendar, Drive, Docs, Sheets, Slides, Meet, and more."
                                />
                                <Usescard
                                    name="Zoom"
                                    content1="A cloud-based video conferencing service you can use to virtually meet with others, either by video or audio-only or both, all while conducting live chats and it lets you record those sessions to view later."
                                />
                            </div>
                        </section>
                    </section>
                </div>
            </main>
            <footer>
                <Footer links={links} />
            </footer>
        </div>
    );
}