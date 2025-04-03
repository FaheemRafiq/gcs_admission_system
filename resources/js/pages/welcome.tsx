import GcsLogoSvg from '@/assets/Logo.svg';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Clock, Headset, Shield } from 'lucide-react';

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

            <div className="from-background to-background/95 text-foreground flex min-h-screen flex-col bg-gradient-to-b">
                {/* Navbar */}
                <header className="border-border/40 bg-background/80 sticky top-0 z-10 w-full border-b backdrop-blur-md">
                    <div className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <img src={GcsLogoSvg} alt="Government Graduate College of Science Logo" className="h-12 w-auto" />
                            <div className="hidden md:block">
                                <h1 className="text-foreground text-lg font-bold">Government Graduate College of Science</h1>
                                <p className="text-muted-foreground text-sm">Wahdat Road, Lahore</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-5 py-2 text-sm font-medium transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex gap-3">
                                    <Link
                                        href={route('login')}
                                        className="border-border text-foreground hover:bg-muted rounded-md border px-5 py-2 text-sm font-medium transition-colors"
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
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
                        {/* Hero Text */}
                        <div className="flex flex-col space-y-6">
                            <div className="border-border bg-muted inline-flex items-center rounded-full border px-3 py-1 text-sm">
                                <span className="text-primary mr-1">✓</span> Admissions Open for {currentYear}
                            </div>

                            <h1 className="text-destructive text-5xl font-bold tracking-tight xl:text-6xl">
                                Your Future{' '}
                                <span className="relative inline-block">
                                    <span className="relative z-10">Starts Here</span>
                                    <span className="bg-cyan/30 absolute bottom-2 left-0 z-0 h-3 w-full"></span>
                                </span>
                            </h1>

                            <p className="text-muted-foreground max-w-lg text-lg">
                                Apply with our fast, secure, and easy-to-use admission system. Join a community of future leaders and innovators.
                            </p>

                            <div className="flex items-center gap-4 pt-4">
                                <Link
                                    href={route('admission-form.index')}
                                    className="group bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex transform items-center gap-2 rounded-lg px-4 py-2 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 md:px-6 md:py-3"
                                >
                                    Apply Now
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                                <a
                                    href="https://sites.google.com/gcslahore.edu.pk/ggcs/home"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border-border hover:bg-muted/50 rounded-lg border px-4 py-2 text-base font-medium transition-colors md:px-5 md:py-3"
                                >
                                    Visit College Website
                                </a>
                            </div>

                            {/* Trust Badges */}
                            <div className="border-border/50 mt-8 border-t pt-6">
                                <p className="text-muted-foreground mb-4 text-sm font-medium">Join thousands of students who trust us</p>
                                <div className="flex flex-col flex-wrap gap-4 md:flex-row">
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
                        <div className="bg-card border-border/50 relative overflow-hidden rounded-xl border p-8 shadow-lg">
                            <div className="bg-cyan/10 absolute -top-12 -right-12 h-40 w-40 rounded-full"></div>

                            <div className="mb-6 flex flex-col items-center gap-4 md:flex-row">
                                <img src={GcsLogoSvg} alt="College Logo" className="h-16 w-16" />
                                <div>
                                    <h2 className="text-card-foreground text-2xl font-bold">Government Graduate College of Science</h2>
                                    <h3 className="text-muted-foreground text-lg">گورنمنٹ گریجوایٹ کالج آف سائنس</h3>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-card-foreground mb-4 text-xl font-semibold">Why Choose Online Admission?</h3>
                                <ul className="space-y-5">
                                    <li className="flex gap-4">
                                        <div className="bg-destructive/10 text-destructive flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                                            <Clock className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Fast & Easy Application</h4>
                                            <p className="text-muted-foreground text-sm">
                                                Complete your application in minutes with our streamlined process.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="bg-cyan/10 text-cyan flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                                            <Shield className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Secure & Reliable</h4>
                                            <p className="text-muted-foreground text-sm">Your data is protected with advanced security measures.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                                            <Headset className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">24/7 Support</h4>
                                            <p className="text-muted-foreground text-sm">Our dedicated team is ready to assist you at every step.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="border-border/50 mt-8 border-t pt-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h4 className="font-medium">Admissions Closing Soon</h4>
                                        <p className="text-muted-foreground text-sm">Don't miss your opportunity to enroll</p>
                                    </div>
                                    <Link
                                        href={route('admission-form.index')}
                                        className="bg-cyan text-cyan-foreground hover:bg-cyan/90 mt-4 inline-flex items-center gap-1 self-center rounded-lg px-4 py-2 text-sm font-medium transition-colors md:mt-0 md:self-auto"
                                    >
                                        Apply Now
                                        <ArrowRight className="ml-1 h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-border/40 bg-muted/50 mt-auto border-t">
                    <div className="mx-auto max-w-7xl px-4 py-8">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="flex flex-col items-center md:items-start">
                                <p className="text-muted-foreground text-sm">© {currentYear} GGCS, Lahore. All rights reserved.</p>
                                <p className="text-muted-foreground mt-1 text-xs">Wahdat Road, Lahore. Phone: +92-42-99260119</p>
                            </div>
                            <div className="flex gap-6">
                                <a
                                    href="https://sites.google.com/gcslahore.edu.pk/ggcs/home"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                >
                                    Official Website
                                </a>
                                <div
                                    // href={route('privacy')}
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                >
                                    Privacy Policy
                                </div>
                                <div
                                    // href={route('contact')}
                                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
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
