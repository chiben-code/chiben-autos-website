"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const supportedLanguages = [
  { code: "en", short: "EN", name: "English" },
  { code: "fr", short: "FR", name: "Français" },
  { code: "pt", short: "PT", name: "Português" },
  { code: "ig", short: "IG", name: "Igbo" },
  { code: "yo", short: "YO", name: "Yorùbá" },
  { code: "ha", short: "HA", name: "Hausa" },
] as const;

export type LanguageCode = (typeof supportedLanguages)[number]["code"];

type ServiceItem = { title: string; description: string };
type PrincipleItem = { title: string; description: string };

export type PublicCopy = {
  language: string;
  nav: { inventory: string; auctions: string; services: string; company: string; whatsapp: string; menu: string; close: string };
  motion: { label: string; full: string; balanced: string; minimal: string };
  common: {
    all: string; brandNew: string; refurbished: string; prototypeVisual: string; prototypeNotForSale: string;
    mileage: string; transmission: string; location: string; year: string; body: string; fuel: string; colour: string;
    enquire: string; enquireAbout: string; vehicle: string; vehicles: string; returnInventory: string;
  };
  story: {
    aria: string; openingEyebrow: string; openingLine1: string; openingLine2: string; openingBody: string;
    explore: string; reserve: string; frameLabels: [string, string, string, string];
    frameEyebrows: [string, string, string, string]; frameTitles: [string, string, string, string];
    next: string; view: string; continue: string; scroll: string; disclosure: string;
  };
  home: {
    standard: string; manifestoTitle: string; manifestoBody: string; incorporated: string; based: string; activeCompany: string;
    collection: string; collectionTitle: string; featuredFilter: string; completeInventory: string; inventorySupport: string;
    auctionEyebrow: string; auctionTitle: string; auctionBody: string; auctionLink: string; status: string; comingSoon: string; earlyAccess: string;
    servicesEyebrow: string; servicesTitle: string; servicesBody: string; services: [ServiceItem, ServiceItem, ServiceItem, ServiceItem]; learnAbout: string;
    contactEyebrow: string; contactTitle: string; contactButton: string;
  };
  inventory: {
    eyebrow: string; titleLine1: string; titleLine2: string; intro: string; search: string; searchPlaceholder: string;
    listingsUpdate: string; noMatch: string; noMatchBody: string; request: string; notFound: string; unavailable: string;
    reserve: string; availability: string;
  };
  auctions: {
    eyebrow: string; title: string; intro: string; join: string; firstAuction: string; comingSoon: string;
    principles: [PrincipleItem, PrincipleItem, PrincipleItem];
  };
  servicesPage: {
    eyebrow: string; title: string; intro: string; services: [ServiceItem, ServiceItem, ServiceItem, ServiceItem, ServiceItem, ServiceItem];
    enquiryEyebrow: string; enquiryTitle: string; enquiryButton: string;
  };
  about: {
    eyebrow: string; title: string; intro: string; registeredName: string; registrationNumber: string; incorporated: string;
    companyType: string; companyTypeValue: string; status: string; active: string; registeredOffice: string;
    position: string; positionTitle: string; positionBody: string;
  };
  footer: { explore: string; contact: string; company: string; about: string; ownerControl: string; experience: string };
  whatsapp: { findVehicle: string; heroReservation: string; auctionNotice: string; specialRequest: string; vehicleEnquiry: string };
};

