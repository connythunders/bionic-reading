"use client";

import Link from "next/link";
import { Mic, BookOpen, Headphones, PenLine, BookMarked, Users, Star, ArrowRight, CheckCircle2 } from "lucide-react";

const sections = [
  {
    icon: Mic,
    label: "Speaking",
    sublabel: "Delprov A",
    href: "/speaking",
    color: "bg-violet-500",
    textColor: "text-violet-600",
    bgLight: "bg-violet-50",
    borderColor: "border-violet-200",
    description: "Spela in dig själv och få direkt AI-feedback på uttal, flyt och argumentationsförmåga.",
  },
  {
    icon: BookOpen,
    label: "Reading",
    sublabel: "Delprov B",
    href: "/reading",
    color: "bg-purple-500",
    textColor: "text-purple-600",
    bgLight: "bg-purple-50",
    borderColor: "border-purple-200",
    description: "Autentiska texter på B2-C1 nivå med frågor i NP-format – argumenterande, akademiska och informativa.",
  },
  {
    icon: Headphones,
    label: "Listening",
    sublabel: "Delprov C",
    href: "/listening",
    color: "bg-fuchsia-500",
    textColor: "text-fuchsia-600",
    bgLight: "bg-fuchsia-50",
    borderColor: "border-fuchsia-200",
    description: "AI-genererat brittiskt tal simulerar provsituationen – debatter, intervjuer och föreläsningar.",
  },
  {
    icon: PenLine,
    label: "Writing",
    sublabel: "Delprov D",
    href: "/writing",
    color: "bg-orange-500",
    textColor: "text-orange-600",
    bgLight: "bg-orange-50",
    borderColor: "border-orange-200",
    description: "Argumenterande texter, rapporter och formella brev med AI-återkoppling på gymnasienivå.",
  },
];

const features = [
  { icon: Star, text: "Anpassad till Gy11 och Skolverkets kursplan" },
  { icon: CheckCircle2, text: "AI-feedback med NP-betygen E, C och A" },
  { icon: Headphones, text: "Brittiska röster via ElevenLabs" },
  { icon: BookMarked, text: "Autentiska provformat för Engelska 6" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <BookMarked className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">NP Engelska</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#om" className="hover:text-gray-900 transition-colors">Om provet</a>
            <a href="#sektioner" className="hover:text-gray-900 transition-colors">Delprov</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/speaking"
              className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors flex items-center gap-2"
            >
              Börja öva <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-gradient pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-white/80 rounded-full px-4 py-1.5 text-sm text-gray-600 mb-6 shadow-sm">
            <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
            Engelska 6 · Gymnasium
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 leading-tight">
            Träna inför{" "}
            <span className="gradient-text">Nationella</span>
            <br />
            <span className="text-purple-500">Provet</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Öva på alla delar av det nationella provet i engelska för gymnasiet med interaktiva
            uppgifter och AI-handledning. Anpassat till Gy11 och Engelska 6 (B2-C1 nivå).
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-10">
            <Users className="w-4 h-4" />
            <span>Designad för gymnasieelever som läser Engelska 6</span>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-white/90 rounded-full px-4 py-2 text-sm text-gray-700 shadow-sm"
              >
                <f.icon className="w-4 h-4 text-violet-500" />
                {f.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Cards */}
      <section id="sektioner" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Välj ditt delprov</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Nationella provet i engelska för gymnasiet (Engelska 6) består av fyra delprov.
              Öva på dem i valfri ordning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className={`group block bg-white rounded-2xl border ${section.borderColor} p-6 card-hover shadow-sm`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${section.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <section.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-bold text-gray-900">{section.label}</h3>
                      <span className={`text-xs font-semibold ${section.textColor} ${section.bgLight} px-2.5 py-1 rounded-full`}>
                        {section.sublabel}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{section.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About the test */}
      <section id="om" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Om Nationella Provet – Gymnasiet</h2>
            <p className="text-gray-600">
              Vad bedöms i varje delprov för Engelska 6 enligt Skolverkets riktlinjer (Gy11)?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Delprov A – Speaking",
                color: "border-l-violet-500",
                items: [
                  "Muntlig kommunikation och argumentation",
                  "Uttal, prosodi och flyt på B2-C1 nivå",
                  "Varierat ordförråd och grammatisk precision",
                  "Seminariediskussion och formell presentation",
                ],
              },
              {
                title: "Delprov B – Reading",
                color: "border-l-purple-500",
                items: [
                  "Förståelse av komplexa autentiska texter",
                  "Akademiska, argumenterande och informativa texter",
                  "Tolka underförstådd information och ton",
                  "Texter på B2–C1 nivå (CEFR)",
                ],
              },
              {
                title: "Delprov C – Listening",
                color: "border-l-fuchsia-500",
                items: [
                  "Förståelse av talat engelska på hög nivå",
                  "Debatter, akademiska föreläsningar, intervjuer",
                  "Identifiera ståndpunkter, argument och attityder",
                  "Brittiska accenter och formellt språk",
                ],
              },
              {
                title: "Delprov D – Writing",
                color: "border-l-orange-500",
                items: [
                  "Argumenterande och analytisk skriftlig produktion",
                  "Rapport, artikel, formellt brev och essä",
                  "Avancerat ordförråd och grammatisk variation",
                  "Anpassning till genre, syfte och mottagare",
                ],
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`bg-gray-50 rounded-xl p-5 border-l-4 ${item.color}`}
              >
                <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 hero-gradient">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Redo att börja öva?
          </h2>
          <p className="text-gray-600 mb-8">
            Välj ett delprov och börja träna nu. AI-handledning hjälper dig att förbättra
            dig snabbare inför Engelska 6-provet.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className={`flex items-center gap-2 ${s.color} text-white px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-sm`}
              >
                <s.icon className="w-4 h-4" />
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-violet-500 rounded flex items-center justify-center">
              <BookMarked className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-white">NP Engelska – Gymnasiet</span>
          </div>
          <p className="text-sm text-center">
            Anpassad till Skolverkets kursplan för Gy11 · Engelska 6
          </p>
          <p className="text-xs text-gray-500">
            AI-feedback via Claude · Röster via ElevenLabs
          </p>
        </div>
      </footer>
    </div>
  );
}
