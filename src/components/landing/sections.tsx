"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Palette,
  Wand2,
  Users,
  Layers,
  Download,
  MessageSquare,
  Zap,
  ChevronRight,
  Star,
  PenTool,
  ImageIcon,
  FileText,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-bg">
        <div className="absolute inset-0 halftone-bg opacity-50" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-600/30 bg-brand-600/10 px-4 py-1.5 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-brand-400" />
            <span className="text-sm font-medium text-brand-300">
              AI-Powered Comic Creation
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
            <span className="text-surface-100">Transform Your</span>
            <br />
            <span className="bg-gradient-to-r from-brand-400 via-accent-400 to-comic-pink bg-clip-text text-transparent">
              Imagination
            </span>
            <br />
            <span className="text-surface-100">Into Comics</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-surface-400 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "100ms" }}>
            Enter a story idea. AI creates the narrative, characters, and artwork.
            You stay in control at every step — editing scenes, designing characters,
            and composing your final comic.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Link href="/create">
              <Button
                variant="comic"
                size="xl"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Start Creating
              </Button>
            </Link>
            <Link href="/login?demo=true">
              <Button
                variant="outline"
                size="xl"
                leftIcon={<BookOpen className="h-5 w-5" />}
              >
                Try Demo
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 mt-16 animate-fade-in" style={{ animationDelay: "400ms" }}>
            {[
              { label: "Story Styles", value: "10+" },
              { label: "Scene Actions", value: "20+" },
              { label: "Export Formats", value: "PNG & PDF" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-surface-100">
                  {stat.value}
                </div>
                <div className="text-xs text-surface-500 mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating comic panels preview */}
        <div className="mt-20 relative max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "500ms" }}>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { color: "from-brand-600/20 to-brand-800/20", label: "Scene 1", icon: <PenTool className="h-8 w-8" /> },
              { color: "from-accent-600/20 to-accent-800/20", label: "Scene 2", icon: <ImageIcon className="h-8 w-8" /> },
              { color: "from-comic-pink/20 to-comic-red/20", label: "Scene 3", icon: <MessageSquare className="h-8 w-8" /> },
            ].map((panel, i) => (
              <div
                key={panel.label}
                className={`aspect-[3/4] rounded-xl border-2 border-dark-border bg-gradient-to-br ${panel.color} flex flex-col items-center justify-center gap-3 group hover:scale-[1.02] transition-transform duration-300`}
                style={{ animationDelay: `${600 + i * 100}ms` }}
              >
                <div className="text-surface-500 group-hover:text-surface-300 transition-colors">
                  {panel.icon}
                </div>
                <span className="text-xs text-surface-500 font-medium">
                  {panel.label}
                </span>
              </div>
            ))}
          </div>
          {/* Speech bubble overlay */}
          <div className="absolute -top-6 right-4 sm:right-12 speech-bubble text-sm animate-bounce-in" style={{ animationDelay: "800ms" }}>
            Pow! 💥
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <Wand2 className="h-6 w-6" />,
      title: "AI Story Generation",
      description:
        "Enter a simple idea and AI creates a complete story with scenes, dialogue, characters, and panel layouts.",
      color: "text-brand-400 bg-brand-600/10 border-brand-600/20",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Character Creator",
      description:
        "Design characters with precise control — face, outfit, accessories — or let AI suggest designs based on your description.",
      color: "text-accent-400 bg-accent-600/10 border-accent-600/20",
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Scene Editor",
      description:
        "Edit every detail of every scene. Change dialogue, adjust camera angles, modify character emotions, or use AI to rewrite scenes.",
      color: "text-comic-green bg-green-600/10 border-green-600/20",
    },
    {
      icon: <ImageIcon className="h-6 w-6" />,
      title: "Panel Generation",
      description:
        "AI generates stunning comic panels while maintaining character consistency across every frame.",
      color: "text-comic-yellow bg-yellow-600/10 border-yellow-600/20",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Speech Bubble Editor",
      description:
        "Add and style speech bubbles, thought clouds, narration boxes, and sound effects with full control.",
      color: "text-comic-pink bg-pink-600/10 border-pink-600/20",
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Export Anywhere",
      description:
        "Export your finished comic as high-resolution PNG images or multi-page PDF ready for printing or sharing.",
      color: "text-comic-cyan bg-cyan-600/10 border-cyan-600/20",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 halftone-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-4">
            Everything You Need to Create Comics
          </h2>
          <p className="text-lg text-surface-400 max-w-2xl mx-auto">
            From story idea to finished comic book — every tool you need, powered by AI, controlled by you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-dark-border bg-dark-card p-6 hover:bg-dark-hover hover:border-surface-600 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border ${feature.color} mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-surface-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-surface-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Enter Your Story Idea",
      description:
        "Describe your comic concept in plain language. Choose genre, tone, style, and audience. AI takes it from there.",
      icon: <FileText className="h-6 w-6" />,
      color: "brand",
    },
    {
      step: "02",
      title: "Review & Edit the Story",
      description:
        "AI generates scenes, dialogue, and characters. Edit everything — rewrite scenes, adjust dialogue, add your own scenes.",
      icon: <PenTool className="h-6 w-6" />,
      color: "accent",
    },
    {
      step: "03",
      title: "Design Your Characters",
      description:
        "Describe characters in detail or let AI suggest designs. Approve reference images and lock key visual traits for consistency.",
      icon: <Palette className="h-6 w-6" />,
      color: "green",
    },
    {
      step: "04",
      title: "Generate Comic Panels",
      description:
        "AI creates each panel using your approved scenes and character designs. Retry any panel. Replace or regenerate freely.",
      icon: <Layers className="h-6 w-6" />,
      color: "yellow",
    },
    {
      step: "05",
      title: "Compose & Export",
      description:
        "Add speech bubbles, narration, and sound effects in the comic studio. Export as high-res PNG or multi-page PDF.",
      icon: <Download className="h-6 w-6" />,
      color: "pink",
    },
  ];

  const colorMap: Record<string, string> = {
    brand: "text-brand-400 border-brand-600/30 bg-brand-600/10",
    accent: "text-accent-400 border-accent-600/30 bg-accent-600/10",
    green: "text-comic-green border-green-600/30 bg-green-600/10",
    yellow: "text-comic-yellow border-yellow-600/30 bg-yellow-600/10",
    pink: "text-comic-pink border-pink-600/30 bg-pink-600/10",
  };

  return (
    <section id="how-it-works" className="py-24 bg-dark-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-surface-400 max-w-2xl mx-auto">
            Five simple steps from idea to finished comic. You control every detail.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-dark-border hidden lg:block" />

          <div className="space-y-8 lg:space-y-12">
            {steps.map((item) => (
              <div
                key={item.step}
                className="relative flex flex-col lg:flex-row items-start gap-6 lg:gap-8"
              >
                {/* Step number */}
                <div className="flex items-center gap-4 lg:w-16 flex-shrink-0">
                  <div
                    className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl border-2 ${colorMap[item.color]}`}
                  >
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 rounded-xl border border-dark-border bg-dark-card p-6 lg:ml-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-surface-500 tracking-widest uppercase">
                      Step {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-surface-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-surface-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function GallerySection() {
  const styles = [
    { name: "Superhero", color: "from-brand-600 to-brand-800" },
    { name: "Manga", color: "from-accent-600 to-accent-800" },
    { name: "Noir", color: "from-surface-700 to-surface-900" },
    { name: "Sci-Fi", color: "from-cyan-600 to-cyan-800" },
    { name: "Fantasy", color: "from-purple-600 to-purple-800" },
    { name: "Cartoon", color: "from-comic-yellow to-comic-orange" },
  ];

  return (
    <section id="gallery" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-4">
            Choose Your Style
          </h2>
          <p className="text-lg text-surface-400 max-w-2xl mx-auto">
            Create comics in any style — from classic superhero to manga, noir to watercolour.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {styles.map((style) => (
            <div
              key={style.name}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden border-2 border-dark-border hover:border-surface-500 transition-all duration-300 cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${style.color} opacity-30 group-hover:opacity-50 transition-opacity`}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Palette className="h-10 w-10 text-surface-300 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-bold text-surface-100">
                  {style.name}
                </span>
                <span className="text-xs text-surface-400 mt-1">
                  Comic Style
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Indie Comic Creator",
      content:
        "ComicCraft AI turned my rough story ideas into a full 12-page comic in hours. The character consistency is incredible.",
      rating: 5,
    },
    {
      name: "Maria Santos",
      role: "Storyteller",
      content:
        "I love that I can edit every scene and keep full creative control. The AI assists but never overrides my vision.",
      rating: 5,
    },
    {
      name: "Jordan Park",
      role: "Game Designer",
      content:
        "We use ComicCraft AI for rapid storyboarding. The scene editor and character creator save us days of work.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-dark-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-4">
            What Creators Say
          </h2>
          <p className="text-lg text-surface-400">
            Join creators who are already building comics with AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-dark-border bg-dark-card p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-comic-yellow text-comic-yellow"
                  />
                ))}
              </div>
              <p className="text-sm text-surface-300 leading-relaxed mb-4">
                &ldquo;{t.content}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-surface-100">
                  {t.name}
                </p>
                <p className="text-xs text-surface-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  const faqs = [
    {
      q: "Do I need artistic skills to use ComicCraft AI?",
      a: "No. You provide the story idea and character descriptions. AI generates the artwork. You control every detail through editing.",
    },
    {
      q: "Can I edit the AI-generated story?",
      a: "Absolutely. Every scene, dialogue line, character action, and camera angle is fully editable. You can also add your own scenes manually.",
    },
    {
      q: "How does character consistency work?",
      a: "Each character has a 'Character DNA' — a locked set of visual traits. AI uses this data plus the approved reference image to maintain the same look across all panels.",
    },
    {
      q: "What export formats are supported?",
      a: "You can export individual panels or full comic pages as high-resolution PNG images, or export the entire comic as a multi-page PDF.",
    },
    {
      q: "Can I regenerate individual panels?",
      a: "Yes. If a panel doesn't look right, regenerate just that panel without affecting the rest of your comic.",
    },
    {
      q: "Is my work saved automatically?",
      a: "Yes. The comic studio auto-saves your work. You can also manually save at any time and reopen projects later.",
    },
  ];

  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="rounded-xl border border-dark-border bg-dark-card overflow-hidden">
      <button
        className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-surface-100 hover:bg-dark-hover transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {question}
        <ChevronRight
          className={`h-4 w-4 text-surface-400 transition-transform duration-200 flex-shrink-0 ml-4 ${
            open ? "rotate-90" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-4 text-sm text-surface-400 leading-relaxed animate-slide-down">
          {answer}
        </div>
      )}
    </div>
  );
}

export function CTASection() {
  return (
    <section className="py-24 bg-dark-surface relative overflow-hidden">
      <div className="absolute inset-0 halftone-bg opacity-30" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-600/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-comic-yellow/30 bg-comic-yellow/10 px-4 py-1.5 mb-6">
          <Zap className="h-4 w-4 text-comic-yellow" />
          <span className="text-sm font-medium text-comic-yellow">
            Ready to Create?
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-surface-100 mb-4">
          Your Comic Starts With an Idea
        </h2>
        <p className="text-lg text-surface-400 mb-8">
          No drawing skills needed. Enter your story concept and let AI bring it to life.
          You keep full creative control.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/create">
            <Button
              variant="comic"
              size="xl"
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              Start Creating Now
            </Button>
          </Link>
          <Link href="/#features">
            <Button variant="ghost" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-bg py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-surface-300">
              ComicCraft<span className="text-brand-400">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/#features"
              className="text-sm text-surface-500 hover:text-surface-300 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm text-surface-500 hover:text-surface-300 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#faq"
              className="text-sm text-surface-500 hover:text-surface-300 transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/help"
              className="text-sm text-surface-500 hover:text-surface-300 transition-colors"
            >
              Help
            </Link>
          </div>

          <p className="text-xs text-surface-600">
            © {new Date().getFullYear()} ComicCraft AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
