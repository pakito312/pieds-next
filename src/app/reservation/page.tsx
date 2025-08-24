'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import SEO from "@/components/SEO";

const reservationSchema = z.object({
  name: z.string().min(2, {
    message: 'Le nom doit contenir au moins 2 caractères'
  }),
  email: z.string().email({
    message: 'Veuillez entrer une adresse email valide'
  }),
  phone: z.string().min(8, {
    message: 'Veuillez entrer un numéro de téléphone valide'
  }),
  guests: z.number().min(1, {
    message: 'Le nombre de personnes doit être au moins 1'
  }).max(20, {
    message: 'Pour les réservations de plus de 20 personnes, veuillez nous contacter directement'
  }),
  date: z.date({
    required_error: 'Veuillez sélectionner une date'
  }),
  time: z.string().min(1, {
    message: 'Veuillez sélectionner une heure'
  }),
  specialRequests: z.string().optional()
});

type ReservationFormData = z.infer<typeof reservationSchema>;

const ReservationPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: {
      errors
    }
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 2,
      specialRequests: ''
    }
  });
  const selectedDate = watch('date');
  const timeSlots = ['12:00', '12:30', '13:00', '13:30', '14:00', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Reservation data:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    toast.success('Réservation confirmée !', {
      description: `Nous vous attendons le ${format(data.date, 'dd MMMM yyyy', {
        locale: fr
      })} à ${data.time}.`
    });
  };
  const disabledDays = [{
    before: new Date(new Date().setDate(new Date().getDate() + 1))
  }];
  return <>
      <SEO title="Réservation - Pieds dans l'eau Soa" description="Réservez votre table au restaurant Pieds dans l'eau à Soa. Profitez d'une expérience culinaire camerounaise authentique dans un cadre idyllique." canonical="/reservation" />
      
      <div className="pt-16 min-h-screen bg-restaurant-cream">
        {/* Hero Section */}
        <section className="py-20 bg-restaurant-dark text-white text-center">
          <div className="container-custom">
            <span className="inline-block bg-restaurant-gold/20 text-restaurant-gold text-sm font-medium py-1 px-4 rounded-full mb-4">
              Réservation
            </span>
            <h1 className="text-5xl font-bold mb-6">Réservez votre table</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Planifiez votre expérience culinaire chez Pieds Dans l'eau en quelques étapes simples.
              Notre équipe se réjouit de vous accueillir.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                {isSuccess ? <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <div className="w-20 h-20 bg-restaurant-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-restaurant-dark mb-4">
                      Réservation confirmée !
                    </h2>
                    <p className="text-gray-700 mb-6">
                      Votre réservation a été enregistrée avec succès. Vous recevrez bientôt un email 
                      de confirmation avec tous les détails.
                    </p>
                    <button onClick={() => setIsSuccess(false)} className="button-primary">
                      Nouvelle réservation
                    </button>
                  </motion.div> : <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-restaurant-dark mb-6">
                      Formulaire de réservation
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet
                        </label>
                        <input id="name" type="text" {...register('name')} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-restaurant-orange/20'}`} placeholder="Votre nom" />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input id="email" type="email" {...register('email')} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-restaurant-orange/20'}`} placeholder="votre@email.com" />
                          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Téléphone
                          </label>
                          <input id="phone" type="tel" {...register('phone')} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-restaurant-orange/20'}`} placeholder="+237 612345678" />
                          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre de personnes
                        </label>
                        <input id="guests" type="number" min="1" max="20" {...register('guests', {
                      valueAsNumber: true
                    })} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.guests ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-restaurant-orange/20'}`} />
                        {errors.guests && <p className="mt-1 text-sm text-red-500">{errors.guests.message}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <button type="button" className={cn("w-full flex items-center justify-between px-4 py-2 border rounded-md text-left", !selectedDate && "text-gray-500", errors.date ? 'border-red-300' : 'border-gray-300')}>
                                {selectedDate ? format(selectedDate, "dd MMMM yyyy", {
                              locale: fr
                            }) : <span>Sélectionner une date</span>}
                                <Calendar className="ml-2 h-4 w-4 opacity-50" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <DayPicker mode="single" selected={selectedDate} onSelect={date => setValue('date', date as Date)} disabled={disabledDays} locale={fr} className={cn("p-3 pointer-events-auto")} classNames={{
                            day_selected: "bg-restaurant-orange text-white",
                            day_today: "bg-restaurant-cream text-restaurant-dark"
                          }} />
                            </PopoverContent>
                          </Popover>
                          {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message as string}</p>}
                        </div>

                        <div>
                          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                            Heure
                          </label>
                          <select id="time" {...register('time')} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.time ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-restaurant-orange/20'}`} defaultValue="">
                            <option value="" disabled>Sélectionner une heure</option>
                            {timeSlots.map(time => <option key={time} value={time}>
                                {time}
                              </option>)}
                          </select>
                          {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                          Demandes spéciales (optionnel)
                        </label>
                        <textarea id="specialRequests" {...register('specialRequests')} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-restaurant-orange/20" placeholder="Allergies, occasion spéciale, préférences..."></textarea>
                      </div>

                      <button type="submit" disabled={isSubmitting} className={`button-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                        {isSubmitting ? 'Traitement en cours...' : 'Confirmer la réservation'}
                      </button>
                    </form>
                  </motion.div>}
              </div>

              <div className="space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-restaurant-dark mb-4">
                    Informations pratiques
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-1">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <path d="M2 10h20"></path>
                      </svg>
                      <div>
                        <h4 className="font-medium text-restaurant-dark">Horaires d'ouverture</h4>
                        <p className="text-gray-600 text-sm mt-1">Lundi - Vendredi: 12h - 23h</p>
                        <p className="text-gray-600 text-sm">Samedi: 12h - 00h</p>
                        <p className="text-gray-600 text-sm">Dimanche: 12h - 22h</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-1">
                        <path d="M15 21v-3a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
                        <path d="M11 16V8L7 9V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1l-4 1v9"></path>
                        <path d="M7 9v7"></path>
                      </svg>
                      <div>
                        <h4 className="font-medium text-restaurant-dark">Code vestimentaire</h4>
                        <p className="text-gray-600 text-sm mt-1">
                          Élégant décontracté. Nous vous prions d'éviter les tenues de plage 
                          et les shorts trop courts pour le dîner.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-1">
                        <path d="M17 17h.01"></path>
                        <path d="M12 17h.01"></path>
                        <path d="M7 17h.01"></path>
                        <path d="M7 12h.01"></path>
                        <path d="M12 12h.01"></path>
                        <path d="M17 12h.01"></path>
                        <path d="M7 7h.01"></path>
                        <path d="M12 7h.01"></path>
                        <path d="M17 7h.01"></path>
                        <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                      </svg>
                      <div>
                        <h4 className="font-medium text-restaurant-dark">Réservation de groupe</h4>
                        <p className="text-gray-600 text-sm mt-1">
                          Pour les réservations de plus de 8 personnes, veuillez nous contacter 
                          directement par téléphone pour discuter des options de menu.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-1">
                        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
                        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
                        <path d="M7 21h10"></path>
                        <path d="M12 3v18"></path>
                        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
                      </svg>
                      <div>
                        <h4 className="font-medium text-restaurant-dark">Occasions spéciales</h4>
                        <p className="text-gray-600 text-sm mt-1">
                          Nous serons ravis de vous aider à célébrer vos occasions spéciales. 
                          Veuillez nous en informer lors de votre réservation.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-restaurant-dark mb-4">
                    Contact direct
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Pour toute question ou demande spéciale, n'hésitez pas à nous contacter directement :
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-restaurant-dark">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <a href="tel:+237654321987" className="hover:text-restaurant-orange transition-colors">
                        +237 677 357 155
                      </a>
                    </li>
                    <li className="flex items-center gap-3 text-restaurant-dark">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                      <a href="mailto:reservations@pieds-dansleau.com" className="hover:text-restaurant-orange transition-colors">
                        reservations@pieds-dansleau.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>;
};



export default ReservationPage;