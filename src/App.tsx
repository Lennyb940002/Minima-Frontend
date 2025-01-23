import React, { useState } from 'react';
import { MailCheck, ArrowRight, Calendar, Calculator, ClipboardCheck, Shield } from 'lucide-react';
import logo from './image/Logo.png';
import test from './image/homme.png';
import testt from './image/homme (1).png';
import testtt from './image/personne (1).png';
import home from './image/pagehome.png';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const timeline: TimelineItem[] = [
    {
      date: 'T2 2024',
      title: 'Lancement de la plateforme',
      description: 'Première version avec fonctionnalités de base'
    },
    {
      date: 'T3 2024',
      title: 'Analyses avancées',
      description: 'Introduction d\'outils de rapports et d\'insights détaillés'
    },
    {
      date: 'T4 2024',
      title: 'Applications mobiles',
      description: 'Applications natives pour les plateformes iOS et Android'
    },
    {
      date: 'T1 2025',
      title: 'Fonctionnalités d\'entreprise',
      description: 'Outils avancés de sécurité et de collaboration'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:4000/api/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setErrorMessage('Cet email est déjà inscrit');
          setSubmitStatus('error');
        } else {
          setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
          setSubmitStatus('error');
        }
        return;
      }

      setSubmitStatus('success');
      setEmail(''); // Vider le champ email après succès
    } catch (error) {
      console.error('API call failed', error);
      setErrorMessage('Une erreur de connexion est survenue. Veuillez réessayer.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Calendar className="w-5 h-5" />,
      text: 'Page auto-entreprise complète (gestion des ventes, stocks et produits)'
    },
    {
      icon: <Calculator className="w-5 h-5" />,
      text: 'Comptabilité simplifiée'
    },
    {
      icon: <ClipboardCheck className="w-5 h-5" />,
      text: 'Agenda et to-do liste pour un suivi personnel'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: 'Sécurité de niveau entreprise'
    },
  ];

  const StartButton = () => (
    <button
      className="w-full py-3 px-8 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group"
      onClick={scrollToTop}
    >
      Commencer
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Section Newsletter */}
      <section className="py-24 px-4 flex flex-col items-center text-center">
        <div className="w-full max-w-md p-8 rounded-lg backdrop-blur-sm mb-40">
          <div className="flex flex-col items-center text-center mb-14 mt-44">
            <img src={logo} alt="Logo" className="h-48 w-48" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Minima</h2>

          {submitStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1 mt-12 mr-96">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-2 px-4 py-2 bg-transparent border border-white/20 rounded-lg text-white focus:border-white focus:outline-none"
                required
                disabled={isSubmitting}
                placeholder="Votre email"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 border border-white text-white transition-colors rounded-lg mt-6 
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Chargement...' : 'S\'inscrire'}
            </button>
          </form>

          {submitStatus === 'success' && (
            <div className="flex items-center justify-center gap-2 mt-4 text-green-400">
              <MailCheck className="w-4 h-4" />
              <span>Inscription réussie !</span>
            </div>
          )}
        </div>
      </section>

      {/* Carte de Tarification */}
      <section className="py-24 px-4 bg-black/50">
        <div className="container mx-auto max-w-md">
          <div className="border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all duration-300">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">Plan Unique</h3>
              <div className="text-9xl mt-20 font-bold mb-6">
                1.95€<span className="text-xl text-gray-400">/mois</span>
              </div>

              <ul className="text-left space-y-4 mb-8 mt-20">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    {feature.icon}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <StartButton />
            </div>
          </div>
        </div>
      </section>

      {/* Section Transformation */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-white">
          <h3 className="text-6xl font-semi-bold mb-24 text-center">Transformez le chaos...</h3>
          <div className="flex justify-center space-x-64">
            {[
              {
                img: test,
                title: "Désordonné",
                description: "Aucun cadre, aucune structure... Vous avez du mal à vous organiser ?"
              },
              {
                img: testt,
                title: "Débordé",
                description: "Deadlines, tâches, notes, listes en tout genre… Vous n'arrivez plus à tout retenir ?"
              },
              {
                img: testtt,
                title: "Éparpillé",
                description: "Posts-it, carnets, applications, logiciels... Vous auriez besoin de tout regrouper ?"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <img src={item.img} alt={item.title} className="w-40 h-40 mx-auto mb-2" />
                <h4 className="text-3xl font-semi-bold text-white">{item.title}</h4>
                <p className="text-gray-300 w-96">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Clarté */}
      <section className="py-24 px-4 overflow-hidden mt-36">
        <div className="container mx-auto max-w-7xl flex items-center">
          <div className="w-1/3 text-white pr-8">
            <h3 className="text-4xl font-bold mb-6">... en clarté.</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Organisez tout, au même endroit. Plus besoin de jongler entre les différentes applications.
            </p>
            <StartButton />
          </div>
          <div className="w-2/3 flex justify-right">
            <img
              src={home}
              alt="Illustration"
              className="h-[1100px] w-auto max-w-none rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Section Finale */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-white text-center flex flex-col items-center">
          <h3 className="text-4xl font-bold mt-12">
            16 sections. 1 seule application.
          </h3>
          <p className="text-gray-300 my-6 text-lg">
            Synchronisées et accessibles sur tous vos appareils.
          </p>
          <div className="w-96">
            <StartButton />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;