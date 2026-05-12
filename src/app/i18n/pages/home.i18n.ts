import type { SupportedLocale } from '../locales';

export const homeTranslations: Record<SupportedLocale, Record<string, string>> = {
  nl: {
    // Hero
    'home.hero.titleLine1': 'Jouw transformatie',
    'home.hero.titleLine2': 'begint hier.',
    'home.hero.titleLine3': 'Train op jouw tempo, met resultaten die blijven',
    'home.hero.subtitle':
      'Persoonlijke training in Amsterdam, volledig afgestemd op jou. Wij helpen je sterker, fitter en zelfverzekerder te worden in een veilige en prettige omgeving.',

    // Why us
    'home.whyUs.imageAlt': 'Personal training sessie',
    'home.whyUs.titleLine1': 'Waarom jij hier',
    'home.whyUs.titleLine2': 'resultaat behaalt',
    'home.whyUs.p1': 'Jouw resultaat begint met een plan dat volledig op jou is afgestemd.',
    'home.whyUs.p2':
      'Bij Roure Personal Training stemmen we elke training af op jouw doelen, niveau en tempo. Zo boek je vooruitgang die haalbaar én meetbaar is.',
    'home.whyUs.p3':
      'Je traint in een motiverende en persoonlijke omgeving, waarin we je helpen sterker te worden, meer zelfvertrouwen op te bouwen en het beste uit jezelf te halen.',
    'home.whyUs.p4': 'Stap voor stap merk je vooruitgang in:',
    'home.whyUs.bullets.strength': 'Kracht',
    'home.whyUs.bullets.energy': 'Energie',
    'home.whyUs.bullets.wellbeing': 'Algehele fitheid',

    // Plans
    'home.plans.title': 'Trainingsplannen',
    'home.plans.subtitle': '\u00A0',
    'home.plans.cta': 'Start nu',
    'home.plans.duo.name': 'Duo / Buddy',
    'home.plans.duo.priceAria': '60 euro per persoon',
    'home.plans.duo.priceEach': 'p.p.',
    'home.plans.duo.description':
      'Train samen en motiveer elkaar. Ideaal voor vrienden, partners of iedereen die sterker wordt met een beetje extra motivatie.',
    'home.plans.discountFootnote': 'Tot 10% korting mogelijk bij een traject',
    'home.plans.solo.name': 'Solo Standaard',
    'home.plans.solo.priceAria': '85 euro',
    'home.plans.solo.description':
      'Ideaal als je 1-op-1 begeleiding wilt, volledig afgestemd op jouw doelen, niveau en tempo.',
    'home.plans.long.name': 'Lange termijn',
    'home.plans.long.priceAria': 'Prijs op maat',
    'home.plans.long.customPricing': 'Prijs op maat',
    'home.plans.long.description':
      'Voor wie echt wil doorpakken en bouwen aan blijvende resultaten.',
    'home.plans.long.footnote': 'Gericht op duurzame progressie en lange termijn resultaat',

    // Testimonials
    'home.testimonials.title': 'Recensies',
    'home.testimonials.subtitle': 'Wat klanten zeggen',
    'home.testimonials.readMore': 'Lees meer',
    'home.testimonials.readLess': 'Lees minder',
    'home.testimonials.videoTitlePrefix': 'Klanttestimonialvideo',
    'home.testimonials.prevAria': 'Vorige testimonial',
    'home.testimonials.nextAria': 'Volgende testimonial',
    'home.testimonials.goToAriaPrefix': 'Ga naar testimonial',
    'home.testimonials.pauseAutoplay': 'Automatisch wisselen pauzeren',
    'home.testimonials.resumeAutoplay': 'Automatisch wisselen hervatten',
    'home.testimonials.pauseAutoplayAria': 'Automatisch wisselen tussen recensies pauzeren',
    'home.testimonials.resumeAutoplayAria': 'Automatisch wisselen tussen recensies hervatten',
    'home.testimonials.videoOverlayPauseAria':
      'tik om automatisch doorschuiven te stoppen, daarna kunt u de video bedienen',
    'home.testimonials.paginationAria': 'Navigatie tussen recensies',
    'home.testimonials.items.caro.text':
      'Ik heb me nog nooit eerder zo sterk en zelfverzekerd gevoeld! Carlos heeft me tot het uiterste gedreven en mij de begeleiding en ondersteuning gegeven die ik nodig had om succes te hebben.',
    'home.testimonials.items.goncagul.text':
      'Hier trainen heeft me geholpen om mijn kracht, zelfverzekerdheid en balans terug te krijgen na een moeilijke periode in mijn leven. Wat begonnen was als doel om af te vallen groeide door naar een reis naar geluk en gezondheid.',
    'home.testimonials.items.marcel.text':
      'Ik train hier nu al een paar jaar, en mijn trainingsprogramma\'s zijn altijd op maat voor mij gemaakt. Ik voel echt dat ik groei en verbeter - niet alleen lichamelijk, maar ook mentaal. Het is geweldig dat de coaching verder kijkt naar alleen het lichaam.',
    'home.testimonials.items.jeroen.text':
      'Ik begon hier te trainen met een heel specifiek doel: spiermassa opbouwen en vet te verliezen. Door een grondige analyse en een stapsgewijs trainingsprogramma heb ik met regelmaat naar mijn doel kunnen werken. Het is hard werk, maar de resultaten spreken voor zich.',

    // FAQ
    'home.faq.title': 'Veelgestelde vragen',
    'home.faq.subtitle': '\u00A0',
    'home.faq.items.0.question': 'Hoe vaak moet ik trainen?',
    'home.faq.items.0.answer':
      'Dit hangt af van jouw doelen en huidig niveau. We zullen een gepersonaliseerd programma opstellen dat met jouw beschikbaarheid past.',
    'home.faq.items.1.question': 'Heb ik een sportschool abonnement nodig?',
    'home.faq.items.1.answer':
      'Niet per se. Wij bieden zowel trainingen in de gym als thuis trainingen aan, afhankelijk van jouw voorkeuren.',
    'home.faq.items.2.question': 'Wat zal ik meebrengen naar mijn eerste training?',
    'home.faq.items.2.answer':
      'Breng comfortabele kleding, water, en een positieve houding. Wij zorgen voor alle andere dingen die je nodig zult hebben.',
    'home.faq.items.3.question': 'Kan ik mijn plan annuleren/van plan veranderen?',
    'home.faq.items.3.answer':
      'Ja, je kunt je plan op elk moment veranderen of annuleren. Wij zijn flexibel en willen met je meewerken.',

    // Promotion / intake form
    'home.promotion.success.title': 'Hartelijk dank voor je aanvraag!',
    'home.promotion.success.p1':
      'We waarderen je interesse in Roure Personal Training. Je formulier is succesvol verzonden.',
    'home.promotion.success.p2':
      'Een van onze teamleden neemt zo snel mogelijk contact met je op om een afspraak in te plannen. We streven ernaar je binnen één werkdag telefonisch terug te bellen.',
    'home.promotion.success.p3a':
      'Heb je vragen of wil je in de tussentijd meer informatie? Neem gerust contact op via',
    'home.promotion.success.p3b': 'of',
    'home.promotion.success.p4':
      'Je ontvangt binnenkort ook een e-mail met informatie over onze app. Het gebruik van de app is optioneel, maar kan extra voordelen en gemak bieden tijdens je trainingsreis.',
    'home.promotion.success.p5': 'We kijken ernaar uit om met je samen te werken!',
    'home.promotion.success.signature': 'Met vriendelijke groet,',
    'home.promotion.success.exploreCta': 'Ontdek de website',

    'home.promotion.title': 'Plan je gratis intake',
    'home.promotion.subtitle': 'Samen starten we met een plan dat bij je past.',

    'home.promotion.honeypot.website': 'Website',

    'home.promotion.planQuestion': 'In welk trainingsplan ben je geïnteresseerd?',
    'home.promotion.programQuestion': 'In welk trainingsprogramma ben je geïnteresseerd?',
    'home.promotion.learnMore': 'Meer informatie',

    'home.promotion.select.plan': 'Kies een plan',
    'home.promotion.select.program': 'Kies een plan',

    'home.promotion.plan.duo': 'Duo training',
    'home.promotion.plan.solo': '1-op-1 training',
    'home.promotion.plan.long': 'Lange termijn coaching',
    'home.promotion.plan.notSure': 'Weet ik nog niet',

    'home.promotion.program.weightLoss': 'Gewichtsverlies & spiermassa',
    'home.promotion.program.peak': 'Prestaties verbeteren',
    'home.promotion.program.vitality': 'Vitaliteit & gezondheid',
    'home.promotion.program.prenatal': 'Zwangerschap & postpartum',
    'home.promotion.program.notSure': 'Nog niet zeker',

    'home.promotion.goals.title': 'Wat wil je bereiken met je training?',
    'home.promotion.goals.hint': '(Voel je vrij om meerdere opties te selecteren)',
    'home.promotion.goals.improveHealth': 'Mijn algehele gezondheid verbeteren',
    'home.promotion.goals.increaseFlexibility': 'Flexibeler worden',
    'home.promotion.goals.improvePosture': 'Mijn houding verbeteren',
    'home.promotion.goals.getStronger': 'Sterker worden',
    'home.promotion.goals.feelConfident': 'Meer zelfvertrouwen krijgen / beter in mijn vel zitten',
    'home.promotion.goals.toneShape': 'Mijn lichaam strakker en sterker maken',
    'home.promotion.goals.loseWeight': 'Afvallen',
    'home.promotion.goals.other': 'Anders',
    'home.promotion.goals.otherPlaceholder': 'Specificeer a.u.b....',

    'home.promotion.personalInfo.title': 'Persoonlijke gegevens',
    'home.promotion.personalInfo.firstName': 'Voornaam',
    'home.promotion.personalInfo.lastName': 'Achternaam',
    'home.promotion.personalInfo.phone': 'Telefoonnummer',
    'home.promotion.personalInfo.email': 'E-mailadres',
    'home.promotion.personalInfo.firstNamePlaceholder': 'Vul je voornaam in',
    'home.promotion.personalInfo.lastNamePlaceholder': 'Vul je achternaam in',
    'home.promotion.personalInfo.phonePlaceholder': 'Vul je telefoonnummer in',
    'home.promotion.personalInfo.emailPlaceholder': 'Vul je e-mailadres in',

    'home.promotion.questions.title': 'Heb je nog vragen of iets dat we moeten weten?',
    'home.promotion.questions.placeholder': 'Stel hier je vraag…',

    'home.promotion.privacy.title': 'Privacyverklaring',
    'home.promotion.privacy.text':
      'Roure Personal Training respecteert jouw privacy. We gebruiken je gegevens alleen om contact met je op te nemen over je intake.',
    'home.promotion.privacy.consent':
      'Ik ga akkoord met het ontvangen van communicatie van Roure Personal Training.',

    'home.promotion.submit': 'Verzenden',
    'home.promotion.submitting': 'Verzenden...',

    'home.promotion.errors.required': 'Dit veld is verplicht',
    'home.promotion.errors.email': 'Vul een geldig e-mailadres in',
    'home.promotion.errors.submissionFailed': 'Verzenden mislukt. Probeer het opnieuw.',
    'home.promotion.errors.submissionUnavailable':
      'We konden je aanvraag nu niet verzenden. Probeer het later opnieuw.'
  },
  en: {
    // Hero
    'home.hero.titleLine1': 'Personal training',
    'home.hero.titleLine2': 'in Amsterdam Oost',
    'home.hero.titleLine3': 'with real results',
    'home.hero.subtitle':
      'Get stronger, fitter, and more energized with a plan built for you.',

    // Why us
    'home.whyUs.imageAlt': 'Personal training session',
    'home.whyUs.titleLine1': "Why you'll",
    'home.whyUs.titleLine2': 'succeed here',
    'home.whyUs.p1': "Your success starts with a plan that's built around you.",
    'home.whyUs.p2':
      'At Roure Personal Training, every session is tailored to your goals, your level, and your pace, ensuring progress is achievable and measurable.',
    'home.whyUs.p3':
      "You'll work in a motivating, supportive environment designed to empower you, boost your confidence, and help you reach your full potential.",
    'home.whyUs.p4': "Step by step, you'll see real improvements in:",
    'home.whyUs.bullets.strength': 'Strength',
    'home.whyUs.bullets.energy': 'Energy',
    'home.whyUs.bullets.wellbeing': 'Overall well-being',

    // Plans
    'home.plans.title': 'Training plans',
    'home.plans.subtitle': 'No cancellation fees — pause or stop anytime',
    'home.plans.cta': 'Book free intake',
    'home.plans.duo.name': 'Duo',
    'home.plans.duo.priceAria': '60 euros each',
    'home.plans.duo.priceEach': 'per person',
    'home.plans.duo.description':
      'Train together and stay motivated — with personal guidance.',
    'home.plans.discountFootnote': 'Discounts may apply. Ask for details.',
    'home.plans.solo.name': 'Solo',
    'home.plans.solo.priceAria': '85 euros',
    'home.plans.solo.description': '1:1 coaching tailored to your goals.',
    'home.plans.long.name': 'Long-term',
    'home.plans.long.priceAria': 'Custom pricing',
    'home.plans.long.customPricing': 'Custom pricing',
    'home.plans.long.description': 'Consistency pays off: sustainable results with a longer program.',
    'home.plans.long.footnote': 'Depends on frequency and goal.',

    // Testimonials
    'home.testimonials.title': 'Testimonials',
    'home.testimonials.subtitle': 'What clients say',
    'home.testimonials.readMore': 'Read more',
    'home.testimonials.readLess': 'Read less',
    'home.testimonials.videoTitlePrefix': 'Client Testimonial Video',
    'home.testimonials.prevAria': 'Previous testimonial',
    'home.testimonials.nextAria': 'Next testimonial',
    'home.testimonials.goToAriaPrefix': 'Go to testimonial',
    'home.testimonials.pauseAutoplay': 'Pause auto-rotate',
    'home.testimonials.resumeAutoplay': 'Resume auto-rotate',
    'home.testimonials.pauseAutoplayAria': 'Pause automatic testimonial slideshow',
    'home.testimonials.resumeAutoplayAria': 'Resume automatic testimonial slideshow',
    'home.testimonials.videoOverlayPauseAria':
      'Activate to pause auto-rotate — you can then use the video controls',
    'home.testimonials.paginationAria': 'Testimonial navigation',
    'home.testimonials.items.caro.text':
      "I've never felt stronger and confident! Carlos pushed me to my limits while providing the support and the guidance I needed to succeed. Highly recommended!",
    'home.testimonials.items.goncagul.text':
      'Training here helped me regain strength, confidence, and balance after a difficult period in my life. What started as a goal to lose weight became a long-term journey toward feeling healthier and happier.',
    'home.testimonials.items.marcel.text':
      "I've been training here for a few years now, and my programs are always tailored to me. I truly feel I'm growing—not only physically, but mentally as well. It's great that the coaching looks beyond just the body.",
    'home.testimonials.items.jeroen.text':
      "I started training here with a very specific goal: gaining muscle and reducing body fat. Through a clear assessment and a step-by-step training plan, I've been able to work consistently toward my goals. It's hard work, but the results speak for themselves.",

    // FAQ
    'home.faq.title': 'Frequently asked questions',
    'home.faq.subtitle': 'Quick answers to common questions.',
    'home.faq.items.0.question': 'How often should I train?',
    'home.faq.items.0.answer':
      "The frequency depends on your goals and current fitness level. We'll create a personalized plan that works for your schedule.",
    'home.faq.items.1.question': 'Do I need a gym membership?',
    'home.faq.items.1.answer': 'Not necessarily. We offer both gym-based and home training options to suit your preferences.',
    'home.faq.items.2.question': 'What should I bring to my first session?',
    'home.faq.items.2.answer':
      "Just bring comfortable workout clothes, water, and a positive attitude. We'll provide everything else you need.",
    'home.faq.items.3.question': 'Can I cancel or change my plan?',
    'home.faq.items.3.answer': "Yes, you can modify or cancel your plan at any time. We're flexible and want to work with your needs.",

    // Promotion / intake form
    'home.promotion.success.title': 'Thank you very much for your request!',
    'home.promotion.success.p1':
      'We greatly appreciate your interest in Roure Personal Training. Your form has been successfully submitted.',
    'home.promotion.success.p2':
      'One of our team members will contact you as soon as possible to schedule an appointment. We aim to get back to you by phone within one business day.',
    'home.promotion.success.p3a':
      'If you have any questions or would like more information in the meantime, please feel free to contact us at',
    'home.promotion.success.p3b': 'or',
    'home.promotion.success.p4':
      "You'll also soon receive an email with information about our app. Using the app is optional, but it can offer additional benefits and convenience during your training journey.",
    'home.promotion.success.p5': 'We look forward to working with you!',
    'home.promotion.success.signature': 'Yours sincerely,',
    'home.promotion.success.exploreCta': 'Explore the website',

    'home.promotion.title': 'Book your free intake session with us',
    'home.promotion.subtitle': "Let's start your fitness journey together",

    'home.promotion.honeypot.website': 'Website',

    'home.promotion.planQuestion': 'Which training plan are you interested in?',
    'home.promotion.programQuestion': 'Which program are you interested in?',
    'home.promotion.learnMore': 'Learn more',

    'home.promotion.select.plan': 'Select a plan',
    'home.promotion.select.program': 'Select a program',

    'home.promotion.plan.duo': 'Duo / Buddy',
    'home.promotion.plan.solo': 'Solo Standard',
    'home.promotion.plan.long': 'Long-term',
    'home.promotion.plan.notSure': 'Not sure yet',

    'home.promotion.program.weightLoss': 'Weight loss & muscle mass',
    'home.promotion.program.peak': 'Peak performance',
    'home.promotion.program.vitality': 'Vitality & longevity',
    'home.promotion.program.prenatal': 'Prenatal & postpartum',
    'home.promotion.program.notSure': 'Not sure yet',

    'home.promotion.goals.title': 'What would you like to achieve with your training?',
    'home.promotion.goals.hint': '(Feel free to select more than one!)',
    'home.promotion.goals.improveHealth': 'Improve my overall health',
    'home.promotion.goals.increaseFlexibility': 'Increase flexibility',
    'home.promotion.goals.improvePosture': 'Improve posture',
    'home.promotion.goals.getStronger': 'Get stronger',
    'home.promotion.goals.feelConfident': 'Feel more confident / improve my appearance',
    'home.promotion.goals.toneShape': 'Tone and shape my body',
    'home.promotion.goals.loseWeight': 'Lose weight',
    'home.promotion.goals.other': 'Other',
    'home.promotion.goals.otherPlaceholder': 'Please specify...',

    'home.promotion.personalInfo.title': 'Personal Information',
    'home.promotion.personalInfo.firstName': 'First name',
    'home.promotion.personalInfo.lastName': 'Last name',
    'home.promotion.personalInfo.phone': 'Phone number',
    'home.promotion.personalInfo.email': 'E-mail',
    'home.promotion.personalInfo.firstNamePlaceholder': 'Enter your first name',
    'home.promotion.personalInfo.lastNamePlaceholder': 'Enter your last name',
    'home.promotion.personalInfo.phonePlaceholder': 'Enter your phone number',
    'home.promotion.personalInfo.emailPlaceholder': 'Enter your email address',

    'home.promotion.questions.title': "Do you have any questions or anything you'd like us to know?",
    'home.promotion.questions.placeholder': 'Ask any questions...',

    'home.promotion.privacy.title': 'Privacy notice',
    'home.promotion.privacy.text':
      'Roure Personal Training respects your privacy. We will only use your information to contact you regarding your session.',
    'home.promotion.privacy.consent': 'I agree to receive other communications from Roure Personal Training.',

    'home.promotion.submit': 'Submit',
    'home.promotion.submitting': 'Submitting...',

    'home.promotion.errors.required': 'This field is required',
    'home.promotion.errors.email': 'Please enter a valid email address',
    'home.promotion.errors.submissionFailed': 'Submission failed. Please try again.',
    'home.promotion.errors.submissionUnavailable': 'We could not submit your request right now. Please try again later.'
  }
};
