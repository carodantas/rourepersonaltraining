import type { SupportedLocale } from '../locales';

export const blogTranslations: Record<SupportedLocale, Record<string, string>> = {
  nl: {
    // Categories / filters
    'blog.filters.aria': 'Artikelen filteren op categorie',
    'blog.categories.all': 'Alle artikelen',
    'blog.categories.clientTalks': 'Klantverhalen',
    'blog.categories.event': 'Evenement',
    'blog.categories.exercises': 'Oefeningen',
    'blog.categories.personalTraining': 'Personal training',
    'blog.categories.recipes': 'Recepten',
    'blog.categories.tipsTricks': 'Tips & tricks',
    'blog.categories.uncategorized': 'Overig',

    // Spotlight
    'blog.spotlight.readAriaPrefix': 'Lees artikel:',

    // Articles grid
    'blog.articles.aria': 'Blogartikelen',
    'blog.comments.none': 'Geen reacties',
    'blog.comments.one': 'reactie',
    'blog.comments.many': 'reacties',

    // Post page
    'blog.post.backToBlog': '← Terug naar blog',

    // Post: why-personal-trainers-are-worth-it
    'blog.post.whyPersonalTrainersAreWorthIt.title': 'Waarom personal trainers het waard zijn',
    'blog.post.whyPersonalTrainersAreWorthIt.introduction':
      'In de snelle wereld van vandaag kan fit en gezond blijven uitdagend zijn. Veel mensen schakelen personal trainers in om hun fitnessdoelen te bereiken. Maar is het inhuren van een personal trainer echt de moeite waard? Laten we bekijken waarom personal trainers een waardevolle investering in je gezondheid kunnen zijn.',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.0.title': 'Persoonlijke trainingsschema’s',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.0.content':
      'Een van de belangrijkste voordelen van trainen met een personal trainer is een trainingsschema dat op jou is afgestemd. In tegenstelling tot algemene schema’s die je online vindt, past een trainer oefeningen aan op jouw specifieke behoeften en doelen. Of je nu wilt afvallen, spiermassa wilt opbouwen of je algehele fitheid wilt verbeteren — een persoonlijk plan maakt een groot verschil.',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.1.title': 'Juiste techniek en uitvoering',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.1.content':
      'Personal trainers zijn experts in oefentechniek en correcte uitvoering. Ze zorgen dat je oefeningen goed uitvoert om blessures te voorkomen en het maximale uit je training te halen. Een verkeerde uitvoering kan leiden tot serieuze blessures en langdurige klachten. Met begeleiding van een trainer kun je met vertrouwen veilig trainen.',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.2.title': 'Motivatie en accountability',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.2.content':
      'Gemotiveerd blijven is voor veel mensen één van de grootste uitdagingen. Personal trainers geven je de support en aanmoediging om vol te houden. Ze houden je accountable door realistische doelen te stellen en je progressie bij te houden. Weten dat iemand met je meekijkt, helpt enorm om je plan vol te houden.',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.3.title': 'Efficiënte workouts',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.3.content':
      'Tijd is kostbaar. Een personal trainer helpt je om het maximale uit je tijd te halen met trainingen die efficiënt én effectief zijn. Met een goed opgebouwd plan bereik je vaak meer in 30 minuten met een trainer dan in een uur alleen.',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.4.title': 'Voedingsadvies op maat',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.4.content':
      'Personal trainers geven vaak voedingsadvies dat past bij jouw doelen. Ze helpen je met een gebalanceerd voedingspatroon dat je trainingen ondersteunt en je resultaten versnelt. Goede voeding is een essentieel onderdeel van elke fitnessreis — deskundige begeleiding kan daarin een groot verschil maken.',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.5.title': 'Aanpasbaarheid en flexibiliteit',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.5.content':
      'Het leven is onvoorspelbaar en soms moet je routine mee veranderen. Personal trainers kunnen je schema aanpassen aan je agenda, fitheidsniveau of eventuele klachten. Zo blijf je progressie maken richting je doelen, wat er ook gebeurt.',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.6.title': 'Een investering die zich terugbetaalt',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.6.content':
      'Hoewel een personal trainer een uitgave kan lijken, is het vaak een investering die zich op de lange termijn terugbetaalt. Een persoonlijk plan, blessurepreventie en efficiënte trainingen besparen tijd én geld (bijvoorbeeld door minder kans op blessures en minder “ineffectieve” pogingen). Bovendien leveren de gezondheidsvoordelen op de lange termijn vaak een betere kwaliteit van leven op.',
    'blog.post.whyPersonalTrainersAreWorthIt.conclusion':
      'Kortom: personal trainers bieden veel voordelen die de investering waard maken. Van persoonlijke trainingsschema’s tot motivatie en accountability — je krijgt de support om je doelen efficiënt en veilig te bereiken. Als je zoekt naar “personal trainers near me” of Roure Personal Training overweegt, is dit hét moment om de stap te zetten en te investeren in je gezondheid.',
    'blog.post.whyPersonalTrainersAreWorthIt.callToAction':
      'Heb je eerder met een personal trainer gewerkt? Deel je ervaringen hieronder!'
    ,

    // Blog listing (titles/excerpts)
    'blog.articles.items.why-personal-trainers-are-worth-it.title': 'Waarom personal trainers het waard zijn',
    'blog.articles.items.why-personal-trainers-are-worth-it.excerpt':
      'In de snelle wereld van vandaag kan fit en gezond blijven uitdagend zijn. Veel mensen schakelen personal trainers in om hun doelen te bereiken.',

    'blog.articles.items.how-exercise-helps-to-relieve-stress.title': 'Hoe beweging helpt om stress te verminderen',
    'blog.articles.items.how-exercise-helps-to-relieve-stress.excerpt':
      'Naast genoeg slaap is regelmatig bewegen één van de meest gehoorde adviezen tijdens stressvolle periodes.',

    'blog.articles.items.static-stretching-vs-dynamic-stretching.title': 'Statische vs dynamische stretching: een introductie',
    'blog.articles.items.static-stretching-vs-dynamic-stretching.excerpt':
      'Stretchen is belangrijk, maar niet alle stretches zijn gelijk. We leggen het verschil uit tussen statisch en dynamisch stretchen.',

    'blog.articles.items.how-much-water-should-you-drink.title': 'Hoeveel water moet je drinken voor, tijdens en na training?',
    'blog.articles.items.how-much-water-should-you-drink.excerpt':
      'Hydratatie is cruciaal — zeker als je zweet. Maar te veel water tijdens een training kan ook oncomfortabel zijn.',

    'blog.articles.items.mindful-exercise-mindfulness-workouts.title': 'Mindful bewegen: meer mindfulness in je workouts',
    'blog.articles.items.mindful-exercise-mindfulness-workouts.excerpt':
      'Soms trainen we op autopilot. Maar als je bewuster beweegt, worden je workouts vaak effectiever én leuker.',

    'blog.articles.items.building-strength-comprehensive-guide.title': '22 fascinerende feiten over spieren',
    'blog.articles.items.building-strength-comprehensive-guide.excerpt':
      'Krachttraining is één van de beste manieren om je gezondheid en fitheid te verbeteren. Ontdek leuke feiten over je spieren.'

    ,
    // Post: how-exercise-helps-to-relieve-stress
    'blog.post.howExerciseHelpsToRelieveStress.title': 'Hoe beweging helpt om stress te verminderen',
    'blog.post.howExerciseHelpsToRelieveStress.introduction':
      'Naast voldoende slaap is regelmatig bewegen één van de meest gehoorde adviezen wanneer we door een stressvolle periode gaan. Het is inmiddels algemeen bekend dat dagelijkse fysieke activiteit een positief effect heeft op onze mentale gezondheid en dat het een grote rol speelt bij het verminderen van stress — zowel op korte termijn als op de lange termijn. Maar hoe werkt dat precies? Wat gebeurt er in ons lichaam wanneer we sporten, en hoe beïnvloedt dat een gestreste geest? In dit artikel leggen we wetenschappelijk uit hoe beweging helpt om stress te verminderen.',
    'blog.post.howExerciseHelpsToRelieveStress.sections.0.title': 'De connectie tussen lichaam en geest',
    'blog.post.howExerciseHelpsToRelieveStress.sections.0.content':
      'In onze huidige tijd worden lichaam en geest vaak gezien als twee afzonderlijke entiteiten. In werkelijkheid zijn ze op manieren met elkaar verbonden die we nauwelijks kunnen bevatten. Onze mentale toestand heeft een enorme invloed op onze fysieke gezondheid. Wanneer ons brein door stress wordt beïnvloed, wordt ons lichaam vroeg of laat ook beïnvloed. Er zijn talloze voorbeelden van die onlosmakelijke verbinding: je hartslag stijgt en je ademhaling versnelt wanneer je brein een bedreiging registreert. Verliefd zijn kan je eetlust verminderen. Nervositeit voor een belangrijk examen of presentatie kan je maag doen draaien. Deze verbindingen zijn geen eenrichtingsverkeer — ze werken ook de andere kant op. Dat betekent: wanneer je lichaam zich beter voelt, voelt je geest zich vaak ook beter.',
    'blog.post.howExerciseHelpsToRelieveStress.sections.1.title': 'Hoe helpt beweging om stress te verminderen?',
    'blog.post.howExerciseHelpsToRelieveStress.sections.1.content':
      'De voordelen van beweging voor mentale gezondheid zijn al eeuwen bekend. De Griekse filosoof Plato geloofde zelfs dat “beweging een schuldig geweten zou genezen”. Dat klinkt misschien tegenstrijdig, omdat sporten ook een vorm van fysieke stress is. Hoe kan fysieke stress helpen om mentale stress te verlagen? Om dat uit te leggen moeten we het hebben over neurotransmitters: organische moleculen die cruciaal zijn voor een goed functionerend brein. Beweging beïnvloedt onze neurochemie onder andere op de volgende manieren:',
    'blog.post.howExerciseHelpsToRelieveStress.sections.2.title': 'Het verlaagt stresshormonen',
    'blog.post.howExerciseHelpsToRelieveStress.sections.2.content':
      'Fysieke activiteit verlaagt de niveaus van stresshormonen zoals adrenaline en cortisol.',
    'blog.post.howExerciseHelpsToRelieveStress.sections.3.title': 'Het verhoogt de aanmaak van endorfines',
    'blog.post.howExerciseHelpsToRelieveStress.sections.3.content':
      'Endorfines zijn de “feel-good” neurotransmitters — de natuurlijke pijnstillers en mood boosters van je lichaam. Er bestaan meer dan twintig verschillende soorten endorfines; sommige hebben een effect dat zelfs sterker kan zijn dan morfine.',
    'blog.post.howExerciseHelpsToRelieveStress.sections.4.title': 'Het zorgt voor een dopamine-boost',
    'blog.post.howExerciseHelpsToRelieveStress.sections.4.content':
      'Endorfines werken samen met een andere cruciale neurotransmitter: dopamine. Deze “motivatie-molecule” is verantwoordelijk voor motivatie en beloning — het geeft je dat tevreden gevoel nadat je iets hebt bereikt. Dopamine speelt ook een grote rol in executieve functies, aandacht, focus en ons vermogen om plezier te ervaren.',
    'blog.post.howExerciseHelpsToRelieveStress.sections.5.title': 'Het ondersteunt een gezonde serotoninebalans',
    'blog.post.howExerciseHelpsToRelieveStress.sections.5.content':
      'Beweging leidt tot een verhoogde afgifte en aanmaak van serotonine. Deze neurotransmitter is betrokken bij veel lichamelijke processen zoals slaap, temperatuurregulatie, spiercontrole, eetlust, spijsvertering en libido. Serotonine helpt ook om je stemming en gevoel van welzijn te stabiliseren.',
    'blog.post.howExerciseHelpsToRelieveStress.sections.6.title': 'Meer dan alleen neurochemie',
    'blog.post.howExerciseHelpsToRelieveStress.sections.6.content':
      'Het bovenstaande is wetenschappelijk bewezen, dus je hoeft ons niet op ons woord te geloven. Maar de manieren waarop beweging stress vermindert gaan verder dan alleen neurotransmitters. Er spelen ook emotionele, gedragsmatige en sociale factoren mee. Denk bijvoorbeeld aan iemand met overgewicht die een consistent trainingsschema start met een personal trainer: zien en voelen dat je vet verliest en strakker wordt, verbetert vaak je zelfbeeld, zelfvertrouwen en trots. Of iemand die worstelt met onzekerheid, zich zwak voelt of weinig zelfdiscipline ervaart: die ziet vaak grote verbeteringen zodra hij of zij begint met krachttraining of vechtsport. We zien onszelf vooruitgaan — en vaak duurt het niet lang voordat anderen dat ook zien. De discipline, drive en energie die je uit regelmatige training haalt, veroorzaken vaak een “butterfly effect” en helpen je ook andere doelen in het leven te bereiken. Dat verlaagt niet alleen je stressniveau, maar maakt je ook weerbaarder. En omdat we stressvolle gebeurtenissen niet altijd kunnen voorkomen, is het slim om veerkracht op te bouwen om ermee om te gaan.'

    ,
    // Post: static-stretching-vs-dynamic-stretching
    'blog.post.staticStretchingVsDynamicStretching.title': 'Statische vs dynamische stretching: een introductie',
    'blog.post.staticStretchingVsDynamicStretching.introduction':
      'We weten allemaal dat stretchen belangrijk is. Maar niet alle stretches zijn gelijk. In dit artikel belichten we het verschil tussen statisch stretchen en dynamisch stretchen. Wat is het verschil? En is het beter om ze vóór of na je training te doen?',
    'blog.post.staticStretchingVsDynamicStretching.sections.0.title': 'Wat is statisch stretchen?',
    'blog.post.staticStretchingVsDynamicStretching.sections.0.content':
      'Statisch stretchen verwijst naar rekoefeningen waarbij je een spier (of spiergroep) op rek brengt en één positie een langere tijd vasthoudt (meestal tussen de 15 en 60 seconden, soms langer). Voorbeelden zijn: staande quadriceps stretch, statische triceps stretch en de butterfly stretch.',
    'blog.post.staticStretchingVsDynamicStretching.sections.1.title': 'Wat is dynamisch stretchen?',
    'blog.post.staticStretchingVsDynamicStretching.sections.1.content':
      'Dynamisch stretchen is functioneler en bestaat uit gecontroleerde (meestal herhaalde) bewegingen waarbij je actief je bewegingsuitslag vergroot, zonder een positie vast te houden of te pauzeren in het eindpunt. Voorbeelden zijn: leg swings, downward dog naar cobra, en een runner’s lunge met twist.',
    'blog.post.staticStretchingVsDynamicStretching.sections.2.title': 'Statisch vs dynamisch: wanneer gebruik je wat?',
    'blog.post.staticStretchingVsDynamicStretching.sections.2.content':
      'Statisch stretchen kreeg in de jaren 80 een slechte reputatie toen studies suggereerden dat statische stretches vóór een workout prestaties konden verminderen. Daar zit een kern van waarheid in: als je een gewricht voorbij je normale range brengt en dat lang vasthoudt, en daarna meteen traint zonder activatie/contra-stretch, kan dat tijdelijk je kracht en explosiviteit verlagen. Toch heeft statisch stretchen zeker een plek: als onderdeel van je cooling-down kan het helpen tegen stijfheid en spierpijn en het kan je flexibiliteit op de lange termijn verbeteren. Dynamische stretches passen meestal beter in de warming-up: ze lijken op de bewegingen die je straks gaat doen, verhogen de doorbloeding en spiertemperatuur en helpen blessures voorkomen. Veel onderzoek laat zien dat dynamisch stretchen vóór de training een positief effect kan hebben op power en performance.',
    'blog.post.staticStretchingVsDynamicStretching.sections.3.title': 'Tot slot',
    'blog.post.staticStretchingVsDynamicStretching.sections.3.content':
      'In theorie komt het neer op dynamisch stretchen tijdens de warming-up en statisch stretchen tijdens de cooling-down. In de praktijk is het niet zo zwart-wit — veel statische stretches kun je aanpassen zodat ze dynamisch worden en wel geschikt zijn voor de warming-up. Onthoud: iedereen is anders. Welke vorm je ook kiest, luister altijd naar je lichaam. Stretchen hoort geen pijn te doen. Als het wel pijn doet, vraag je personal trainer om advies.'

    ,
    // Post: how-much-water-should-you-drink
    'blog.post.howMuchWaterShouldYouDrink.title': 'Hoeveel water moet je drinken voor, tijdens en na training?',
    'blog.post.howMuchWaterShouldYouDrink.introduction':
      'We hoeven je waarschijnlijk niet te vertellen hoe belangrijk het is om elke dag genoeg water te drinken. Maar wanneer je flink zweet, wordt goede hydratatie nóg belangrijker. Tegelijkertijd is trainen met een buik vol klotsend water ook niet prettig. Dus: hoe weet je of je genoeg drinkt? En hoeveel water is verstandig vóór, tijdens en na je training?',
    'blog.post.howMuchWaterShouldYouDrink.sections.0.title': 'Wat zijn symptomen van uitdroging?',
    'blog.post.howMuchWaterShouldYouDrink.sections.0.content':
      'Wist je dat ongeveer 60% van het menselijk lichaam uit water bestaat? Als je de vloeistoffen die je verliest niet aanvult, ben je gevoeliger voor oververhitting. Je bloed wordt dikker. Je hart moet harder werken om bloed rond te pompen. Spiercontracties worden lastiger. Je bent minder goed in staat voedingsstoffen uit eten en supplementen op te nemen. Het vermogen van je lichaam om afvalstoffen te filteren en af te voeren neemt af. Je lichaam probeert de resterende vloeistof vast te houden, waardoor je je opgeblazen en ongemakkelijk kunt voelen. En: je krijgt dorst.',
    'blog.post.howMuchWaterShouldYouDrink.sections.1.title': 'Hoeveel water moet je drinken voor, tijdens en na training?',
    'blog.post.howMuchWaterShouldYouDrink.sections.1.content':
      'Veel mensen vergeten voldoende te drinken. Vaak is het pas wanneer we dorst krijgen dat we denken: “Ik moet eigenlijk water drinken.” Maar als je pas drinkt wanneer je dorst hebt, ben je eigenlijk al te laat. Idealiter drink je gedurende de dag genoeg zodat je dorst voorkomt. Tijdens het trainen wil je gehydrateerd blijven, maar ook voorkomen dat je zóveel drinkt dat het je training hindert.',
    'blog.post.howMuchWaterShouldYouDrink.sections.2.title': 'Voor je training',
    'blog.post.howMuchWaterShouldYouDrink.sections.2.content':
      'Wanneer hij leeg is, is de menselijke maag ongeveer zo groot als een vuist. Maar hij kan uitrekken om meer te bevatten dan je denkt. Tenzij je jarenlang je maag hebt opgerekt door te veel te eten, kan je maag ongeveer één tot twee liter vloeistof bevatten. Dat betekent niet dat je met zoveel water in je maag moet gaan trainen, maar gedehydrateerd starten is ook geen goed idee. De American Council on Exercise adviseert om in de twee uur vóór je workout ongeveer een halve liter water te drinken. In de laatste 30 minuten voor je begint kun je daar nog zo’n 200 ml aan toevoegen.',
    'blog.post.howMuchWaterShouldYouDrink.sections.3.title': 'Tijdens je training',
    'blog.post.howMuchWaterShouldYouDrink.sections.3.content':
      'Hoewel je uitdroging tijdens het trainen wilt voorkomen, zal te veel water tussendoor bijna zeker je prestaties negatief beïnvloeden. Niemand wil een les vechtsport doen, een paar kilometer hardlopen of zwaar tillen met één à twee liter water die in je buik klotst. Als je tijdens een langere training veel zweet, moet je wel zorgen dat je vocht (en elektrolyten) aanvult. Het beste is om tussendoor kleine slokjes te nemen; ongeveer 200 ml per 20 minuten.',
    'blog.post.howMuchWaterShouldYouDrink.sections.4.title': 'Na je training',
    'blog.post.howMuchWaterShouldYouDrink.sections.4.content':
      'Na je training is je lichaam het meest efficiënt in het opnemen van vocht. Hoeveel je moet drinken hangt af van hoeveel je hebt verloren tijdens de workout. Als je niet zeker weet of je genoeg drinkt, kun je jezelf eens wegen vóór en na het trainen. Een praktische vuistregel is om tot een halve liter water te drinken voor elke pond (ongeveer 0,45 kg) die je na de training kwijt bent.',
    'blog.post.howMuchWaterShouldYouDrink.sections.5.title': 'Tot slot',
    'blog.post.howMuchWaterShouldYouDrink.sections.5.content':
      'Als je moeite hebt om gehydrateerd te blijven (zoals zovelen), koop een fijne waterfles en maak er een gewoonte van om hem overal mee naartoe te nemen — inclusief de gym. Als je goed gehydrateerd bent, haal je meer uit je trainingen. En je zult je ook gewoon beter voelen!'

    ,
    // Post: mindful-exercise-mindfulness-workouts
    'blog.post.mindfulExerciseMindfulnessWorkouts.title': 'Mindful bewegen: meer mindfulness in je workouts',
    'blog.post.mindfulExerciseMindfulnessWorkouts.introduction':
      'Laten we één ding meteen duidelijk maken: er is helemaal niets mis met je AirPods indoen en naar muziek luisteren tijdens een run. Er is ook niets mis met “uitzetten” terwijl je jezelf kapot zweet op de crosstrainer. En eerlijk: gedachteloos op een bokszak slaan is geweldig om negatieve emoties los te laten. Maar als je altijd op autopilot traint, mis je iets. Constant afgeleid zijn tijdens workouts betekent dat je de connectie met je lichaam verliest. Daardoor worden je oefeningen minder effectief, wat uiteindelijk kan leiden tot een plateau, langzamere progressie of helemaal geen progressie. Daarom wil ik je uitdagen om je mindless workouts af te wisselen met mindful exercise.',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.0.title': 'De voordelen van mindful bewegen',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.0.content':
      'Mindful bewegen kan je prestaties verbeteren, je techniek en uitvoering aanscherpen en blessures helpen voorkomen. Aanwezig zijn tijdens je training betekent met intentie bewegen. Zo kun je beter “inchecken” bij je lichaam en beter begrijpen wat er gebeurt tijdens de oefeningen die je doet — niet alleen fysiek, maar ook mentaal. Dit kan de aanmaak van endorfines verhogen, de stofjes waardoor je je zo goed voelt tijdens en na het trainen. Regelmatig op een mindful manier zweten helpt je ook om je trainingsplan vol te houden en uiteindelijk je fitnessdoelen te bereiken.',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.1.title': 'Hoe breng je meer mindfulness in je workouts?',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.1.content':
      'Hieronder vind je vijf tips om meer mindfulness in je trainingen te brengen:',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.2.title': '#1. Begin elke workout met een intentie',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.2.content':
      'Mindful bewegen begint al vóór je workout. Neem een minuut om een intentie te zetten voor deze training. Dat kan iets zijn als “Ik blijf aanwezig en bewust tijdens deze workout”, “Ik vind plezier in elke oefening die ik vandaag doe” of “Ik ga vandaag de barbell slopen”. Het is makkelijk om je intentie te vergeten zodra je bezig bent, zeker als je gewend bent om “op de automatische piloot” te trainen. Train je thuis? Schrijf je intentie op en plak het op je mat. Ga je naar de gym? Schrijf een reminder op je pols.',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.3.title': '#2. Focus op je ademhaling',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.3.content':
      'Je zag deze misschien al aankomen, maar dit is één van de beste manieren om mindful te trainen. Doe je cardio, dan móét je op je ademhaling letten — anders hou je het niet vol, of je moet stoppen door steken of krampen. Hoe lang duurt het na je training voordat je ademhaling weer normaal is? Ook bij (body)weight of krachttraining is het waardevol om bewust te ademen. Hoe adem je nu? Door je neus in en door je mond uit? In en uit op de juiste momenten? Bij push-ups: adem je uit bovenaan of wanneer je zakt? En bij deadlifts?',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.4.title': '#3. Let meer op je lichaam tijdens je training',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.4.content':
      'Mindful trainen kan in het begin lastig zijn, vooral als je gewend bent om weg te “zonen” en de bewegingen af te werken. Maar mindful zijn is iets wat je kunt trainen, net als je spieren. Zodra je merkt dat je gedachten afdwalen naar gisteravond of je to-do lijst van morgen, breng je aandacht rustig terug naar de oefening.',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.5.title': '#4. Maak ruimte voor workouts zonder afleiding',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.5.content':
      'Zoals we eerder zeiden: het is helemaal oké om af te wisselen met workouts waarbij je gewoon “uit” staat. Maar maak ook bewust ruimte voor mindful workouts. Hoe je dat invult, bepaal je zelf. Misschien een rustige thuisworkout in stilte. Of een run zonder koptelefoon, waarbij je luistert naar je voetstappen, je ademhaling, vogels, wind en ritselende bladeren. Het is een totaal andere ervaring.',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.6.title': '#5. Check daarna bij jezelf in',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.6.content':
      'Veel mensen duiken na het sporten meteen terug hun dagelijkse routine in. Maar mindful trainen werkt het beste als je na afloop even bij jezelf incheckt. Dat hoeft niet lang te duren. Je kunt bijvoorbeeld reflecteren onder de douche, tijdens een cooling-down met stretches, of tijdens de wandeling naar huis. Ben je echt toegewijd? Koop een mooi notitieboek en schrijf een paar regels op over wat je deed, hoe je je nu voelt en waar je de volgende keer aan wilt werken.'

    ,
    // Post: building-strength-comprehensive-guide
    'blog.post.buildingStrengthComprehensiveGuide.title': '22 fascinerende feiten over spieren',
    'blog.post.buildingStrengthComprehensiveGuide.introduction':
      'Wanneer je bij ons personal training volgt (of dat overweegt), besteed je waarschijnlijk al veel aandacht aan spierontwikkeling. Maar hoeveel weet je eigenlijk over je spieren? We raden aan om de tijd te nemen voor een deep dive en je kennis uit te breiden. Hoe meer je weet over hoe je spieren werken, hoe makkelijker het wordt om ze te ontwikkelen en je persoonlijke fitnessdoelen te behalen. Om je op weg te helpen hebben we 22 interessante feiten over spieren op een rij gezet. Sommige fun facts kun je ook gebruiken om indruk te maken op die leuke persoon die je al een tijdje in het oog hebt!',
    'blog.post.buildingStrengthComprehensiveGuide.sections.0.title': 'Fascinerende feiten over spieren die je zou moeten kennen',
    'blog.post.buildingStrengthComprehensiveGuide.sections.0.content': '',
    'blog.post.buildingStrengthComprehensiveGuide.sections.1.title':
      '#1. Afhankelijk van hoe je telt, heeft het menselijk lichaam tussen de 600 en 700 skeletspieren',
    'blog.post.buildingStrengthComprehensiveGuide.sections.1.content':
      'Dit zijn de spieren die verantwoordelijk zijn voor het behouden van je houding. Ze geven structurele ondersteuning en maken beweging mogelijk.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.2.title':
      '#2. Als al je skeletspieren in één richting zouden trekken, zou je ongeveer 25 ton kunnen optillen',
    'blog.post.buildingStrengthComprehensiveGuide.sections.2.content': '',
    'blog.post.buildingStrengthComprehensiveGuide.sections.3.title':
      '#3. Naast skeletspieren heb je ook zogenaamde gladde spieren',
    'blog.post.buildingStrengthComprehensiveGuide.sections.3.content':
      'Voorbeelden van gladde spieren zijn spieren die bepaalde zintuiglijke processen aansturen (zoals het verwijden en vernauwen van je pupillen) en de werking van je ademhalings- en spijsverteringsstelsel.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.4.title':
      '#4. Daarnaast is er de hartspier: de hardst werkende spier in het menselijk lichaam',
    'blog.post.buildingStrengthComprehensiveGuide.sections.4.content':
      'Het is ook de enige spier die nooit moe wordt.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.5.title':
      '#5. Ongeveer 35 tot 40 procent van je lichaamsgewicht bestaat uit spierweefsel',
    'blog.post.buildingStrengthComprehensiveGuide.sections.5.content': '',
    'blog.post.buildingStrengthComprehensiveGuide.sections.6.title':
      '#6. De grootste skeletspier in je lichaam is de gluteus maximus',
    'blog.post.buildingStrengthComprehensiveGuide.sections.6.content':
      'Ja, we hebben het over je bilspier. Of specifieker: één van de drie verschillende bilspieren. Zonder de gluteus maximus zou je niet eens rechtop kunnen lopen.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.7.title':
      '#7. De kleinste spier in je lichaam heet de stapedius',
    'blog.post.buildingStrengthComprehensiveGuide.sections.7.content':
      'Deze spier zit in je middenoor en beschermt je binnenoor tegen hoge geluidsniveaus door de amplitude van geluidsgolven te reguleren (als een interne volumeknop). Omdat deze reflex relatief traag is, is de kans op gehoorschade groter bij plotselinge harde geluiden zoals explosies of geweerschoten. Zonder stapedius zouden we voortdurend overweldigd worden door het geluid van onze eigen stem. Deze piepkleine spier is ook de reden waarom opnames van je eigen stem zo vreemd klinken.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.8.title':
      '#8. Als mensen frequenties onder de 20 Hz konden horen, zouden we onze spieren horen bewegen',
    'blog.post.buildingStrengthComprehensiveGuide.sections.8.content': '',
    'blog.post.buildingStrengthComprehensiveGuide.sections.9.title':
      '#9. Je tong is de enige spier in je hele lichaam die maar aan één kant vastzit',
    'blog.post.buildingStrengthComprehensiveGuide.sections.9.content': '',
    'blog.post.buildingStrengthComprehensiveGuide.sections.10.title':
      '#10. Je vingers bestaan uit botten, banden en pezen',
    'blog.post.buildingStrengthComprehensiveGuide.sections.10.content':
      'Klopt: er zitten geen spieren in je vingers. Het zijn je onderarmspieren die via pezen “trekken” en je vingers laten bewegen.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.11.title':
      '#11. Er zijn geen spieren zo actief als je oogspieren',
    'blog.post.buildingStrengthComprehensiveGuide.sections.11.content':
      'Ze maken gemakkelijk meer dan 100.000 bewegingen per dag!',
    'blog.post.buildingStrengthComprehensiveGuide.sections.12.title':
      '#12. De langste spier in het menselijk lichaam is de sartorius',
    'blog.post.buildingStrengthComprehensiveGuide.sections.12.content':
      'Dit is de spier die over de lengte van je bovenbeen loopt naar de binnenkant van je knie.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.13.title':
      '#13. De breedste spier die je hebt is de latissimus dorsi',
    'blog.post.buildingStrengthComprehensiveGuide.sections.13.content':
      'Deze spier werkt samen met meerdere spieren om je schouders te bewegen. Je gebruikt je lats ook bij diepe ademhaling en bij hoesten.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.14.title':
      '#14. Spieropbouw gebeurt niet in de gym',
    'blog.post.buildingStrengthComprehensiveGuide.sections.14.content':
      'Het gebeurt wanneer je slaapt. Dan maakt je lichaam stoffen aan die spierweefsel herstellen — een cruciaal onderdeel van spieropbouw.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.15.title':
      '#15. Spiermassa wordt vaak sneller opgebouwd dan dat het wordt afgebroken',
    'blog.post.buildingStrengthComprehensiveGuide.sections.15.content':
      'Onderzoek laat zien dat twee maanden pauze ongeveer 23% spierverlies kan opleveren. Maar als je juist twee maanden traint, kun je ongeveer 47% spier winnen.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.16.title':
      '#16. Als je start met trainen om af te vallen en je weegt na een paar weken meer: dat kan kloppen',
    'blog.post.buildingStrengthComprehensiveGuide.sections.16.content':
      'Spieren zijn zwaarder dan vet. Om precies te zijn: één kubieke inch spier weegt drie keer zoveel als één kubieke inch vet. Daarom is het getal op de weegschaal niet altijd zo relevant als veel mensen denken.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.17.title':
      '#17. Spier weegt ongeveer drie keer zoveel als vet, maar verbrandt ook drie keer efficiënter calorieën',
    'blog.post.buildingStrengthComprehensiveGuide.sections.17.content':
      'Je lichaam verbrandt ongeveer 50 extra calorieën per dag voor elke pound spier die je opbouwt.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.18.title':
      '#18. Spiercontracties genereren maar liefst 85% van onze lichaamswarmte',
    'blog.post.buildingStrengthComprehensiveGuide.sections.18.content':
      'Wanneer je het koud hebt, trekken je spieren samen. Dat gebeurt onbewust. Hoe kouder je het hebt, hoe heviger die contracties — daarom rillen mensen als ze het koud hebben.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.19.title':
      '#19. Herstel is net zo belangrijk voor je spieren als training',
    'blog.post.buildingStrengthComprehensiveGuide.sections.19.content':
      'Als je je spieren niet de tijd geeft om te herstellen na een zware training, zijn ze veel vatbaarder voor blessures.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.20.title':
      '#20. Naast rust hebben je spieren ook eiwitten nodig om te herstellen',
    'blog.post.buildingStrengthComprehensiveGuide.sections.20.content':
      'Afhankelijk van je activiteitsniveau zou ongeveer 10 tot 35 procent van je calorie-inname uit eiwit moeten bestaan.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.21.title':
      '#21. Uitdroging heeft een negatief effect op het zelfherstellend vermogen van je spieren',
    'blog.post.buildingStrengthComprehensiveGuide.sections.21.content':
      'Het is altijd belangrijk om gedurende de dag genoeg water te drinken, maar zeker ook wanneer je spierpijn hebt na een training!',
    'blog.post.buildingStrengthComprehensiveGuide.sections.22.title':
      "#22. We kennen allemaal de zogenaamde 'hypnic jerk'",
    'blog.post.buildingStrengthComprehensiveGuide.sections.22.content':
      "Dat is het gevoel dat je valt wanneer je in slaap valt. Dit ogenschijnlijk vreemde fenomeen is eigenlijk een verkeerde interpretatie van je brein, omdat je spieren beginnen te ontspannen. De plotselinge spiersamentrekkingen tijdens de “val” ontstaan door signalen die je brein naar je ledematen stuurt in een poging je balans te herstellen."
  },
  en: {
    // Categories / filters
    'blog.filters.aria': 'Filter articles by category',
    'blog.categories.all': 'All Articles',
    'blog.categories.clientTalks': 'Client talks',
    'blog.categories.event': 'Event',
    'blog.categories.exercises': 'Exercises',
    'blog.categories.personalTraining': 'Personal Training',
    'blog.categories.recipes': 'Recipes',
    'blog.categories.tipsTricks': 'Tips & Tricks',
    'blog.categories.uncategorized': 'Uncategorized',

    // Spotlight
    'blog.spotlight.readAriaPrefix': 'Read article:',

    // Articles grid
    'blog.articles.aria': 'Blog articles',
    'blog.comments.none': 'No Comments',
    'blog.comments.one': 'Comment',
    'blog.comments.many': 'Comments',

    // Post page
    'blog.post.backToBlog': '← Back to Blog',

    // Post: why-personal-trainers-are-worth-it
    'blog.post.whyPersonalTrainersAreWorthIt.title': 'Why Personal Trainers Are Worth It',
    'blog.post.whyPersonalTrainersAreWorthIt.introduction':
      "In today's fast-paced world, staying fit and healthy can be challenging. Many people turn to personal trainers to help them achieve their fitness goals. But is hiring a personal trainer really worth it? Let's explore why personal trainers can be a valuable investment in your health.",
    'blog.post.whyPersonalTrainersAreWorthIt.sections.0.title': 'Personalized Workout Plans',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.0.content':
      'One of the main benefits of working with a personal trainer is the creation of a personalized workout plan. Unlike generic workout routines you might find online, a personal trainer tailors exercises to your specific needs and goals. Whether you aim to lose weight, build muscle, or improve your overall fitness, a personalized plan can make a significant difference.',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.1.title': 'Proper Technique and Form',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.1.content':
      'Personal trainers are experts in exercise techniques and proper form. They ensure you perform exercises correctly to avoid injuries and maximize effectiveness. Incorrect form can lead to serious injuries and long-term health issues. With a personal trainer guiding you, you can be confident that you are exercising safely.',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.2.title': 'Motivation and Accountability',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.2.content':
      'Staying motivated can be one of the biggest hurdles in maintaining a fitness routine. Personal trainers provide the encouragement and support you need to stay on track. They hold you accountable by setting realistic goals and tracking your progress. Knowing that someone is monitoring your progress can be a strong motivator to stick with your fitness plan.',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.3.title': 'Efficient Workouts',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.3.content':
      'Time is a precious commodity, and personal trainers help you make the most of it. They design workouts that are efficient and effective, ensuring you get the best results in the shortest amount of time. With a well-structured plan, you can achieve more in a 30-minute session with a personal trainer than in an hour working out on your own.',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.4.title': 'Customized Nutrition Advice',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.4.content':
      'Personal trainers often provide nutritional advice tailored to your fitness goals. They can help you create a balanced diet plan that complements your workouts and enhances your results. Proper nutrition is a crucial component of any fitness journey, and having expert guidance can make a significant difference.',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.5.title': 'Adaptability and Flexibility',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.5.content':
      'Life is unpredictable, and sometimes your fitness routine needs to adapt. Personal trainers can adjust your workout plans to accommodate changes in your schedule, fitness level, or health conditions. This flexibility ensures that you can continue progressing toward your goals, no matter what life throws your way.',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.6.title': 'Cost-Effective Investment',
    'blog.post.whyPersonalTrainersAreWorthIt.sections.6.content':
      'While hiring a personal trainer may seem like a significant expense, it can be a cost-effective investment in the long run. The benefits of personalized training, injury prevention, and efficient workouts can save you time and money on medical bills and ineffective fitness programs. Additionally, the long-term health benefits can lead to a better quality of life.',
    'blog.post.whyPersonalTrainersAreWorthIt.conclusion':
      'In conclusion, personal trainers offer numerous advantages that make them worth the investment. From personalized workout plans to motivation and accountability, they provide the support you need to achieve your fitness goals efficiently and safely. If you\'re searching for "personal trainers near me" or considering Roure Personal Training, now is the time to take the leap and invest in your health.',
    'blog.post.whyPersonalTrainersAreWorthIt.callToAction':
      'Have you worked with a personal trainer before? Share your experiences in the comments below!'
    ,

    // Blog listing (titles/excerpts)
    'blog.articles.items.why-personal-trainers-are-worth-it.title': 'Why Personal Trainers Are Worth It',
    'blog.articles.items.why-personal-trainers-are-worth-it.excerpt':
      "In today's fast-paced world, staying fit and healthy can be challenging. Many people turn to personal trainers to help them achieve their fitness goals.",

    'blog.articles.items.how-exercise-helps-to-relieve-stress.title': 'How exercise helps to relieve stress',
    'blog.articles.items.how-exercise-helps-to-relieve-stress.excerpt':
      'Along with making sure you get enough sleep, regular exercise is the most common advice we hear whenever we go through a stressful period.',

    'blog.articles.items.static-stretching-vs-dynamic-stretching.title': 'Static stretching vs dynamic stretching: an introduction',
    'blog.articles.items.static-stretching-vs-dynamic-stretching.excerpt':
      "We all know that stretching is important. However, not all stretches are equal. In this blogpost we'll shed a light on static stretching versus dynamic stretching.",

    'blog.articles.items.how-much-water-should-you-drink.title': 'How much water should you drink before, during and after training?',
    'blog.articles.items.how-much-water-should-you-drink.excerpt':
      "We probably don't need to tell you how important it is to drink enough water every day. When you're working up a sweat, proper hydration becomes even more crucial.",

    'blog.articles.items.mindful-exercise-mindfulness-workouts.title': 'Mindful exercise: How to bring more mindfulness into your workouts',
    'blog.articles.items.mindful-exercise-mindfulness-workouts.excerpt':
      "Let's get one thing straight: there is absolutely nothing wrong with putting in your AirPods and listening to some tunes when you're going for a run.",

    'blog.articles.items.building-strength-comprehensive-guide.title': '22 fascinating facts about muscles',
    'blog.articles.items.building-strength-comprehensive-guide.excerpt':
      'Strength training is one of the most effective ways to improve your overall health and fitness. Learn how to build strength safely and effectively.'

    ,
    // Post: how-exercise-helps-to-relieve-stress
    'blog.post.howExerciseHelpsToRelieveStress.title': 'How exercise helps to relieve stress',
    'blog.post.howExerciseHelpsToRelieveStress.introduction':
      "Along with making sure you get enough sleep, regular exercise is the most common advice we hear whenever we go through a stressful period. It is pretty much common knowledge that daily physical activity has a positive impact on our mental health, and that it plays a huge role in alleviating symptoms of stress – with immediate as well as long term effects. But how does that work, exactly? What is it that happens in our bodies when we work out, and how does that impact our stressed minds? In this article, we'll explain how exercise helps to relieve stress – scientifically.",
    'blog.post.howExerciseHelpsToRelieveStress.sections.0.title': 'The connection between mind and body',
    'blog.post.howExerciseHelpsToRelieveStress.sections.0.content':
      "In our current day and age, mind and body are often regarded as two separate entities. In reality, they are connected in more ways than we can even comprehend. Our mental state has a huge impact on our physical health. When our brain is affected by stress, sooner or later our body will be affected as well. We could give many examples of the inseparable connection of mind and body. Think about how your heart rate increases and your breathing quickens when your brain registers a threat. How being madly in love with someone reduces your appetite. How being nervous before an important exam or a big presentation makes your stomach churn. These connections are not one-way streets – they also work the other way around. That means that when your body feels better, your mind feels better as well.",
    'blog.post.howExerciseHelpsToRelieveStress.sections.1.title': 'How does exercise help to relieve stress?',
    'blog.post.howExerciseHelpsToRelieveStress.sections.1.content':
      "The benefits of exercise on mental health have been known for centuries. The Greek philosopher Plato even believed that \"exercise would cure a guilty conscience\". It may seem somewhat contradictory, since exercise is basically a form of physical stress. How does generating physical stress help to reduce mental stress? In order to explain that, we need to talk about neurotransmitters. These organic molecules are crucial for proper brain functioning. Exercise directly influences our neurochemistry in the following ways:",
    'blog.post.howExerciseHelpsToRelieveStress.sections.2.title': 'It reduces stress hormones',
    'blog.post.howExerciseHelpsToRelieveStress.sections.2.content':
      'Physical activity reduces the levels of stress hormones such as adrenaline and cortisol.',
    'blog.post.howExerciseHelpsToRelieveStress.sections.3.title': 'It increases the production on endorphins',
    'blog.post.howExerciseHelpsToRelieveStress.sections.3.content':
      "Endorphins are the feel-good neurotransmitters; they are basically your body's own, natural pain killers and mood boosters. There are over twenty different types of endorphins; some of them have an effect that is even stronger than morphine.",
    'blog.post.howExerciseHelpsToRelieveStress.sections.4.title': 'It creates a dopamine boost',
    'blog.post.howExerciseHelpsToRelieveStress.sections.4.content':
      "Endorphins work together with another crucial neurotransmitter: dopamine. This neural messenger, often referred to as the 'motivation molecule' is responsible for motivation and reward; it is what gives us that sense of satisfaction after accomplishing a task. It also plays a crucial role in our executive functions, attention-span, focus and our ability to experience pleasure.",
    'blog.post.howExerciseHelpsToRelieveStress.sections.5.title': 'It ensures a healthy serotonin balance',
    'blog.post.howExerciseHelpsToRelieveStress.sections.5.content':
      'Physical activity results in an increased release and synthesis of serotonin. This neurotransmitter is involved in many physiological processes relating to sleep, body temperature regulation, muscle control, appetite and digestion and libido. Serotonin also helps to stabilize your mood and well-being.',
    'blog.post.howExerciseHelpsToRelieveStress.sections.6.title': 'Beyond neurochemicals',
    'blog.post.howExerciseHelpsToRelieveStress.sections.6.content':
      "The above has all been scientifically proven, so you don't have to take our word for it. But the ways that exercise helps to relieve stress are not limited to how they influence our neurotransmitters. There are also emotional, behavioral and social factors that come into play. If you have been overweight, for example, and you start a regular workout regimen with a personal trainer, seeing and feeling how you're losing excess fat and toning up will improve your self-image, confidence and pride. Along the same lines, an individual who has been dealing with insecurity, feelings of weakness and a lack of self-discipline will see significant improvement in these areas when they start weight training or martial arts. We see ourselves improve, and it often doesn't take very long for others to notice it as well. The discipline, drive and energy that we get from exercising regularly tend to create a butterfly effect and help us to achieve our other goals in life. This in itself does not only reduce our overall stress levels but also enables us to handle stress better – it makes us more resilient. And since we can't always prevent life from throwing stress-inducing events our way, we better make sure we are resilient enough to deal with it."

    ,
    // Post: static-stretching-vs-dynamic-stretching
    'blog.post.staticStretchingVsDynamicStretching.title': 'Static stretching vs dynamic stretching: an introduction',
    'blog.post.staticStretchingVsDynamicStretching.introduction':
      "We all know that stretching is important. However, not all stretches are equal. In this blogpost we'll shed a light on static stretching versus dynamic stretching. What is the difference between these two types of stretching? And is it better to do them before or after your workout?",
    'blog.post.staticStretchingVsDynamicStretching.sections.0.title': 'What is static stretching?',
    'blog.post.staticStretchingVsDynamicStretching.sections.0.content':
      'Static stretching refers to stretching exercises where you stretch a muscle or group of muscles by holding a single position for a relatively long time (usually between 15 or 60 seconds, sometimes longer). Some examples of static stretches: Standing quadriceps stretch, Static tricep stretch, Butterfly stretch.',
    'blog.post.staticStretchingVsDynamicStretching.sections.1.title': 'What is dynamic stretching?',
    'blog.post.staticStretchingVsDynamicStretching.sections.1.content':
      "Dynamic stretching is considered more functionally oriented way of stretching. It refers to specific controlled (usually repetitive) movements focused on actively increased the range of motion, but without holding a position or stopping at an endpoint. Some examples of dynamic stretches: Leg sweeps, Downward dog to cobra, Runner's lunge with twist.",
    'blog.post.staticStretchingVsDynamicStretching.sections.2.title': 'Static stretching vs dynamic stretching',
    'blog.post.staticStretchingVsDynamicStretching.sections.2.content':
      "Static stretching got somewhat of a bad reputation during the 1980's, when published studies indicated that doing static stretches before a workout had a negative impact on performance. There is some truth in this. If you move a joint past your range of motion and hold it for a longer period of time and then immediately start exercising without doing a contra-stretch for that muscle(group), it makes sense to experience a temporary decrease in muscle power, explosive strength and speed. That said, there is absolutely a time and a place for static stretching. Recent studies suggest that doing static stretches as part of your cooling down, is an excellent way to combat post-workout stiffness and sore muscles. Doing it regularly also increases your flexibility and range of motion in the long run. Most dynamic stretches are designed to mimic the movements you make during your workout – which is why there are a lot of differences between recommended dynamic stretches for different sports). Dynamic stretches are primarily done as part of the warming up and help to prepare and activate the muscles for the activities you're about to do. The movements also increase the blood flow and raise the temperature of the muscles, which helps to prevent injuries. Numerous studies have shown that dynamic stretching pre-workout has a positive effect on power and performance.",
    'blog.post.staticStretchingVsDynamicStretching.sections.3.title': 'Final thoughts',
    'blog.post.staticStretchingVsDynamicStretching.sections.3.content':
      "In theory, it comes down to dynamic stretching during the warming up and static stretches during the cooling down. In practise, it's not that black and white – a lot of static stretches can be tweaked to make them dynamic and suitable for warming up. Keep in mind that everyone is different. Whether you're performing static or dynamic stretches, you should always listen to your body. Stretching is never supposed to hurt! If it does, ask your personal trainer for advice."

    ,
    // Post: how-much-water-should-you-drink
    'blog.post.howMuchWaterShouldYouDrink.title': 'How much water should you drink before, during and after training?',
    'blog.post.howMuchWaterShouldYouDrink.introduction':
      "We probably don't need to tell you how important it is to drink enough water every day. When you're working up a sweat, proper hydration is even more crucial. But having a belly full of sloshing water during an intense workout is not very comfortable either. So how do you know whether you're actually drinking enough water? And how much water should you drink before, during and after training?",
    'blog.post.howMuchWaterShouldYouDrink.sections.0.title': 'What are the symptoms of dehydration?',
    'blog.post.howMuchWaterShouldYouDrink.sections.0.content':
      "Did you know that around 60% of the human body consists of water? When you fail to replenish the fluids that you lose, you are more susceptible to overheating. Your blood thickens. Your heart has to work harder in order to pump blood through your body. Muscle contractions become increasingly more difficult. You're no longer able to efficiently absorb nutrients from food and supplements. Your body's ability to filter and flush out toxins decreases. Your system will try to hold on to whatever fluids there are left, causing you to feel bloated and uncomfortable. And you get thirsty.",
    'blog.post.howMuchWaterShouldYouDrink.sections.1.title': 'How much water should you drink before, during and after training?',
    'blog.post.howMuchWaterShouldYouDrink.sections.1.content':
      `A lot of people forget to drink enough water. It's usually not until we start to feel thirsty that we think: "I should probably drink some water." But if you don't drink until you are thirsty, you're actually too late. Ideally, you should drink enough during the day to prevent getting thirsty in the first place. When you're training, you want to stay hydrated and at the same time prevent yourself from drinking so much that it hinders your workout.`,
    'blog.post.howMuchWaterShouldYouDrink.sections.2.title': 'Before training',
    'blog.post.howMuchWaterShouldYouDrink.sections.2.content':
      "When empty, the human stomach is around the size of a fist. However, it can stretch to hold more than you might think. Unless you spend years stretching out your stomach by overeating, your stomach can hold around one to two litres of fluid. That doesn't mean that you should go exercise with that much water in your stomach, but starting out dehydrated is not a good idea either. The American Council on Exercise recommends drinking around half a litre of water in the two hours before your workout. In the last 30 minutes before you start, add another 200 millilitres.",
    'blog.post.howMuchWaterShouldYouDrink.sections.3.title': 'During training',
    'blog.post.howMuchWaterShouldYouDrink.sections.3.content':
      "While you definitely need to prevent dehydration during training, drinking too much water in between will almost certainly have a negative effect on your performance. Nobody wants to do a martial arts class, run a couple of miles or lift heavy weights with a litre or two of water sloshing around! If you're sweating heavily during a longer workout, however, you need to make sure you replenish the fluids and electrolytes that you're losing. The best thing is to take small sips in between; around 200 millilitres per 20 minutes.",
    'blog.post.howMuchWaterShouldYouDrink.sections.4.title': 'After training',
    'blog.post.howMuchWaterShouldYouDrink.sections.4.content':
      "After training is when your body is most efficient in taking up fluids. How much you should drink, depends on how much you lost during your workout. If you're not sure whether you're drinking enough, you could try to weigh yourself before and after a workout. A good rule of thumb is to drink up to half a litre of water for every pound that you've lost afterwards.",
    'blog.post.howMuchWaterShouldYouDrink.sections.5.title': 'Final thoughts',
    'blog.post.howMuchWaterShouldYouDrink.sections.5.content':
      "If you're having trouble staying hydrated (like so many of us), buy yourself a cute water bottle and get into the habit of bringing it everywhere with you – including the gym. When you're properly hydrated, you'll be able to get the most out of your workouts. And we can promise you that you'll feel a lot better!"

    ,
    // Post: mindful-exercise-mindfulness-workouts
    'blog.post.mindfulExerciseMindfulnessWorkouts.title': 'Mindful exercise: How to bring more mindfulness into your workouts',
    'blog.post.mindfulExerciseMindfulnessWorkouts.introduction':
      "Let's get one thing straight: there is absolutely nothing wrong with putting in your AirPods and listening to some tunes when you're going for a run. There is also nothing wrong with zoning out while you're sweating your ass off on the elliptical. And be honest, mindlessly hitting a punching bag is great for releasing negative emotions. However, if you're always on autopilot, you're missing out. Constantly being distracted during workouts means disconnecting with your body. This results in your exercises being less effective, which will inevitably lead to hitting a plateau, slowed progress or no progress at all. Therefore, I'd like to challenge you to switch up your mindless workouts with mindful exercise.",
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.0.title': 'The benefits of mindful exercise',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.0.content':
      "Mindful exercise can help to increase your performance, improve your form and technique and prevent injuries. Being present during your workout means moving with intention. This really enables you to tune into your body and get a better understanding about what's going on during the exercises that you do. Not just physically, but also mentally. This will increase the release of endorphins, those chemicals that make you feel so good during and after training. Regularly working up a good sweat in a mindful way will also help you to stick to your workout plan and ultimately reach your fitness goals.",
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.1.title': 'How to bring more mindfulness into your workouts',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.1.content':
      "Below, we've listed five tips to help you bring more mindfulness into your workouts:",
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.2.title': '#1. Start every workout by setting an intention',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.2.content':
      `Mindful exercise starts before your workout. Take a minute or so before you start to set an intention for this specific training. It can be something like "I will stay present and aware during this workout", "I will find joy in every exercise I perform today" or "I will make the barbell my **** today". It can be easy to forget your intention once you get going, especially if you have a habit of 'going through the motions'. If you're doing a home workout, you can write your intention on a piece of paper and stick it to your mat. If you're going to the gym, you can write a reminder on your wrist.`,
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.3.title': '#2. Focus on your breath',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.3.content':
      "You may have seen this one coming, but it's one of the best ways to practise mindful exercise. If you're doing cardio, you have to focus on your breath. If you don't, you're not going to get far – or you'll be forced to terminate your workout because of side pains and cramps. When you finish a session, how long does it take you to get your breath back to normal? But even when you're doing (body)weight training, it is good to pay attention to your breath. How ARE you breathing now? Are you breathing in through your nose and out through your mouth? In and out at the right moments? When you're doing push ups, are you breathing out at the top of your push up or when you lower down? How about with deadlifts?",
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.4.title': '#3. Pay more attention to your body during your workout',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.4.content':
      "Mindful exercise can be challenging at first, especially when you're so used to zoning out and going through the motions. But being mindful is something you can train, just like your muscles. Once you notice your mind starts to wander to last night's date or tomorrow's to-do list, gently bring your awareness back to your exercise.",
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.5.title': '#4. Create room for workouts without distractions',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.5.content':
      "Like we mentioned before, it's totally okay to alternate with workouts where you just zone out and go without thinking. But make sure to also create space for mindful exercise. It's up to you how you want to shape those. It might be a quiet home workout in solitude. Or going for a run without your headphones, and listening to the sounds of your own footsteps, your own breathing, the birds, the wind, the rustling leaves. It's a completely different experience.",
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.6.title': '#5. Check in with yourself afterwards',
    'blog.post.mindfulExerciseMindfulnessWorkouts.sections.6.content':
      "Many of us have a tendency of diving right back into their daily routine after they're done working out. But a more mindful approach to fitness works best if you take some time after your workout to check in with yourself. This doesn't have to take long. You can, for example, reflect on your workout when you're in the shower, or while you're doing a cooldown with some stretches, or when you're walking home from the gym. For those who are really dedicated: buy yourself a pretty notebook and write down a few lines about what you did during your workout, how you feel now, and what you want to work on next time."

    ,
    // Post: building-strength-comprehensive-guide
    'blog.post.buildingStrengthComprehensiveGuide.title': '22 fascinating facts about muscles',
    'blog.post.buildingStrengthComprehensiveGuide.introduction':
      "When you're getting personal training with us (or are considering it), you're probably already paying a lot of attention to muscle development. But how much do you actually know about your muscles? We'd recommend finding some time to do a deep dive and expand your knowledge. The more you know about how your muscles work, the easier it will be to develop them and reach your personal fitness goals. To help you get started, we've listed 22 interesting facts about muscles. Some fun facts can also be used to impress that cutie you've been eyeing!",
    'blog.post.buildingStrengthComprehensiveGuide.sections.0.title': 'Fascinating facts about muscles that you should know about',
    'blog.post.buildingStrengthComprehensiveGuide.sections.0.content': '',
    'blog.post.buildingStrengthComprehensiveGuide.sections.1.title':
      '#1. While it depends on how you count, the human body contains between 600 and 700 skeletal muscles',
    'blog.post.buildingStrengthComprehensiveGuide.sections.1.content':
      'These are the muscles responsible for maintaining your posture. They provide structural support and enable your body to move.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.2.title':
      '#2. If all of the skeletal muscles you have in your body could pull in one direction, you would have the ability to lift around 25 tons of weight',
    'blog.post.buildingStrengthComprehensiveGuide.sections.2.content': '',
    'blog.post.buildingStrengthComprehensiveGuide.sections.3.title':
      '#3. Aside from skeletal muscles, you also have so-called smooth muscles',
    'blog.post.buildingStrengthComprehensiveGuide.sections.3.content':
      'Examples of smooth muscles are those responsible for certain sensory processes (like the expansion and contraction of your pupils) and the functioning of your respiratory and digestive system.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.4.title':
      '#4. There is also the cardiac muscle, the hardest working muscle in the human body',
    'blog.post.buildingStrengthComprehensiveGuide.sections.4.content': 'It is also the only muscle that never gets tired.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.5.title':
      '#5. Around 35 to 40 percent of your body weight is made up of muscle tissue',
    'blog.post.buildingStrengthComprehensiveGuide.sections.5.content': '',
    'blog.post.buildingStrengthComprehensiveGuide.sections.6.title':
      '#6. The biggest skeletal muscle in your body is the gluteus maximus',
    'blog.post.buildingStrengthComprehensiveGuide.sections.6.content':
      "Yes, we're talking about your butt. Or more specifically, one of the three different muscles in your butt. Without the gluteus maximus, you wouldn't even be able to walk up straight.",
    'blog.post.buildingStrengthComprehensiveGuide.sections.7.title':
      '#7. The smallest muscle in your body is called the stapedius',
    'blog.post.buildingStrengthComprehensiveGuide.sections.7.content':
      "It is located in your middle ear and serves to protect the inner ear from high levels of noise by controlling the amplitude of soundwaves, like an internal volume control. Because its reflex is relatively slow, the risk of damaging your hearing is significantly greater when you're exposed to sudden sounds such as explosions or gunshots. Without a stapedius, we would be constantly overwhelmed by the sound of our own voice. This tiny muscle is also the reason why listening to recordings of your own voice always sound so weird.",
    'blog.post.buildingStrengthComprehensiveGuide.sections.8.title':
      '#8. If us humans had the ability to hear frequencies below 20 Hz, we would actually hear our muscles moving',
    'blog.post.buildingStrengthComprehensiveGuide.sections.8.content': '',
    'blog.post.buildingStrengthComprehensiveGuide.sections.9.title':
      '#9. Your tongue is the only muscle in your entire body that is attached on only one side',
    'blog.post.buildingStrengthComprehensiveGuide.sections.9.content': '',
    'blog.post.buildingStrengthComprehensiveGuide.sections.10.title':
      '#10. Your fingers are made out of bones, ligaments and tendons',
    'blog.post.buildingStrengthComprehensiveGuide.sections.10.content':
      "That's right, there are no muscles in your fingers. Our forearm muscles 'pulling' on the tendons are what enables us to move them.",
    'blog.post.buildingStrengthComprehensiveGuide.sections.11.title':
      '#11. There are no muscles as active as your eye muscles',
    'blog.post.buildingStrengthComprehensiveGuide.sections.11.content': 'They easily get over 100.000 movements per day!',
    'blog.post.buildingStrengthComprehensiveGuide.sections.12.title':
      '#12. The longest muscle in the human body is the sartorius',
    'blog.post.buildingStrengthComprehensiveGuide.sections.12.content':
      'It is the muscle that runs over the length of your upper thigh to the inside of your knee.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.13.title':
      '#13. The widest muscle that you have is the latissimus dorsi',
    'blog.post.buildingStrengthComprehensiveGuide.sections.13.content':
      "This muscle works together with several other muscles to enable your shoulders to move. However, you also use your lats during deep breathing, as well as when you're coughing.",
    'blog.post.buildingStrengthComprehensiveGuide.sections.14.title':
      '#14. Gaining muscle does not actually happen in the gym',
    'blog.post.buildingStrengthComprehensiveGuide.sections.14.content':
      'It happens when you sleep. This is when your body produces the chemicals that are responsible for repairing muscle tissue – a crucial element in building muscle mass.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.15.title':
      '#15. While it may not always be obvious, muscle mass is gained much quicker than it is lost',
    'blog.post.buildingStrengthComprehensiveGuide.sections.15.content':
      'Research has shown that taking a two month break from training results in around 23 percent muscle loss. However, if you do spend two months on training, you could gain around 47 percent of muscle.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.16.title':
      '#16. If you started training because you wanted to lose some weight and find out a couple of weeks later that you actually gained weight, that makes sense',
    'blog.post.buildingStrengthComprehensiveGuide.sections.16.content':
      'After all, muscles are heavier than fat. To be more specific: one cubic inch of muscle weighs three times as much as a cubic inch of fat. This is why the number on the scale is not always as relevant as many people think.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.17.title':
      '#17. Muscle may weigh three times as much as fat, it is also three times more efficient when it comes to burning calories',
    'blog.post.buildingStrengthComprehensiveGuide.sections.17.content':
      'Your body burns around 50 extra calories per day for every pound of muscle that you gain.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.18.title':
      '#18. Muscle contractions generate a whopping 85 percent of our body heat',
    'blog.post.buildingStrengthComprehensiveGuide.sections.18.content':
      "Any time you feel cold, your muscles will contract. This happens involuntarily, so you can't really control it. The colder you feel, the more intense these contractions will get. That is why humans shiver when they're freezing!",
    'blog.post.buildingStrengthComprehensiveGuide.sections.19.title':
      '#19. Recovery is just as important for your muscles as training',
    'blog.post.buildingStrengthComprehensiveGuide.sections.19.content':
      "If you don't give your muscles the time to recover after a heavy workout, they are significantly more susceptible to injuries.",
    'blog.post.buildingStrengthComprehensiveGuide.sections.20.title':
      '#20. Aside from rest, our muscles also require protein to repair themselves',
    'blog.post.buildingStrengthComprehensiveGuide.sections.20.content':
      'Depending on your activity level, around 10 tot 35 percent of the calories you consume should come from protein.',
    'blog.post.buildingStrengthComprehensiveGuide.sections.21.title':
      "#21. Dehydration has a negative impact on your muscles' self-repairing abilities",
    'blog.post.buildingStrengthComprehensiveGuide.sections.21.content':
      "It's always important to drink plenty of water during the day, but even more so when you feel sore after a workout!",
    'blog.post.buildingStrengthComprehensiveGuide.sections.22.title':
      "#22. We have all experienced the so-called 'hypnic jerk'",
    'blog.post.buildingStrengthComprehensiveGuide.sections.22.content':
      "It's when you feel like you're falling when you're drifting off to sleep. This seemingly strange phenomenon is actually a misinterpretation of the brain due to the fact that your muscles are starting to relax. The sudden muscle contractions that occur during the 'fall' are simply caused by the signals that your brain send to your limbs in an attempt to regain balance."
  }
};