const copy: Record<LanguageCode, PublicCopy> = {
  en: {
    language: "Language",
    nav: { inventory: "Inventory", auctions: "Auctions", services: "Services", company: "Company", whatsapp: "WhatsApp us", menu: "Menu", close: "Close" },
    motion: { label: "Motion", full: "full", balanced: "balanced", minimal: "minimal" },
    common: { all: "All", brandNew: "Brand New", refurbished: "Refurbished", prototypeVisual: "Prototype visual", prototypeNotForSale: "Prototype visual · not for sale", mileage: "Mileage", transmission: "Transmission", location: "Location", year: "Year", body: "Body", fuel: "Fuel", colour: "Colour", enquire: "Enquire", enquireAbout: "Enquire about", vehicle: "vehicle", vehicles: "vehicles", returnInventory: "Return to inventory" },
    story: { aria: "Cinematic vehicle tour", openingEyebrow: "A NEW STANDARD FOR THE ROAD", openingLine1: "Find the car that", openingLine2: "feels like arrival.", openingBody: "Brand new and carefully refurbished vehicles, sourced with judgement and presented with clarity.", explore: "Explore inventory", reserve: "Reserve on WhatsApp", frameLabels: ["Front", "Profile", "Rear", "Cabin"], frameEyebrows: ["01 · First impression", "02 · Proportion", "03 · Departure", "04 · The cabin"], frameTitles: ["Presence, before motion.", "Every line considered.", "Memorable from every angle.", "A quieter kind of confidence."], next: "Next:", view: "view", continue: "Continue to the collection", scroll: "Scroll to begin the tour", disclosure: "Prototype vehicle visual · not offered for sale" },
    home: { standard: "CHIBEN STANDARD", manifestoTitle: "A good car should open possibilities, not introduce uncertainty.", manifestoBody: "Chiben Autos brings disciplined presentation, responsive guidance and a more transparent buying experience to the Nigerian automobile market.", incorporated: "Incorporated", based: "Based", activeCompany: "Active company", collection: "THE COLLECTION", collectionTitle: "Vehicles, selected with intention.", featuredFilter: "Filter featured vehicles", completeInventory: "View complete inventory", inventorySupport: "Every live listing can include inspection details, gallery images and direct reservation support.", auctionEyebrow: "CHIBEN AUCTIONS", auctionTitle: "Remarkable vehicles. A new way to bid.", auctionBody: "Verified bidding, clear reserve status and carefully presented lots are being prepared.", auctionLink: "See what is coming", status: "STATUS", comingSoon: "COMING SOON", earlyAccess: "Join the early-access list", servicesEyebrow: "BEYOND THE SHOWROOM", servicesTitle: "Automotive services built around movement.", servicesBody: "Our registered business scope gives Chiben Autos room to serve individual buyers, vehicle owners and corporate fleets as the company grows.", services: [
      { title: "Vehicle sourcing", description: "Tell us what you want. We search, assess and help you secure the right vehicle locally or internationally." },
      { title: "Brokerage & agency", description: "A clearer transaction path for buyers, sellers and businesses that need representation." },
      { title: "Fleet management", description: "Practical acquisition and vehicle planning for growing teams and established organisations." },
      { title: "Leasing & hire purchase", description: "Structured ownership pathways subject to assessment, availability and agreed terms." },
    ], learnAbout: "Learn about", contactEyebrow: "YOUR NEXT CAR STARTS WITH A CONVERSATION", contactTitle: "Tell us what you are looking for.", contactButton: "Start on WhatsApp" },
    inventory: { eyebrow: "CHIBEN SHOWROOM", titleLine1: "Inventory for where", titleLine2: "you are going next.", intro: "Explore available categories or send us the exact specification you want us to source.", search: "Search inventory", searchPlaceholder: "Model, body type or colour", listingsUpdate: "Listings update from the Chiben owner control.", noMatch: "No exact match yet.", noMatchBody: "Send Chiben Autos your requirements and we can help source the right vehicle.", request: "Request a vehicle", notFound: "Vehicle not found.", unavailable: "This listing may have been removed or sold.", reserve: "Enquire or reserve on WhatsApp", availability: "Availability, inspection details and reservation terms are confirmed by a Chiben Autos representative." },
    auctions: { eyebrow: "CHIBEN AUCTIONS", title: "A transparent bidding room is being prepared.", intro: "Future lots will combine verified vehicle information, reserve-price clarity and controlled bidder access.", join: "Join early access", firstAuction: "FIRST AUCTION", comingSoon: "COMING SOON", principles: [
      { title: "Verified lots", description: "Vehicle identity, available inspection material and seller information presented before bidding." },
      { title: "Clear status", description: "Reserve and auction states designed to remain visible from opening through close." },
      { title: "Controlled access", description: "Bidder approval and payment rules will be defined before auctions are activated." },
    ] },
    servicesPage: { eyebrow: "REGISTERED AUTOMOTIVE SCOPE", title: "More than a showroom.", intro: "Chiben Auto Ventures Ltd is structured to grow from trusted vehicle sales into a wider automotive service company.", services: [
      { title: "Vehicle sales", description: "Buying, selling and marketing brand-new, used and refurbished motor vehicles." },
      { title: "Import & export", description: "Structured support for sourcing and moving suitable vehicles across markets." },
      { title: "Brokerage & agency", description: "Representation and transaction support for buyers, sellers and automotive partners." },
      { title: "Leasing & hire purchase", description: "Alternative access and ownership pathways, subject to assessment and agreed terms." },
      { title: "Fleet management", description: "Acquisition, planning and automotive support for corporate and institutional fleets." },
      { title: "Parts & automotive products", description: "Future trade in vehicle parts, accessories, lubricants and related products." },
    ], enquiryEyebrow: "CORPORATE & SPECIAL REQUESTS", enquiryTitle: "Planning a fleet, import or hard-to-find acquisition?", enquiryButton: "Discuss your requirement" },
    about: { eyebrow: "CHIBEN AUTO VENTURES LTD", title: "Built to make the road ahead feel clearer.", intro: "Chiben Autos is a Lagos-based automobile company focused on trusted vehicle access, responsive service and long-term automotive growth.", registeredName: "Registered name", registrationNumber: "Registration number", incorporated: "Incorporated", companyType: "Company type", companyTypeValue: "Private company limited by shares", status: "Status", active: "Active", registeredOffice: "Registered office", position: "OUR POSITION", positionTitle: "Confidence is part of the product.", positionBody: "A premium website is useful only when the service behind it is clear. Chiben Autos is being built around accurate listings, accountable communication and buying support that respects the customer’s decision." },
    footer: { explore: "Explore", contact: "Contact", company: "Company", about: "About Chiben", ownerControl: "Owner control", experience: "Digital experience by BYD Studios Digital · Igwe Benedict" },
    whatsapp: { findVehicle: "Hello Chiben Autos, I would like help finding a vehicle.", heroReservation: "Hello Chiben Autos, I would like help finding or reserving a vehicle.", auctionNotice: "Hello Chiben Autos, please notify me when Chiben Auctions opens.", specialRequest: "Hello Chiben Autos, I would like to discuss a corporate or special vehicle requirement.", vehicleEnquiry: "Hello Chiben Autos, I would like to enquire about" },
  },
  fr: {
    language: "Langue",
    nav: { inventory: "Véhicules", auctions: "Enchères", services: "Services", company: "Entreprise", whatsapp: "WhatsApp", menu: "Menu", close: "Fermer" },
    motion: { label: "Animation", full: "complète", balanced: "équilibrée", minimal: "minimale" },
    common: { all: "Tous", brandNew: "Neufs", refurbished: "Reconditionnés", prototypeVisual: "Visuel prototype", prototypeNotForSale: "Visuel prototype · non proposé à la vente", mileage: "Kilométrage", transmission: "Transmission", location: "Lieu", year: "Année", body: "Carrosserie", fuel: "Carburant", colour: "Couleur", enquire: "Demander", enquireAbout: "Demander des informations sur", vehicle: "véhicule", vehicles: "véhicules", returnInventory: "Retour aux véhicules" },
    story: { aria: "Visite cinématographique du véhicule", openingEyebrow: "UNE NOUVELLE RÉFÉRENCE SUR LA ROUTE", openingLine1: "Trouvez la voiture qui", openingLine2: "vous donne le sentiment d’être arrivé.", openingBody: "Des véhicules neufs et soigneusement reconditionnés, sélectionnés avec discernement et présentés avec clarté.", explore: "Voir les véhicules", reserve: "Réserver sur WhatsApp", frameLabels: ["Avant", "Profil", "Arrière", "Habitacle"], frameEyebrows: ["01 · Première impression", "02 · Proportions", "03 · Départ", "04 · L’habitacle"], frameTitles: ["Une présence avant même le mouvement.", "Chaque ligne est maîtrisée.", "Inoubliable sous tous les angles.", "Une confiance plus sereine."], next: "Ensuite :", view: "vue", continue: "Continuer vers la collection", scroll: "Faites défiler pour commencer", disclosure: "Visuel de véhicule prototype · non proposé à la vente" },
    home: { standard: "LA NORME CHIBEN", manifestoTitle: "Une bonne voiture doit ouvrir des possibilités, pas créer de l’incertitude.", manifestoBody: "Chiben Autos apporte une présentation rigoureuse, des conseils réactifs et une expérience d’achat plus transparente au marché automobile nigérian.", incorporated: "Créée", based: "Basée à", activeCompany: "Société active", collection: "LA COLLECTION", collectionTitle: "Des véhicules choisis avec intention.", featuredFilter: "Filtrer les véhicules en vedette", completeInventory: "Voir tous les véhicules", inventorySupport: "Chaque annonce active peut inclure les détails d’inspection, une galerie et une assistance directe à la réservation.", auctionEyebrow: "ENCHÈRES CHIBEN", auctionTitle: "Des véhicules remarquables. Une nouvelle façon d’enchérir.", auctionBody: "Des enchères vérifiées, des prix de réserve clairs et des lots soigneusement présentés sont en préparation.", auctionLink: "Découvrir la suite", status: "STATUT", comingSoon: "BIENTÔT", earlyAccess: "Rejoindre l’accès anticipé", servicesEyebrow: "AU-DELÀ DU SHOWROOM", servicesTitle: "Des services automobiles conçus autour de la mobilité.", servicesBody: "Le champ d’activité enregistré de Chiben Autos lui permet d’accompagner particuliers, propriétaires et flottes d’entreprise au fil de sa croissance.", services: [
      { title: "Recherche de véhicules", description: "Dites-nous ce que vous recherchez. Nous trouvons, évaluons et vous aidons à acquérir le bon véhicule, localement ou à l’international." },
      { title: "Courtage et agence", description: "Un parcours de transaction plus clair pour les acheteurs, vendeurs et entreprises ayant besoin d’être représentés." },
      { title: "Gestion de flotte", description: "Acquisition et planification pratiques pour les équipes en croissance et les organisations établies." },
      { title: "Crédit-bail et location-vente", description: "Des parcours d’acquisition structurés, sous réserve d’évaluation, de disponibilité et de conditions convenues." },
    ], learnAbout: "En savoir plus sur", contactEyebrow: "VOTRE PROCHAINE VOITURE COMMENCE PAR UNE CONVERSATION", contactTitle: "Dites-nous ce que vous recherchez.", contactButton: "Commencer sur WhatsApp" },
    inventory: { eyebrow: "SHOWROOM CHIBEN", titleLine1: "Des véhicules pour", titleLine2: "votre prochaine destination.", intro: "Parcourez les catégories disponibles ou envoyez-nous les caractéristiques exactes du véhicule à rechercher.", search: "Rechercher", searchPlaceholder: "Modèle, carrosserie ou couleur", listingsUpdate: "Les annonces sont actualisées depuis le contrôle propriétaire Chiben.", noMatch: "Aucun résultat exact pour l’instant.", noMatchBody: "Envoyez vos critères à Chiben Autos et nous vous aiderons à trouver le bon véhicule.", request: "Demander un véhicule", notFound: "Véhicule introuvable.", unavailable: "Cette annonce a peut-être été retirée ou le véhicule vendu.", reserve: "Demander ou réserver sur WhatsApp", availability: "La disponibilité, les détails d’inspection et les conditions de réservation sont confirmés par un représentant de Chiben Autos." },
    auctions: { eyebrow: "ENCHÈRES CHIBEN", title: "Une salle d’enchères transparente est en préparation.", intro: "Les futurs lots associeront des informations vérifiées, des prix de réserve clairs et un accès contrôlé aux enchérisseurs.", join: "Rejoindre l’accès anticipé", firstAuction: "PREMIÈRE ENCHÈRE", comingSoon: "BIENTÔT", principles: [
      { title: "Lots vérifiés", description: "Identité du véhicule, documents d’inspection disponibles et informations du vendeur présentés avant les enchères." },
      { title: "Statut clair", description: "Le prix de réserve et l’état de l’enchère restent visibles de l’ouverture à la clôture." },
      { title: "Accès contrôlé", description: "Les règles d’approbation et de paiement seront définies avant l’activation des enchères." },
    ] },
    servicesPage: { eyebrow: "ACTIVITÉS AUTOMOBILES ENREGISTRÉES", title: "Bien plus qu’un showroom.", intro: "Chiben Auto Ventures Ltd est structurée pour évoluer de la vente de véhicules de confiance vers une entreprise de services automobiles plus large.", services: [
      { title: "Vente de véhicules", description: "Achat, vente et commercialisation de véhicules neufs, d’occasion et reconditionnés." },
      { title: "Importation et exportation", description: "Un accompagnement structuré pour rechercher et acheminer des véhicules adaptés entre différents marchés." },
      { title: "Courtage et agence", description: "Représentation et assistance transactionnelle pour acheteurs, vendeurs et partenaires automobiles." },
      { title: "Crédit-bail et location-vente", description: "Des solutions d’accès et d’acquisition alternatives, sous réserve d’évaluation et de conditions convenues." },
      { title: "Gestion de flotte", description: "Acquisition, planification et assistance automobile pour les flottes d’entreprises et d’institutions." },
      { title: "Pièces et produits automobiles", description: "Commerce futur de pièces, accessoires, lubrifiants et produits connexes." },
    ], enquiryEyebrow: "DEMANDES D’ENTREPRISE ET SPÉCIALES", enquiryTitle: "Vous planifiez une flotte, une importation ou une acquisition difficile à trouver ?", enquiryButton: "Discuter de votre besoin" },
    about: { eyebrow: "CHIBEN AUTO VENTURES LTD", title: "Construite pour rendre la route à venir plus claire.", intro: "Chiben Autos est une entreprise automobile basée à Lagos, axée sur un accès fiable aux véhicules, un service réactif et une croissance durable.", registeredName: "Dénomination enregistrée", registrationNumber: "Numéro d’enregistrement", incorporated: "Date de constitution", companyType: "Type de société", companyTypeValue: "Société privée à responsabilité limitée par actions", status: "Statut", active: "Active", registeredOffice: "Siège social", position: "NOTRE POSITION", positionTitle: "La confiance fait partie du produit.", positionBody: "Un site premium n’est utile que lorsque le service qui l’accompagne est clair. Chiben Autos se construit autour d’annonces exactes, d’une communication responsable et d’un accompagnement qui respecte la décision du client." },
    footer: { explore: "Explorer", contact: "Contact", company: "Entreprise", about: "À propos de Chiben", ownerControl: "Contrôle propriétaire", experience: "Expérience numérique par BYD Studios Digital · Igwe Benedict" },
    whatsapp: { findVehicle: "Bonjour Chiben Autos, j’aimerais obtenir de l’aide pour trouver un véhicule.", heroReservation: "Bonjour Chiben Autos, j’aimerais obtenir de l’aide pour trouver ou réserver un véhicule.", auctionNotice: "Bonjour Chiben Autos, merci de me prévenir à l’ouverture des enchères Chiben.", specialRequest: "Bonjour Chiben Autos, j’aimerais discuter d’un besoin automobile professionnel ou particulier.", vehicleEnquiry: "Bonjour Chiben Autos, j’aimerais obtenir des informations sur" },
  },
  pt: {
    language: "Idioma",
    nav: { inventory: "Veículos", auctions: "Leilões", services: "Serviços", company: "Empresa", whatsapp: "WhatsApp", menu: "Menu", close: "Fechar" },
    motion: { label: "Movimento", full: "completo", balanced: "equilibrado", minimal: "mínimo" },
    common: { all: "Todos", brandNew: "Novos", refurbished: "Recondicionados", prototypeVisual: "Visual de protótipo", prototypeNotForSale: "Visual de protótipo · não está à venda", mileage: "Quilometragem", transmission: "Transmissão", location: "Localização", year: "Ano", body: "Carroçaria", fuel: "Combustível", colour: "Cor", enquire: "Consultar", enquireAbout: "Consultar sobre", vehicle: "veículo", vehicles: "veículos", returnInventory: "Voltar aos veículos" },
    story: { aria: "Visita cinematográfica ao veículo", openingEyebrow: "UM NOVO PADRÃO PARA A ESTRADA", openingLine1: "Encontre o carro que", openingLine2: "faz sentir que chegou.", openingBody: "Veículos novos e cuidadosamente recondicionados, selecionados com critério e apresentados com clareza.", explore: "Ver veículos", reserve: "Reservar no WhatsApp", frameLabels: ["Frente", "Perfil", "Traseira", "Interior"], frameEyebrows: ["01 · Primeira impressão", "02 · Proporção", "03 · Partida", "04 · O interior"], frameTitles: ["Presença antes do movimento.", "Cada linha foi considerada.", "Memorável de todos os ângulos.", "Uma confiança mais tranquila."], next: "A seguir:", view: "vista", continue: "Continuar para a coleção", scroll: "Deslize para iniciar a visita", disclosure: "Visual de veículo protótipo · não está à venda" },
    home: { standard: "PADRÃO CHIBEN", manifestoTitle: "Um bom carro deve abrir possibilidades, não criar incerteza.", manifestoBody: "A Chiben Autos leva apresentação rigorosa, orientação atenta e uma experiência de compra mais transparente ao mercado automóvel nigeriano.", incorporated: "Constituída", based: "Sediada em", activeCompany: "Empresa ativa", collection: "A COLEÇÃO", collectionTitle: "Veículos selecionados com intenção.", featuredFilter: "Filtrar veículos em destaque", completeInventory: "Ver todos os veículos", inventorySupport: "Cada anúncio ativo pode incluir detalhes de inspeção, galeria de imagens e apoio direto à reserva.", auctionEyebrow: "LEILÕES CHIBEN", auctionTitle: "Veículos extraordinários. Uma nova forma de licitar.", auctionBody: "Estão a ser preparados lances verificados, reservas claras e lotes cuidadosamente apresentados.", auctionLink: "Ver o que vem aí", status: "ESTADO", comingSoon: "EM BREVE", earlyAccess: "Aderir ao acesso antecipado", servicesEyebrow: "ALÉM DO SHOWROOM", servicesTitle: "Serviços automóveis criados em torno do movimento.", servicesBody: "O âmbito empresarial registado permite à Chiben Autos servir compradores individuais, proprietários e frotas empresariais à medida que cresce.", services: [
      { title: "Procura de veículos", description: "Diga-nos o que pretende. Procuramos, avaliamos e ajudamos a garantir o veículo certo, local ou internacionalmente." },
      { title: "Corretagem e agência", description: "Um percurso de transação mais claro para compradores, vendedores e empresas que necessitam de representação." },
      { title: "Gestão de frotas", description: "Aquisição prática e planeamento de veículos para equipas em crescimento e organizações estabelecidas." },
      { title: "Leasing e compra a prestações", description: "Percursos estruturados de propriedade, sujeitos a avaliação, disponibilidade e termos acordados." },
    ], learnAbout: "Saber mais sobre", contactEyebrow: "O SEU PRÓXIMO CARRO COMEÇA COM UMA CONVERSA", contactTitle: "Diga-nos o que procura.", contactButton: "Começar no WhatsApp" },
    inventory: { eyebrow: "SHOWROOM CHIBEN", titleLine1: "Veículos para onde", titleLine2: "vai a seguir.", intro: "Explore as categorias disponíveis ou envie-nos a especificação exata que pretende que procuremos.", search: "Pesquisar veículos", searchPlaceholder: "Modelo, carroçaria ou cor", listingsUpdate: "Os anúncios são atualizados através do controlo do proprietário Chiben.", noMatch: "Ainda não há uma correspondência exata.", noMatchBody: "Envie os seus requisitos à Chiben Autos e ajudaremos a encontrar o veículo certo.", request: "Pedir um veículo", notFound: "Veículo não encontrado.", unavailable: "Este anúncio pode ter sido removido ou vendido.", reserve: "Consultar ou reservar no WhatsApp", availability: "A disponibilidade, os detalhes da inspeção e os termos da reserva são confirmados por um representante da Chiben Autos." },
    auctions: { eyebrow: "LEILÕES CHIBEN", title: "Está a ser preparada uma sala de leilões transparente.", intro: "Os futuros lotes combinarão informação verificada, reservas claras e acesso controlado aos licitantes.", join: "Aderir ao acesso antecipado", firstAuction: "PRIMEIRO LEILÃO", comingSoon: "EM BREVE", principles: [
      { title: "Lotes verificados", description: "Identidade do veículo, material de inspeção disponível e informação do vendedor apresentados antes da licitação." },
      { title: "Estado claro", description: "Os estados de reserva e leilão permanecerão visíveis desde a abertura até ao encerramento." },
      { title: "Acesso controlado", description: "As regras de aprovação e pagamento serão definidas antes da ativação dos leilões." },
    ] },
    servicesPage: { eyebrow: "ÂMBITO AUTOMÓVEL REGISTADO", title: "Mais do que um showroom.", intro: "A Chiben Auto Ventures Ltd está estruturada para crescer da venda fiável de veículos para uma empresa de serviços automóveis mais ampla.", services: [
      { title: "Venda de veículos", description: "Compra, venda e comercialização de veículos novos, usados e recondicionados." },
      { title: "Importação e exportação", description: "Apoio estruturado para procurar e transportar veículos adequados entre mercados." },
      { title: "Corretagem e agência", description: "Representação e apoio transacional para compradores, vendedores e parceiros automóveis." },
      { title: "Leasing e compra a prestações", description: "Vias alternativas de acesso e propriedade, sujeitas a avaliação e termos acordados." },
      { title: "Gestão de frotas", description: "Aquisição, planeamento e apoio automóvel para frotas empresariais e institucionais." },
      { title: "Peças e produtos automóveis", description: "Comércio futuro de peças, acessórios, lubrificantes e produtos relacionados." },
    ], enquiryEyebrow: "PEDIDOS EMPRESARIAIS E ESPECIAIS", enquiryTitle: "A planear uma frota, importação ou aquisição difícil de encontrar?", enquiryButton: "Falar sobre o seu pedido" },
    about: { eyebrow: "CHIBEN AUTO VENTURES LTD", title: "Criada para tornar mais claro o caminho em frente.", intro: "A Chiben Autos é uma empresa automóvel sediada em Lagos, focada no acesso fiável a veículos, num serviço atento e no crescimento a longo prazo.", registeredName: "Nome registado", registrationNumber: "Número de registo", incorporated: "Constituída em", companyType: "Tipo de empresa", companyTypeValue: "Sociedade privada limitada por ações", status: "Estado", active: "Ativa", registeredOffice: "Sede registada", position: "A NOSSA POSIÇÃO", positionTitle: "A confiança faz parte do produto.", positionBody: "Um site premium só é útil quando o serviço por trás dele é claro. A Chiben Autos está a ser construída em torno de anúncios exatos, comunicação responsável e apoio à compra que respeita a decisão do cliente." },
    footer: { explore: "Explorar", contact: "Contacto", company: "Empresa", about: "Sobre a Chiben", ownerControl: "Controlo do proprietário", experience: "Experiência digital por BYD Studios Digital · Igwe Benedict" },
    whatsapp: { findVehicle: "Olá Chiben Autos, gostaria de ajuda para encontrar um veículo.", heroReservation: "Olá Chiben Autos, gostaria de ajuda para encontrar ou reservar um veículo.", auctionNotice: "Olá Chiben Autos, por favor avise-me quando os Leilões Chiben abrirem.", specialRequest: "Olá Chiben Autos, gostaria de falar sobre um pedido empresarial ou especial de veículo.", vehicleEnquiry: "Olá Chiben Autos, gostaria de obter informações sobre" },
  },
  ig: {
    language: "Asụsụ",
    nav: { inventory: "Ụgbọ ala", auctions: "Ọkụ ahịa", services: "Ọrụ", company: "Ụlọ ọrụ", whatsapp: "Kpọtụrụ anyị", menu: "Nchịkọta", close: "Mechie" },
    motion: { label: "Mmegharị", full: "zuru ezu", balanced: "n’etiti", minimal: "nta" },
    common: { all: "Niile", brandNew: "Ọhụrụ", refurbished: "E mezigharịrị", prototypeVisual: "Ihe onyonyo nnwale", prototypeNotForSale: "Ihe onyonyo nnwale · ọ bụghị maka ire ere", mileage: "Ogologo njem", transmission: "Ngbanwe gia", location: "Ebe", year: "Afọ", body: "Ụdị ahụ", fuel: "Mmanụ", colour: "Agba", enquire: "Jụọ ajụjụ", enquireAbout: "Jụọ maka", vehicle: "ụgbọ ala", vehicles: "ụgbọ ala", returnInventory: "Laghachi na ụgbọ ala" },
    story: { aria: "Njem onyonyo ụgbọ ala", openingEyebrow: "ỤKPỤRỤ ỌHỤRỤ N’ỤZỌ", openingLine1: "Chọta ụgbọ ala", openingLine2: "na-eme ka i chee na i rutela.", openingBody: "Ụgbọ ala ọhụrụ na ndị e ji nlezianya mezigharịa, ahọpụtara nke ọma ma gosipụta ha n’ụzọ doro anya.", explore: "Lee ụgbọ ala", reserve: "Debe na WhatsApp", frameLabels: ["Ihu", "Akụkụ", "Azụ", "Ime"], frameEyebrows: ["01 · Mmetụta mbụ", "02 · Nhazi", "03 · Ọpụpụ", "04 · Ime ụgbọ ala"], frameTitles: ["Ọnụnọ tupu mmegharị.", "A tụlere ahịrị ọ bụla.", "A na-echeta ya n’akụkụ niile.", "Ntụkwasị obi dị jụụ."], next: "Na-esote:", view: "nlele", continue: "Gaa n’ihu na nchịkọta", scroll: "Pịgharịa ka njem malite", disclosure: "Ihe onyonyo ụgbọ ala nnwale · ọ bụghị maka ire ere" },
    home: { standard: "ỤKPỤRỤ CHIBEN", manifestoTitle: "Ezigbo ụgbọ ala kwesịrị imeghe ohere, ọ bụghị iweta mgbagwoju anya.", manifestoBody: "Chiben Autos na-eweta ngosi a haziri nke ọma, nduzi ngwa ngwa na ahụmịhe ịzụ ahịa doro anya karịa n’ahịa ụgbọ ala Naịjirịa.", incorporated: "E guzobere", based: "Dabere na", activeCompany: "Ụlọ ọrụ na-arụ ọrụ", collection: "NCHỊKỌTA", collectionTitle: "Ụgbọ ala ahọpụtara nke ọma.", featuredFilter: "Họrọ ụgbọ ala ndị pụrụ iche", completeInventory: "Lee ụgbọ ala niile", inventorySupport: "Ndepụta ọ bụla dị ndụ nwere ike ịnwe nkọwa nyocha, foto na enyemaka idebe ụgbọ ala ozugbo.", auctionEyebrow: "ỌKỤ AHỊA CHIBEN", auctionTitle: "Ụgbọ ala pụrụ iche. Ụzọ ọhụrụ isi tinye ọnụahịa.", auctionBody: "A na-akwadebe ịgba ọnụahịa a nyochara, ọnọdụ ọnụahịa doro anya na ụgbọ ala e gosipụtara nke ọma.", auctionLink: "Lee ihe na-abịa", status: "ỌNỌDỤ", comingSoon: "NA-ABỊA N’OGE ADỊGHỊ ANYA", earlyAccess: "Soro ndị ga-ebu ụzọ mata", servicesEyebrow: "KARỊA ỤLỌ NGOSI", servicesTitle: "Ọrụ ụgbọ ala e wuru gburugburu njem.", servicesBody: "Ndebanye ọrụ Chiben Autos na-enye ya ohere ijere ndị na-azụ ahịa, ndị nwe ụgbọ ala na ụgbọ ala ụlọ ọrụ ozi ka ọ na-eto.", services: [
      { title: "Ịchọta ụgbọ ala", description: "Gwa anyị ihe ị chọrọ. Anyị na-achọ, nyochaa ma nyere gị aka inweta ụgbọ ala kwesịrị ekwesị n’ime ma ọ bụ n’èzí obodo." },
      { title: "Onye nnọchi anya na onye etiti", description: "Ụzọ azụmahịa doro anya maka ndị na-azụ, ndị na-ere na ụlọ ọrụ chọrọ nnọchi anya." },
      { title: "Nlekọta ụgbọ ala ụlọ ọrụ", description: "Ịzụta na ịhazi ụgbọ ala maka otu ndị na-eto eto na ụlọ ọrụ ndị guzobere." },
      { title: "Mgbazinye na ịkwụ nwayọọ nwayọọ", description: "Ụzọ inwe ụgbọ ala ahaziri, dabere na nyocha, nnweta na nkwekọrịta." },
    ], learnAbout: "Mụtakwuo maka", contactEyebrow: "ỤGBỌ ALA GỊ NA-ESOTE NA-AMALITE SITE NA MKPARỊTA ỤKA", contactTitle: "Gwa anyị ihe ị na-achọ.", contactButton: "Malite na WhatsApp" },
    inventory: { eyebrow: "ỤLỌ NGOSI CHIBEN", titleLine1: "Ụgbọ ala maka ebe", titleLine2: "ị na-aga ọzọ.", intro: "Chọgharịa ụdị ndị dị ma ọ bụ zitere anyị nkọwa kpọmkwem nke ihe ịchọrọ ka anyị chọta.", search: "Chọọ ụgbọ ala", searchPlaceholder: "Ụdị, ahụ ma ọ bụ agba", listingsUpdate: "Ndepụta na-agbanwe site na njikwa onye nwe Chiben.", noMatch: "Enwebeghị ihe dabara kpọmkwem.", noMatchBody: "Zitere Chiben Autos ihe ị chọrọ, anyị ga-enyere gị aka ịchọta ụgbọ ala kwesịrị ekwesị.", request: "Rịọ ụgbọ ala", notFound: "Ahụghị ụgbọ ala ahụ.", unavailable: "O nwere ike ịbụ na ewepụrụ ndepụta a ma ọ bụ ree ụgbọ ala ahụ.", reserve: "Jụọ ma ọ bụ debe na WhatsApp", availability: "Onye nnọchi anya Chiben Autos ga-akwado nnweta, nkọwa nyocha na usoro idobe ụgbọ ala." },
    auctions: { eyebrow: "ỌKỤ AHỊA CHIBEN", title: "A na-akwadebe ebe ịgba ọnụahịa doro anya.", intro: "Ngwongwo ndị ga-abịa ga-ejikọta ozi ụgbọ ala a nyochara, ọnụahịa nchekwa doro anya na nnabata ndị a kwadoro.", join: "Soro ndị ga-ebu ụzọ mata", firstAuction: "ỌKỤ AHỊA MBỤ", comingSoon: "NA-ABỊA N’OGE ADỊGHỊ ANYA", principles: [
      { title: "Ụgbọ ala a nyochara", description: "A ga-egosi njirimara ụgbọ ala, akwụkwọ nyocha dị na ozi onye na-ere tupu ịgba ọnụahịa." },
      { title: "Ọnọdụ doro anya", description: "Ọnọdụ ọnụahịa nchekwa na ọkụ ahịa ga-adị anya site na mmalite ruo na mmechi." },
      { title: "Nnabata a na-achịkwa", description: "A ga-akọwa nkwado onye na-agba ọnụahịa na iwu ịkwụ ụgwọ tupu ọkụ ahịa amalite." },
    ] },
    servicesPage: { eyebrow: "ỌRỤ ỤGBỌ ALA E DEBANYERE AHA", title: "Karịa ụlọ ngosi.", intro: "E haziri Chiben Auto Ventures Ltd ka ọ too site n’ire ụgbọ ala a pụrụ ịtụkwasị obi ruo n’ụlọ ọrụ ụgbọ ala sara mbara.", services: [
      { title: "Ịzụ na ire ụgbọ ala", description: "Ịzụ, ire na ịkpọsa ụgbọ ala ọhụrụ, ndị ejirila na ndị e mezigharịrị." },
      { title: "Mbubata na mbupụ", description: "Enyemaka ahaziri maka ịchọta na ibuga ụgbọ ala kwesịrị ekwesị n’etiti ahịa dị iche iche." },
      { title: "Onye nnọchi anya na onye etiti", description: "Nnọchi anya na nkwado azụmahịa maka ndị na-azụ, ndị na-ere na ndị mmekọ ụgbọ ala." },
      { title: "Mgbazinye na ịkwụ nwayọọ nwayọọ", description: "Ụzọ ndị ọzọ isi nweta na inwe ụgbọ ala, dabere na nyocha na usoro ekwenyere." },
      { title: "Nlekọta ụgbọ ala ụlọ ọrụ", description: "Ịzụta, ịhazi na nkwado ụgbọ ala maka ụlọ ọrụ na otu dị iche iche." },
      { title: "Akụkụ na ngwaahịa ụgbọ ala", description: "Azụmahịa akụkụ ụgbọ ala, ngwa, mmanụ na ngwaahịa ndị yiri ya n’ọdịnihu." },
    ], enquiryEyebrow: "ARỊRỊỌ ỤLỌ ỌRỤ NA NKE PỤRỤ ICHE", enquiryTitle: "Ị na-eme atụmatụ ụgbọ ala ụlọ ọrụ, mbubata ma ọ bụ ụgbọ ala siri ike ịchọta?", enquiryButton: "Kparịta ihe ị chọrọ" },
    about: { eyebrow: "CHIBEN AUTO VENTURES LTD", title: "E wuru ya iji mee ka ụzọ dị n’ihu doo anya.", intro: "Chiben Autos bụ ụlọ ọrụ ụgbọ ala dị na Lagos nke lekwasịrị anya n’inye ụgbọ ala a pụrụ ịtụkwasị obi, ọrụ ngwa ngwa na uto ogologo oge.", registeredName: "Aha e debanyere", registrationNumber: "Nọmba ndebanye", incorporated: "Ụbọchị e guzobere", companyType: "Ụdị ụlọ ọrụ", companyTypeValue: "Ụlọ ọrụ nkeonwe nwere oke site na mbak", status: "Ọnọdụ", active: "Na-arụ ọrụ", registeredOffice: "Ụlọ ọrụ e debanyere", position: "ECHICHE ANYỊ", positionTitle: "Ntụkwasị obi bụ akụkụ nke ngwaahịa ahụ.", positionBody: "Weebụsaịtị dị oke mma bara uru naanị mgbe ọrụ dị n’azụ ya doro anya. A na-ewu Chiben Autos gburugburu ndepụta ziri ezi, nkwurịta okwu a pụrụ ịdabere na ya na nkwado ịzụ ahịa na-asọpụrụ mkpebi onye ahịa." },
    footer: { explore: "Chọgharịa", contact: "Kpọtụrụ", company: "Ụlọ ọrụ", about: "Maka Chiben", ownerControl: "Njikwa onye nwe", experience: "Ahụmịhe dijitalụ nke BYD Studios Digital · Igwe Benedict" },
    whatsapp: { findVehicle: "Ndewo Chiben Autos, achọrọ m enyemaka ịchọta ụgbọ ala.", heroReservation: "Ndewo Chiben Autos, achọrọ m enyemaka ịchọta ma ọ bụ idobe ụgbọ ala.", auctionNotice: "Ndewo Chiben Autos, biko gwa m mgbe Ọkụ Ahịa Chiben ga-amalite.", specialRequest: "Ndewo Chiben Autos, achọrọ m ikwurịta mkpa ụgbọ ala ụlọ ọrụ ma ọ bụ nke pụrụ iche.", vehicleEnquiry: "Ndewo Chiben Autos, achọrọ m ịjụ maka" },
  },
  yo: {
    language: "Èdè",
    nav: { inventory: "Àwọn ọkọ̀", auctions: "Ọjà ìfilọ́lẹ̀", services: "Ìṣẹ́", company: "Ilé-iṣẹ́", whatsapp: "WhatsApp wa", menu: "Àkójọ", close: "Pa" },
    motion: { label: "Ìṣípò", full: "kíkún", balanced: "dọ́gba", minimal: "kéré" },
    common: { all: "Gbogbo", brandNew: "Tuntun", refurbished: "Àtúnṣe", prototypeVisual: "Àwòrán àdánwò", prototypeNotForSale: "Àwòrán àdánwò · kì í ṣe fún títà", mileage: "Ìrìnàjò", transmission: "Gíà", location: "Ibùdó", year: "Ọdún", body: "Irú ara", fuel: "Epo", colour: "Àwọ̀", enquire: "Béèrè", enquireAbout: "Béèrè nípa", vehicle: "ọkọ̀", vehicles: "àwọn ọkọ̀", returnInventory: "Padà sí àwọn ọkọ̀" },
    story: { aria: "Ìrìn àwòrán ọkọ̀", openingEyebrow: "ÌWỌ̀N TUNTUN FÚN Ọ̀NÀ", openingLine1: "Wa ọkọ̀ tí", openingLine2: "ó mú kó dà bí ẹni pé o ti dé.", openingBody: "Àwọn ọkọ̀ tuntun àti àtúnṣe pẹ̀lú ìṣọ́ra, tí a yàn pẹ̀lú ìdájọ́ rere, tí a sì fi hàn ní kedere.", explore: "Wo àwọn ọkọ̀", reserve: "Fi pamọ́ lórí WhatsApp", frameLabels: ["Iwájú", "Ẹ̀gbẹ́", "Ẹ̀yìn", "Inú"], frameEyebrows: ["01 · Ìwòye àkọ́kọ́", "02 · Ìwọ̀n", "03 · Ìlọkúrò", "04 · Inú ọkọ̀"], frameTitles: ["Ìfarahàn ṣáájú ìṣípò.", "A ronú lórí gbogbo ìlà.", "Ó ṣeé rántí láti gbogbo igun.", "Ìgbẹ́kẹ̀lé tó dákẹ́."], next: "Tó kàn:", view: "ìwòye", continue: "Tẹ̀síwájú sí àkójọpọ̀", scroll: "Yí lọ láti bẹ̀rẹ̀ ìrìn", disclosure: "Àwòrán ọkọ̀ àdánwò · kì í ṣe fún títà" },
    home: { standard: "ÌWỌ̀N CHIBEN", manifestoTitle: "Ọkọ̀ rere gbọ́dọ̀ ṣí àwọn àǹfààní, kì í ṣe mú àìdánilójú wá.", manifestoBody: "Chiben Autos ń mú ìfihàn tó bófin mu, ìtọ́sọ́nà kíákíá àti ìrírí rírà tó hàn gbangba sí ọjà ọkọ̀ ayọ́kẹ́lẹ́ Nàìjíríà.", incorporated: "Dásílẹ̀", based: "Wà ní", activeCompany: "Ilé-iṣẹ́ tó ń ṣiṣẹ́", collection: "ÀKÓJỌPỌ̀", collectionTitle: "Àwọn ọkọ̀ tí a yàn pẹ̀lú èrò.", featuredFilter: "Ṣe àlẹ̀mọ́ àwọn ọkọ̀ pàtàkì", completeInventory: "Wo gbogbo àwọn ọkọ̀", inventorySupport: "Gbogbo ìpolówó tó wà lè ní àlàyé àyẹ̀wò, àwòrán àti ìrànlọ́wọ́ ìfipamọ́ taara.", auctionEyebrow: "ỌJÀ ÌFILỌ́LẸ̀ CHIBEN", auctionTitle: "Àwọn ọkọ̀ àgbàyanu. Ọ̀nà tuntun láti fi owó sí.", auctionBody: "A ń pèsè ìfilọ́lẹ̀ tí a fìdí rẹ̀ múlẹ̀, ipò owó ìpamọ́ tó hàn gbangba àti àwọn ọkọ̀ tí a gbé kalẹ̀ dáadáa.", auctionLink: "Wo ohun tó ń bọ̀", status: "IPÒ", comingSoon: "Ń BỌ̀ LÁÌPẸ́", earlyAccess: "Darapọ̀ mọ́ ìwọlé àkọ́kọ́", servicesEyebrow: "KỌJÁ YÀRÁ ÌFÌHÀN", servicesTitle: "Àwọn iṣẹ́ ọkọ̀ tí a kọ́ yí ìrìn ká.", servicesBody: "Àgbègbè iṣẹ́ tí a forúkọ Chiben Autos sí jẹ́ kí ó lè sin ẹni kọọkan, àwọn oníkọ̀ àti àwọn ọkọ̀ ilé-iṣẹ́ bí ó ṣe ń dàgbà.", services: [
      { title: "Wíwá ọkọ̀", description: "Sọ ohun tí o fẹ́ fún wa. A máa wá, ṣàyẹ̀wò, a sì ran ọ́ lọ́wọ́ láti rí ọkọ̀ tó tọ́ ní abẹ́lé tàbí lókèèrè." },
      { title: "Alárinà àti aṣojú", description: "Ọ̀nà ìdúnàádúrà tó hàn kedere fún àwọn olùrà, olùtà àti ilé-iṣẹ́ tó nílò aṣojú." },
      { title: "Ìṣàkóso ọkọ̀ ilé-iṣẹ́", description: "Rírà àti ètò ọkọ̀ tó wúlò fún àwọn ẹgbẹ́ tó ń dàgbà àti àwọn àjọ tó ti dúró ṣinṣin." },
      { title: "Yíyá àti ìrà ní díẹ̀díẹ̀", description: "Àwọn ọ̀nà ìní tó ṣètò, tó dá lórí àyẹ̀wò, wíwà àti àwọn òfin tí a fohùn ṣọ̀kan." },
    ], learnAbout: "Kọ́ síi nípa", contactEyebrow: "ỌKỌ̀ RẸ TÓ KÀN BẸ̀RẸ̀ PẸ̀LÚ ÌJÍRÒRÒ", contactTitle: "Sọ ohun tí o ń wá fún wa.", contactButton: "Bẹ̀rẹ̀ lórí WhatsApp" },
    inventory: { eyebrow: "YÀRÁ ÌFÌHÀN CHIBEN", titleLine1: "Àwọn ọkọ̀ fún ibi", titleLine2: "tí o ń lọ lẹ́yìn náà.", intro: "Wo àwọn ẹ̀ka tó wà tàbí fi àlàyé gangan ohun tí o fẹ́ kí a wá ránṣẹ́ sí wa.", search: "Wa ọkọ̀", searchPlaceholder: "Módẹ́lì, irú ara tàbí àwọ̀", listingsUpdate: "Àwọn ìpolówó ń yí padà láti ìṣàkóso onílé Chiben.", noMatch: "Kò tíì sí ohun tó bá a mu gangan.", noMatchBody: "Fi ohun tí o fẹ́ ránṣẹ́ sí Chiben Autos, a ó sì ran ọ́ lọ́wọ́ láti rí ọkọ̀ tó tọ́.", request: "Béèrè ọkọ̀", notFound: "A kò rí ọkọ̀ náà.", unavailable: "Ó ṣeé ṣe kí a ti yọ ìpolówó yìí kúrò tàbí kí a ti ta ọkọ̀ náà.", reserve: "Béèrè tàbí fi pamọ́ lórí WhatsApp", availability: "Aṣojú Chiben Autos ni yóò fìdí wíwà, àlàyé àyẹ̀wò àti òfin ìfipamọ́ múlẹ̀." },
    auctions: { eyebrow: "ỌJÀ ÌFILỌ́LẸ̀ CHIBEN", title: "A ń pèsè yàrá ìfilọ́lẹ̀ tó hàn gbangba.", intro: "Àwọn ọkọ̀ ọjọ́ iwájú yóò darapọ̀ mọ́ ìsọfúnni tí a fìdí múlẹ̀, owó ìpamọ́ tó hàn gbangba àti ìwọlé olùfilọ́lẹ̀ tó ní àṣẹ.", join: "Darapọ̀ mọ́ ìwọlé àkọ́kọ́", firstAuction: "ỌJÀ ÀKỌ́KỌ́", comingSoon: "Ń BỌ̀ LÁÌPẸ́", principles: [
      { title: "Àwọn ọkọ̀ tí a ṣàyẹ̀wò", description: "Ìdánimọ̀ ọkọ̀, ohun èlò àyẹ̀wò tó wà àti ìsọfúnni olùtà ni a ó fi hàn kí ìfilọ́lẹ̀ tó bẹ̀rẹ̀." },
      { title: "Ipò tó hàn kedere", description: "Ipò owó ìpamọ́ àti ọjà yóò máa hàn láti ìbẹ̀rẹ̀ títí dé òpin." },
      { title: "Ìwọlé tí a ń ṣàkóso", description: "A ó ṣètò ìfọwọ́sí olùfilọ́lẹ̀ àti òfin ìsanwó kí ọjà tó bẹ̀rẹ̀." },
    ] },
    servicesPage: { eyebrow: "ÀGBÈGBÈ IṢẸ́ ỌKỌ̀ TÍ A FORÚKỌ SÍ", title: "Ó ju yàrá ìfihàn lọ.", intro: "A ṣètò Chiben Auto Ventures Ltd láti dàgbà láti inú títà ọkọ̀ tó ṣeé gbẹ́kẹ̀lé sí ilé-iṣẹ́ ọkọ̀ tó gbooro.", services: [
      { title: "Títà ọkọ̀", description: "Rírà, títà àti ìpolówó àwọn ọkọ̀ tuntun, tí a ti lò àti tí a túnṣe." },
      { title: "Gbigbewọle àti gbígbéjáde", description: "Ìrànlọ́wọ́ tó ṣètò fún wíwá àti gbígbé ọkọ̀ tó yẹ láàárín àwọn ọjà." },
      { title: "Alárinà àti aṣojú", description: "Aṣojú àti ìrànlọ́wọ́ ìdúnàádúrà fún olùrà, olùtà àti alábàáṣiṣẹ́ ọkọ̀." },
      { title: "Yíyá àti ìrà ní díẹ̀díẹ̀", description: "Àwọn ọ̀nà míì láti gba àti ní ọkọ̀, tó dá lórí àyẹ̀wò àti òfin tí a fohùn ṣọ̀kan." },
      { title: "Ìṣàkóso ọkọ̀ ilé-iṣẹ́", description: "Rírà, ètò àti ìrànlọ́wọ́ ọkọ̀ fún àwọn ilé-iṣẹ́ àti àjọ." },
      { title: "Ẹ̀yà àti ọjà ọkọ̀", description: "Òwò ọjọ́ iwájú nínú ẹ̀yà ọkọ̀, ohun èlò, epo àti àwọn ọjà tó jọmọ́ rẹ̀." },
    ], enquiryEyebrow: "ÌBÉÈRÈ ILÉ-IṢẸ́ ÀTI PÀTÀKÌ", enquiryTitle: "Ṣé o ń gbero ọkọ̀ ilé-iṣẹ́, gbigbe wọlé tàbí ọkọ̀ tó ṣòro láti rí?", enquiryButton: "Jíròrò ohun tí o nílò" },
    about: { eyebrow: "CHIBEN AUTO VENTURES LTD", title: "A kọ́ ọ láti mú kí ọ̀nà iwájú hàn kedere.", intro: "Chiben Autos jẹ́ ilé-iṣẹ́ ọkọ̀ ní Lagos tó dojú kọ ìwọlé ọkọ̀ tó ṣeé gbẹ́kẹ̀lé, iṣẹ́ tó yára àti ìdàgbàsókè pípẹ́.", registeredName: "Orúkọ tí a forúkọ sí", registrationNumber: "Nọ́mbà ìforúkọsílẹ̀", incorporated: "Ọjọ́ ìdásílẹ̀", companyType: "Irú ilé-iṣẹ́", companyTypeValue: "Ilé-iṣẹ́ aládani tí ojúṣe rẹ̀ lopin sí ìpín", status: "Ipò", active: "Ń ṣiṣẹ́", registeredOffice: "Ọ́fíìsì tí a forúkọ sí", position: "ÌDÚRÓ WA", positionTitle: "Ìgbẹ́kẹ̀lé jẹ́ apá kan ọjà náà.", positionBody: "Wẹ́ẹ̀bù tó dára wúlò nìkan nígbà tí iṣẹ́ tó wà lẹ́yìn rẹ̀ hàn kedere. A ń kọ́ Chiben Autos yí ìpolówó tó péye, ìbánisọ̀rọ̀ tó ní ojúṣe àti ìrànlọ́wọ́ rírà tó bọ̀wọ̀ fún ìpinnu oníbàárà ká." },
    footer: { explore: "Ṣàwárí", contact: "Kàn sí", company: "Ilé-iṣẹ́", about: "Nípa Chiben", ownerControl: "Ìṣàkóso onílé", experience: "Ìrírí díjítà nipasẹ BYD Studios Digital · Igwe Benedict" },
    whatsapp: { findVehicle: "Pẹ̀lẹ́ Chiben Autos, mo fẹ́ ìrànlọ́wọ́ láti rí ọkọ̀.", heroReservation: "Pẹ̀lẹ́ Chiben Autos, mo fẹ́ ìrànlọ́wọ́ láti rí tàbí fi ọkọ̀ pamọ́.", auctionNotice: "Pẹ̀lẹ́ Chiben Autos, jọ̀wọ́ sọ fún mi nígbà tí Ọjà Chiben bá bẹ̀rẹ̀.", specialRequest: "Pẹ̀lẹ́ Chiben Autos, mo fẹ́ jíròrò ìbéèrè ọkọ̀ ilé-iṣẹ́ tàbí pàtàkì.", vehicleEnquiry: "Pẹ̀lẹ́ Chiben Autos, mo fẹ́ béèrè nípa" },
  },
  ha: {
    language: "Harshe",
    nav: { inventory: "Motoci", auctions: "Gwanjo", services: "Ayyuka", company: "Kamfani", whatsapp: "WhatsApp ɗinmu", menu: "Jeri", close: "Rufe" },
    motion: { label: "Motsi", full: "cikakke", balanced: "daidaitacce", minimal: "kaɗan" },
    common: { all: "Duka", brandNew: "Sabbi", refurbished: "Da aka sabunta", prototypeVisual: "Hoton gwaji", prototypeNotForSale: "Hoton gwaji · ba na sayarwa ba", mileage: "Nisan tafiya", transmission: "Na’urar gear", location: "Wuri", year: "Shekara", body: "Nau’in jiki", fuel: "Mai", colour: "Launi", enquire: "Tambaya", enquireAbout: "Tambaya game da", vehicle: "mota", vehicles: "motoci", returnInventory: "Koma jerin motoci" },
    story: { aria: "Zagaye na fim ɗin mota", openingEyebrow: "SABON MATAKI GA HANYA", openingLine1: "Nemo motar da", openingLine2: "za ta sa ka ji ka isa.", openingBody: "Sabbin motoci da waɗanda aka gyara da kulawa, an zaɓe su da basira kuma an gabatar da su a fili.", explore: "Duba motoci", reserve: "Ajiye ta WhatsApp", frameLabels: ["Gaba", "Gefe", "Baya", "Ciki"], frameEyebrows: ["01 · Gani na farko", "02 · Daidaito", "03 · Tashi", "04 · Cikin mota"], frameTitles: ["Kasancewa kafin motsi.", "An kula da kowane layi.", "Abin tunawa daga kowane ɓangare.", "Amincewa cikin natsuwa."], next: "Na gaba:", view: "gani", continue: "Ci gaba zuwa tarin motoci", scroll: "Gungura don fara zagayen", disclosure: "Hoton motar gwaji · ba na sayarwa ba" },
    home: { standard: "MATAKIN CHIBEN", manifestoTitle: "Mota mai kyau ya kamata ta buɗe dama, ba ta kawo rashin tabbas ba.", manifestoBody: "Chiben Autos na kawo gabatarwa mai tsari, jagora mai sauri da ƙwarewar saye mai gaskiya ga kasuwar motoci ta Najeriya.", incorporated: "An kafa", based: "Tana", activeCompany: "Kamfani mai aiki", collection: "TARIN MOTOCI", collectionTitle: "Motoci da aka zaɓa da manufa.", featuredFilter: "Tace fitattun motoci", completeInventory: "Duba duk motoci", inventorySupport: "Kowane jerin mota na iya haɗawa da bayanan dubawa, hotuna da taimakon ajiya kai tsaye.", auctionEyebrow: "GWANJON CHIBEN", auctionTitle: "Motoci na musamman. Sabuwar hanyar yin tayi.", auctionBody: "Ana shirya tayi da aka tabbatar, bayanin farashin ajiya da motoci da aka gabatar da kyau.", auctionLink: "Duba abin da ke zuwa", status: "MATSAYI", comingSoon: "YANA ZUWA BA DA DAƊEWA BA", earlyAccess: "Shiga jerin masu fara sani", servicesEyebrow: "FIYE DA ƊAKIN NUNI", servicesTitle: "Ayyukan mota da aka gina domin tafiya.", servicesBody: "Faɗin aikin da aka yi wa Chiben Autos rajista yana ba ta damar yi wa masu saye, masu mota da rundunar kamfanoni hidima yayin da take girma.", services: [
      { title: "Nemo mota", description: "Faɗa mana abin da kake so. Za mu bincika, mu tantance kuma mu taimaka maka samun motar da ta dace a gida ko ƙasashen waje." },
      { title: "Dillanci da wakilci", description: "Hanyar ciniki mai haske ga masu saye, masu sayarwa da kamfanonin da ke buƙatar wakilci." },
      { title: "Gudanar da rundunar motoci", description: "Saye da tsare-tsaren mota masu amfani ga ƙungiyoyi masu girma da manyan hukumomi." },
      { title: "Haya da sayen biya a hankali", description: "Tsararrun hanyoyin mallaka, bisa tantancewa, samuwa da sharuddan da aka amince." },
    ], learnAbout: "Ƙara sani game da", contactEyebrow: "MOTARKA TA GABA TANA FARAWA DA TATTAUNAWA", contactTitle: "Faɗa mana abin da kake nema.", contactButton: "Fara a WhatsApp" },
    inventory: { eyebrow: "ƊAKIN NUNIN CHIBEN", titleLine1: "Motoci don inda", titleLine2: "za ka je na gaba.", intro: "Duba nau’o’in da ake da su ko ka aiko mana da cikakken bayanin motar da kake son mu nemo.", search: "Nemo mota", searchPlaceholder: "Samfuri, nau’in jiki ko launi", listingsUpdate: "Jerin motoci yana sabuntawa daga kulawar mai Chiben.", noMatch: "Har yanzu babu daidai abin da ake nema.", noMatchBody: "Aiko wa Chiben Autos da bukatunka, za mu taimaka maka nemo motar da ta dace.", request: "Nemi mota", notFound: "Ba a sami motar ba.", unavailable: "Wataƙila an cire wannan talla ko an sayar da motar.", reserve: "Tambaya ko ajiye ta WhatsApp", availability: "Wakilin Chiben Autos zai tabbatar da samuwa, bayanan dubawa da sharuddan ajiya." },
    auctions: { eyebrow: "GWANJON CHIBEN", title: "Ana shirya ɗakin gwanjo mai gaskiya.", intro: "Motocin nan gaba za su haɗa bayanan da aka tabbatar, farashin ajiya a sarari da damar masu tayi da aka amince.", join: "Shiga jerin masu fara sani", firstAuction: "GWANJO NA FARKO", comingSoon: "YANA ZUWA BA DA DAƊEWA BA", principles: [
      { title: "Motoci da aka tabbatar", description: "Za a gabatar da shaidar mota, bayanan dubawa da bayanin mai sayarwa kafin fara tayi." },
      { title: "Matsayi a sarari", description: "Farashin ajiya da matsayin gwanjo za su kasance a bayyane daga buɗewa zuwa rufewa." },
      { title: "Dama mai kulawa", description: "Za a fayyace amincewar mai tayi da ka’idojin biya kafin a kunna gwanjo." },
    ] },
    servicesPage: { eyebrow: "FANNIN AIKIN MOTA DA AKA YI RAJISTA", title: "Fiye da ɗakin nuni.", intro: "An tsara Chiben Auto Ventures Ltd ta girma daga amintaccen sayar da motoci zuwa babban kamfanin ayyukan mota.", services: [
      { title: "Sayar da motoci", description: "Saye, sayarwa da tallata sabbin motoci, tsofaffi da waɗanda aka sabunta." },
      { title: "Shigo da fitarwa", description: "Tsararren taimako don nemo da jigilar motoci masu dacewa tsakanin kasuwanni." },
      { title: "Dillanci da wakilci", description: "Wakilci da tallafin ciniki ga masu saye, masu sayarwa da abokan hulɗar mota." },
      { title: "Haya da sayen biya a hankali", description: "Wasu hanyoyin samun da mallakar mota, bisa tantancewa da sharuddan da aka amince." },
      { title: "Gudanar da rundunar motoci", description: "Saye, tsarawa da tallafin mota ga rundunar kamfanoni da hukumomi." },
      { title: "Kayayyakin mota", description: "Cinikin sassan mota, kayan haɗi, man shafawa da makamantan kayayyaki a nan gaba." },
    ], enquiryEyebrow: "BUKATUN KAMFANI DA NA MUSAMMAN", enquiryTitle: "Kana shirin rundunar motoci, shigo da mota ko neman mota mai wahalar samu?", enquiryButton: "Tattauna bukatarka" },
    about: { eyebrow: "CHIBEN AUTO VENTURES LTD", title: "An gina shi don bayyana hanyar gaba.", intro: "Chiben Autos kamfanin mota ne da ke Lagos, wanda ya mayar da hankali kan samun mota cikin aminci, hidima mai sauri da ci gaba na dogon lokaci.", registeredName: "Sunan rajista", registrationNumber: "Lambar rajista", incorporated: "Ranar kafuwa", companyType: "Nau’in kamfani", companyTypeValue: "Kamfani mai zaman kansa da hannun jari ya iyakance", status: "Matsayi", active: "Yana aiki", registeredOffice: "Ofishin rajista", position: "MATSAYINMU", positionTitle: "Amincewa wani ɓangare ne na samfurin.", positionBody: "Gidan yanar gizo mai inganci yana da amfani ne kawai idan hidimar da ke bayansa ta bayyana. Ana gina Chiben Autos bisa jerin motoci masu inganci, sadarwa mai alhaki da tallafin saye da ke girmama shawarar abokin ciniki." },
    footer: { explore: "Bincika", contact: "Tuntuɓa", company: "Kamfani", about: "Game da Chiben", ownerControl: "Kulawar mai kamfani", experience: "Ƙwarewar dijital ta BYD Studios Digital · Igwe Benedict" },
    whatsapp: { findVehicle: "Sannu Chiben Autos, ina buƙatar taimako wajen nemo mota.", heroReservation: "Sannu Chiben Autos, ina buƙatar taimako wajen nemo ko ajiye mota.", auctionNotice: "Sannu Chiben Autos, don Allah ku sanar da ni idan Gwanjon Chiben ya buɗe.", specialRequest: "Sannu Chiben Autos, ina son tattauna buƙatar mota ta kamfani ko ta musamman.", vehicleEnquiry: "Sannu Chiben Autos, ina son tambaya game da" },
  },
};

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  copy: PublicCopy;
};

const LanguageContext = createContext<LanguageContextValue>({ language: "en", setLanguage: () => undefined, copy: copy.en });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("chiben-language") as LanguageCode | null;
    const browserLanguage = navigator.language.toLowerCase().split("-")[0] as LanguageCode;
    const next = stored && supportedLanguages.some((item) => item.code === stored)
      ? stored
      : supportedLanguages.some((item) => item.code === browserLanguage) ? browserLanguage : "en";
    const timer = window.setTimeout(() => setLanguage(next), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage: (next: LanguageCode) => {
      setLanguage(next);
      window.localStorage.setItem("chiben-language", next);
    },
    copy: copy[language],
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function languageName(code: LanguageCode) {
  return supportedLanguages.find((item) => item.code === code)?.name ?? "English";
}
