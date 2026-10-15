'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    Calendar, MapPin, Users, ExternalLink, Info, Play, Mic, Github, Linkedin, FileText, Heart, Home,
} from 'lucide-react';
import BackgroundLogos from '@/components/BackgroundLogos';
import portfolioData from '@/data/portfolio.json';

interface SpeakingEvent {
    id: number;
    event: string;
    title: string;
    date: string;
    location: string;
    type: string;
    description: string;
    slides?: string;
    info?: string;
    recording?: string;
    audience: number;
}

interface CommunityDaysShowcaseProps {
    heading: string;
    tagline: string;
    logo: string;
    eventPrefix: string;
}

export default function CommunityDaysShowcase({ heading, tagline, logo, eventPrefix }: CommunityDaysShowcaseProps) {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const personal = portfolioData.personal;
    const events = (portfolioData.speaking as SpeakingEvent[])
        .filter((event) => event.event.startsWith(eventPrefix))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const totalAudience = events.reduce((sum, event) => sum + event.audience, 0);
    const cities = new Set(events.map((event) => event.location)).size;

    const socialLinks = [
        { icon: Linkedin, href: personal.linkedin, label: 'LinkedIn' },
        { icon: Github, href: personal.github, label: 'GitHub' },
        { icon: FileText, href: personal.medium, label: 'Medium' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-x-hidden">
            <BackgroundLogos scrollY={scrollY} />

            <main className="relative z-10">
                {/* Hero */}
                <section className="pt-24 pb-16 relative">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center justify-center gap-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                    className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-1 shadow-xl shadow-cyan-500/20"
                                >
                                    <div className="w-full h-full rounded-full overflow-hidden relative">
                                        <Image src={personal.avatar} alt={personal.name} fill sizes="128px" className="object-cover" priority />
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.35, type: 'spring', stiffness: 200 }}
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center p-4"
                                >
                                    <div className="w-full h-full relative">
                                        <Image src={logo} alt={heading} fill sizes="96px" className="object-contain" />
                                    </div>
                                </motion.div>
                            </div>

                            <div className="space-y-4">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-4xl md:text-6xl font-bold text-white"
                                >
                                    {heading}
                                </motion.h1>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="space-y-2"
                                >
                                    <h2 className="text-xl md:text-2xl font-semibold text-cyan-400">
                                        {personal.name} · {personal.title}
                                    </h2>
                                    <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">{tagline}</p>
                                </motion.div>
                            </div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="inline-flex flex-wrap justify-center items-center gap-6 md:gap-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl px-8 py-4"
                            >
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-cyan-400">{events.length}</div>
                                    <div className="text-sm text-gray-400">Talks</div>
                                </div>
                                <div className="w-px h-10 bg-slate-600" />
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-cyan-400">{totalAudience.toLocaleString()}+</div>
                                    <div className="text-sm text-gray-400">Total Audience</div>
                                </div>
                                <div className="w-px h-10 bg-slate-600" />
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-cyan-400">{cities}</div>
                                    <div className="text-sm text-gray-400">Cities</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Events */}
                <section className="pb-20 relative">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-center mb-12">
                            <Mic className="w-7 h-7 text-cyan-400 mr-3" />
                            <h2 className="text-3xl md:text-4xl font-bold text-white">My Sessions</h2>
                        </div>

                        <div className="space-y-8">
                            {events.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 md:p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                        <h3 className="text-2xl font-bold text-cyan-400">{event.event}</h3>
                                        <span className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
                                            {event.type}
                                        </span>
                                    </div>

                                    <h4 className="text-xl font-semibold text-white mb-4">{event.title}</h4>

                                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-gray-300 text-sm">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 mr-2" />
                                            <span>~{event.audience} attendees</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-300 leading-relaxed mb-6">{event.description}</p>

                                    <div className="flex flex-wrap gap-3">
                                        {event.recording && (
                                            <motion.a
                                                href={event.recording}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="inline-flex items-center px-4 py-2 text-sm bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-600/30 transition-all duration-200"
                                            >
                                                <Play className="w-4 h-4 mr-2 fill-current" />
                                                Watch Recording
                                            </motion.a>
                                        )}
                                        {event.slides && (
                                            <motion.a
                                                href={event.slides}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="inline-flex items-center px-4 py-2 text-sm bg-slate-700 border border-slate-600 text-white rounded-lg hover:bg-slate-600 hover:border-cyan-500 transition-all duration-200"
                                            >
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                View Slides
                                            </motion.a>
                                        )}
                                        {event.info && event.info !== event.recording && (
                                            <motion.a
                                                href={event.info}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-400 rounded-lg hover:from-cyan-500/30 hover:to-blue-600/30 transition-all duration-200"
                                            >
                                                <Info className="w-4 h-4 mr-2" />
                                                Event Page
                                            </motion.a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Connect */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mt-16 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8"
                        >
                            <h3 className="text-2xl font-bold text-white mb-4">Let&apos;s Connect</h3>
                            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                                Questions about the talk, or want to continue the conversation? Reach out on any of these.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {socialLinks.map(({ icon: Icon, href, label }) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-flex items-center px-6 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg hover:bg-slate-600 hover:border-cyan-500 transition-all duration-200 font-medium"
                                    >
                                        <Icon className="w-5 h-5 mr-2" />
                                        {label}
                                    </motion.a>
                                ))}
                                <motion.a
                                    href="/"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-cyan-500/25"
                                >
                                    <Home className="w-5 h-5 mr-2" />
                                    Full Portfolio
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <footer className="relative z-10 bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center text-gray-400 text-sm">
                    <span>© {new Date().getFullYear()} {personal.name}. Built with</span>
                    <Heart className="w-4 h-4 mx-1 text-red-400" />
                    <span>and Next.js</span>
                </div>
            </footer>
        </div>
    );
}
