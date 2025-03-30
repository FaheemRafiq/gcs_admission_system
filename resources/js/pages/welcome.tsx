import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import GcsLogoSvg from '@/assets/Logo.svg';
import { ArrowRight, Clock, Shield, Headset } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const currentYear = new Date().getFullYear();

    return (
        <>
            <Head title="Welcome">
                <meta
                    name="description"
                    content="Apply online to Government Graduate College of Science, Lahore. Start your educational journey with our seamless admission system."
                />
                <meta
                    name="keywords"
                    content="admission system, Government Graduate College of Science, apply online, Lahore education, Laravel Inertia.js"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={window.location.href} />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/95 text-foreground">
                {/* Navbar */}
                <header className="sticky top-0 z-10 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
                    <div className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <img
                                src={GcsLogoSvg}
                                alt="Government Graduate College of Science Logo"
                                className="h-12 w-auto"
                            />
                            <div className="hidden md:block">
                                <h1 className="text-lg font-bold text-foreground">
                                    Government Graduate College of Science
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Wahdat Road, Lahore
                                </p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex gap-3">
                                    <Link
                                        href={route('login')}
                                        className="rounded-md border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    {/* <Link
                                        href={route('register')}
                                        className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                                    >
                                        Register
                                    </Link> */}
                                </div>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="mx-auto w-full max-w-7xl px-4 py-12 lg:py-24">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                        {/* Hero Text */}
                        <div className="flex flex-col space-y-6">
                            <div className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-sm">
                                <span className="mr-1 text-primary">✓</span> Admissions Open for {currentYear}
                            </div>
                            
                            <h1 className="text-5xl font-bold tracking-tight text-destructive xl:text-6xl">
                                Your Future <span className="relative inline-block">
                                    <span className="relative z-10">Starts Here</span>
                                    <span className="absolute bottom-2 left-0 z-0 h-3 w-full bg-cyan/30"></span>
                                </span>
                            </h1>
                            
                            <p className="text-lg text-muted-foreground max-w-lg">
                                Apply with our fast, secure, and 
                                easy-to-use admission system. Join a community of future leaders and innovators.
                            </p>
                            
                            <div className="flex items-center gap-4 pt-4">
                                <Link
                                    href={route('admission-form.index')}
                                    className="group inline-flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 md:px-6 md:py-3 text-base font-semibold text-destructive-foreground shadow-lg hover:bg-destructive/90 transform hover:scale-105 transition-all duration-300"
                                >
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                                
                                <a
                                    href="https://sites.google.com/gcslahore.edu.pk/ggcs/home"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg border border-border px-4 py-2 md:px-5 md:py-3 text-base font-medium hover:bg-muted/50 transition-colors"
                                >
                                    Visit College Website
                                </a>
                            </div>
                            
                            {/* Trust Badges */}
                            <div className="mt-8 pt-6 border-t border-border/50">
                                <p className="text-sm font-medium text-muted-foreground mb-4">
                                    Join thousands of students who trust us
                                </p>
                                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                                            ✓
                                        </span>
                                        <span className="text-sm font-medium">Govt. Recognized</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                            ✓
                                        </span>
                                        <span className="text-sm font-medium">Academic Excellence</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                            ✓
                                        </span>
                                        <span className="text-sm font-medium">Modern Facilities</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* College Information Card */}
                        <div className="rounded-xl bg-card p-8 shadow-lg border border-border/50 relative overflow-hidden">
                            <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-cyan/10"></div>
                            
                            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                                <img
                                    src={GcsLogoSvg}
                                    alt="College Logo"
                                    className="h-16 w-16"
                                />
                                <div>
                                    <h2 className="text-2xl font-bold text-card-foreground">
                                        Government Graduate College of Science
                                    </h2>
                                    <h3 className="text-lg text-muted-foreground">
                                        گورنمنٹ گریجوایٹ کالج آف سائنس
                                    </h3>
                                </div>
                            </div>
                            
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-card-foreground mb-4">
                                    Why Choose Online Admission?
                                </h3>
                                <ul className="space-y-5">
                                    <li className="flex gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                                            <Clock className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Fast & Easy Application</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Complete your application in minutes with our streamlined process.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-cyan">
                                            <Shield className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Secure & Reliable</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Your data is protected with advanced security measures.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <Headset className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">24/7 Support</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Our dedicated team is ready to assist you at every step.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-border/50">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                    <div>
                                        <h4 className="font-medium">Admissions Closing Soon</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Don't miss your opportunity to enroll
                                        </p>
                                    </div>
                                    <Link
                                        href={route('admission-form.index')}
                                        className="inline-flex mt-4 md:mt-0 self-center md:self-auto items-center gap-1 rounded-lg bg-cyan px-4 py-2 text-sm font-medium text-cyan-foreground hover:bg-cyan/90 transition-colors"
                                    >
                                        Apply Now
                                        <ArrowRight className="h-3 w-3 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-auto border-t border-border/40 bg-muted/50">
                    <div className="mx-auto max-w-7xl px-4 py-8">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="flex flex-col items-center md:items-start">
                                <p className="text-sm text-muted-foreground">
                                    © {currentYear} GGCS, Lahore. All rights reserved.
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Wahdat Road, Lahore. Phone: +92-42-99260119
                                </p>
                            </div>
                            <div className="flex gap-6">
                                <a
                                    href="https://sites.google.com/gcslahore.edu.pk/ggcs/home"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Official Website
                                </a>
                                <div
                                    // href={route('privacy')}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Privacy Policy
                                </div>
                                <div
                                    // href={route('contact')}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Contact Us
                                </div>
                                {/* <Link
                                    href={route('privacy')}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href={route('contact')}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Contact Us
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}