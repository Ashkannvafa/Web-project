const { createApp } = Vue;

// Comprehensive translations object for all UI strings
const translations = {
  EN: {
    // Header
    eyebrow: 'Royalty Manager',
    title: 'Royalty Split Calculator',
    subtitle: 'Configure collaborators and visualize precise royalty allocations.',
    help: 'Help',
    share: 'Share',
    selectLanguage: 'Select language',
    lightMode: 'Light mode',
    darkMode: 'Dark mode',
    
    // Language names
    langEnglish: 'English',
    langSpanish: 'Spanish',
    langFrench: 'French',
    
    // Input Panel
    projectSetup: 'Project setup',
    projectSetupSubtitle: 'Enter project details and collaborators.',
    projectTitle: 'Project title',
    projectTitlePlaceholder: 'Debut Single: Echoes',
    totalRoyalty: 'Total royalty amount',
    totalRoyaltyPlaceholder: '10000',
    collaborators: 'Collaborators',
    addCollaborator: '+ Add collaborator',
    name: 'Name',
    namePlaceholder: 'Collaborator name',
    split: 'Split (%)',
    splitPlaceholder: '25',
    allocated: 'allocated',
    readyToCalculate: 'Ready to calculate',
    mustEqual100: 'Must equal 100%',
    
    // Output Panel
    results: 'Results',
    resultsSubtitle: 'Run the calculation once percentages equal 100%.',
    calculateSplit: 'Calculate split',
    resetForm: 'Reset form',
    collaborator: 'Collaborator',
    royaltyShare: 'Royalty share',
    total: 'Total',
    copyResults: 'Copy results',
    resultsCopied: 'Results copied to clipboard.',
    copyNotSupported: 'Copy not supported in this browser.',
    resultsEmpty: 'Results will appear here after a successful calculation.',
    awaitingCalculation: 'Awaiting calculation for',
    collaboratorsSplitting: 'collaborator',
    collaboratorsSplittingPlural: 'collaborators',
    splitting: 'splitting',
    unnamedProject: 'Unnamed project',
    unnamedCollaborator: 'Unnamed collaborator',
    
    // Share Modal
    shareModalTitle: 'Share',
    shareText: 'Split royalties easily with Royalty Split Calculator!',
    copyLink: 'Copy Link',
    linkCopied: 'Link copied to clipboard!',
    closeShareModal: 'Close share modal',
    
    // Help Modal
    helpModalTitle: 'Help & Support',
    faqQ1: 'How do I calculate royalty splits?',
    faqA1: 'Enter your total royalty amount and add collaborators with their percentage splits. Ensure the total percentages equal 100%, then click "Calculate split" to see the results.',
    faqQ2: 'Can I add or remove collaborators?',
    faqA2: 'Yes! Click the "+ Add collaborator" button to add more collaborators. Use the "✕" button to remove a collaborator. You must have at least one collaborator.',
    closeHelpModal: 'Close help modal',
    
    // Social sharing labels
    twitter: 'Twitter/X',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    
    // Footer
    footerLogo: 'RoyaltySplitter',
    footerCompany: 'Company',
    footerBlog: 'Blog',
    footerAbout: 'About',
    footerPress: 'Press Kit',
    footerUseCases: 'Use Cases',
    footerMusic: 'Music',
    footerPodcast: 'Podcast',
    footerFilm: 'Film',
    footerApp: 'App',
    footerOther: 'Other',
    footerLanguage: 'Language',
    footerLegal: 'Legal & Apps',
    footerImprint: 'Imprint',
    footerPrivacy: 'Privacy Policy',
    footerMobile: 'Mobile Apps',
    footerAppStore: '📱 App Store',
    footerPlayStore: '🤖 Google Play',
    footerCopyright: '© 2025 RoyaltySplitter.'
  },
  ES: {
    eyebrow: 'Gestor de Regalías',
    title: 'Calculadora de División de Regalías',
    subtitle: 'Configura colaboradores y visualiza asignaciones precisas de regalías.',
    help: 'Ayuda',
    share: 'Compartir',
    selectLanguage: 'Seleccionar idioma',
    lightMode: 'Modo claro',
    darkMode: 'Modo oscuro',
    langEnglish: 'Inglés',
    langSpanish: 'Español',
    langFrench: 'Francés',
    projectSetup: 'Configuración del proyecto',
    projectSetupSubtitle: 'Ingresa los detalles del proyecto y colaboradores.',
    projectTitle: 'Título del proyecto',
    projectTitlePlaceholder: 'Sencillo debut: Ecos',
    totalRoyalty: 'Monto total de regalías',
    totalRoyaltyPlaceholder: '10000',
    collaborators: 'Colaboradores',
    addCollaborator: '+ Agregar colaborador',
    name: 'Nombre',
    namePlaceholder: 'Nombre del colaborador',
    split: 'División (%)',
    splitPlaceholder: '25',
    allocated: 'asignado',
    readyToCalculate: 'Listo para calcular',
    mustEqual100: 'Debe ser igual a 100%',
    results: 'Resultados',
    resultsSubtitle: 'Ejecuta el cálculo una vez que los porcentajes sean iguales a 100%.',
    calculateSplit: 'Calcular división',
    resetForm: 'Restablecer formulario',
    collaborator: 'Colaborador',
    royaltyShare: 'Participación de regalías',
    total: 'Total',
    copyResults: 'Copiar resultados',
    resultsCopied: 'Resultados copiados al portapapeles.',
    copyNotSupported: 'Copia no compatible en este navegador.',
    resultsEmpty: 'Los resultados aparecerán aquí después de un cálculo exitoso.',
    awaitingCalculation: 'Esperando cálculo para',
    collaboratorsSplitting: 'colaborador',
    collaboratorsSplittingPlural: 'colaboradores',
    splitting: 'dividiendo',
    unnamedProject: 'Proyecto sin nombre',
    unnamedCollaborator: 'Colaborador sin nombre',
    shareModalTitle: 'Compartir',
    shareText: '¡Divide regalías fácilmente con la Calculadora de División de Regalías!',
    copyLink: 'Copiar enlace',
    linkCopied: '¡Enlace copiado al portapapeles!',
    closeShareModal: 'Cerrar modal de compartir',
    helpModalTitle: 'Ayuda y Soporte',
    faqQ1: '¿Cómo calculo las divisiones de regalías?',
    faqA1: 'Ingresa tu monto total de regalías y agrega colaboradores con sus porcentajes de división. Asegúrate de que los porcentajes totales sean iguales a 100%, luego haz clic en "Calcular división" para ver los resultados.',
    faqQ2: '¿Puedo agregar o eliminar colaboradores?',
    faqA2: '¡Sí! Haz clic en el botón "+ Agregar colaborador" para agregar más colaboradores. Usa el botón "✕" para eliminar un colaborador. Debes tener al menos un colaborador.',
    closeHelpModal: 'Cerrar modal de ayuda',
    twitter: 'Twitter/X',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    footerLogo: 'RoyaltySplitter',
    footerCompany: 'Empresa',
    footerBlog: 'Blog',
    footerAbout: 'Acerca de',
    footerPress: 'Kit de Prensa',
    footerUseCases: 'Casos de Uso',
    footerMusic: 'Música',
    footerPodcast: 'Podcast',
    footerFilm: 'Película',
    footerApp: 'Aplicación',
    footerOther: 'Otro',
    footerLanguage: 'Idioma',
    footerLegal: 'Legal y Aplicaciones',
    footerImprint: 'Impronta',
    footerPrivacy: 'Política de Privacidad',
    footerMobile: 'Aplicaciones Móviles',
    footerAppStore: '📱 App Store',
    footerPlayStore: '🤖 Google Play',
    footerCopyright: '© 2025 RoyaltySplitter.'
  },
  FR: {
    eyebrow: 'Gestionnaire de Redevances',
    title: 'Calculateur de Répartition de Redevances',
    subtitle: 'Configurez les collaborateurs et visualisez les allocations précises de redevances.',
    help: 'Aide',
    share: 'Partager',
    selectLanguage: 'Sélectionner la langue',
    lightMode: 'Mode clair',
    darkMode: 'Mode sombre',
    langEnglish: 'Anglais',
    langSpanish: 'Espagnol',
    langFrench: 'Français',
    projectSetup: 'Configuration du projet',
    projectSetupSubtitle: 'Saisissez les détails du projet et les collaborateurs.',
    projectTitle: 'Titre du projet',
    projectTitlePlaceholder: 'Premier single: Échos',
    totalRoyalty: 'Montant total des redevances',
    totalRoyaltyPlaceholder: '10000',
    collaborators: 'Collaborateurs',
    addCollaborator: '+ Ajouter un collaborateur',
    name: 'Nom',
    namePlaceholder: 'Nom du collaborateur',
    split: 'Répartition (%)',
    splitPlaceholder: '25',
    allocated: 'alloué',
    readyToCalculate: 'Prêt à calculer',
    mustEqual100: 'Doit être égal à 100%',
    results: 'Résultats',
    resultsSubtitle: 'Exécutez le calcul une fois que les pourcentages sont égaux à 100%.',
    calculateSplit: 'Calculer la répartition',
    resetForm: 'Réinitialiser le formulaire',
    collaborator: 'Collaborateur',
    royaltyShare: 'Part de redevances',
    total: 'Total',
    copyResults: 'Copier les résultats',
    resultsCopied: 'Résultats copiés dans le presse-papiers.',
    copyNotSupported: 'Copie non prise en charge dans ce navigateur.',
    resultsEmpty: 'Les résultats apparaîtront ici après un calcul réussi.',
    awaitingCalculation: 'En attente de calcul pour',
    collaboratorsSplitting: 'collaborateur',
    collaboratorsSplittingPlural: 'collaborateurs',
    splitting: 'répartissant',
    unnamedProject: 'Projet sans nom',
    unnamedCollaborator: 'Collaborateur sans nom',
    shareModalTitle: 'Partager',
    shareText: 'Répartissez facilement les redevances avec le Calculateur de Répartition de Redevances!',
    copyLink: 'Copier le lien',
    linkCopied: 'Lien copié dans le presse-papiers!',
    closeShareModal: 'Fermer le modal de partage',
    helpModalTitle: 'Aide et Support',
    faqQ1: 'Comment calculer les répartitions de redevances?',
    faqA1: 'Entrez votre montant total de redevances et ajoutez des collaborateurs avec leurs pourcentages de répartition. Assurez-vous que les pourcentages totaux sont égaux à 100%, puis cliquez sur "Calculer la répartition" pour voir les résultats.',
    faqQ2: 'Puis-je ajouter ou supprimer des collaborateurs?',
    faqA2: 'Oui! Cliquez sur le bouton "+ Ajouter un collaborateur" pour ajouter plus de collaborateurs. Utilisez le bouton "✕" pour supprimer un collaborateur. Vous devez avoir au moins un collaborateur.',
    closeHelpModal: 'Fermer le modal d\'aide',
    twitter: 'Twitter/X',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    footerLogo: 'RoyaltySplitter',
    footerCompany: 'Entreprise',
    footerBlog: 'Blog',
    footerAbout: 'À propos',
    footerPress: 'Kit de Presse',
    footerUseCases: 'Cas d\'Usage',
    footerMusic: 'Musique',
    footerPodcast: 'Podcast',
    footerFilm: 'Film',
    footerApp: 'Application',
    footerOther: 'Autre',
    footerLanguage: 'Langue',
    footerLegal: 'Legal et Applications',
    footerImprint: 'Mentions Légales',
    footerPrivacy: 'Politique de Confidentialité',
    footerMobile: 'Applications Mobiles',
    footerAppStore: '📱 App Store',
    footerPlayStore: '🤖 Google Play',
    footerCopyright: '© 2025 RoyaltySplitter.'
  }
};

const createCollaborator = () => ({
  id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
  name: '',
  percentage: 0
});

createApp({
  data() {
    // Load language from localStorage or default to EN
    const savedLang = localStorage.getItem('royaltySplitterLang') || 'EN';
    const validLang = ['EN', 'ES', 'FR'].includes(savedLang) ? savedLang : 'EN';
    
    return {
      theme: 'dark',
      projectTitle: '',
      totalRoyalty: null,
      collaborators: [createCollaborator()],
      results: [],
      copyMessage: '',
      // Language toggle state
      currentLanguage: validLang,
      showLangDropdown: false,
      languages: [
        { code: 'EN', name: 'English' },
        { code: 'ES', name: 'Spanish' },
        { code: 'FR', name: 'French' }
      ],
      // Share modal state
      showShareModal: false,
      shareCopyMessage: '',
      // Help modal state
      showHelpModal: false
    };
  },
  computed: {
    shareLinks() {
      const url = window.location.href;
      const t = translations[this.currentLanguage];
      const text = encodeURIComponent(`${t.shareText} ${url}`);
      return {
        twitter: `https://twitter.com/intent/tweet?text=${text}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
      };
    },
    percentageTotal() {
      return this.collaborators.reduce(
        (total, { percentage }) => total + Number(percentage || 0),
        0
      );
    },
    isPercentageComplete() {
      return Math.abs(this.percentageTotal - 100) < 0.01;
    },
    canCalculate() {
      return this.isPercentageComplete && Number(this.totalRoyalty) > 0;
    },
    isPristine() {
      return (
        !this.projectTitle &&
        !this.totalRoyalty &&
        this.collaborators.length === 1 &&
        !this.collaborators[0].name &&
        !this.collaborators[0].percentage
      );
    },
    summaryText() {
      const t = translations[this.currentLanguage];
      const title = this.projectTitle || t.unnamedProject;
      if (!this.results.length) {
        return `${t.awaitingCalculation} ${title}.`;
      }
      const collaboratorWord = this.results.length !== 1 
        ? t.collaboratorsSplittingPlural 
        : t.collaboratorsSplitting;
      return `${title}: ${this.results.length} ${collaboratorWord} ${t.splitting} ${this.formatCurrency(this.totalRoyalty || 0)}.`;
    },
    currentTranslations() {
      return translations[this.currentLanguage];
    },
    currentUrl() {
      return window.location.href;
    }
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.body.classList.remove('theme--dark', 'theme--light');
      document.body.classList.add(`theme--${this.theme}`);
    },
    addCollaborator() {
      this.collaborators.push(createCollaborator());
    },
    removeCollaborator(index) {
      if (this.collaborators.length === 1) return;
      this.collaborators.splice(index, 1);
    },
    calculateSplit() {
      if (!this.canCalculate) return;

      const total = Number(this.totalRoyalty);
      this.results = this.collaborators.map((collab) => {
        const percentage = Number(collab.percentage) || 0;
        const amount = (percentage / 100) * total;
        return {
          id: collab.id,
          name: collab.name,
          percentage,
          amount
        };
      });
      this.copyMessage = '';
    },
    async copyResults() {
      if (!this.results.length) return;

      const t = translations[this.currentLanguage];
      const header = `${t.collaborator},${t.split},${t.royaltyShare}`;
      const rows = this.results.map((row) => {
        const safeName = row.name || t.unnamedCollaborator;
        return `${safeName},${row.percentage.toFixed(2)}%,${this.formatCurrency(
          row.amount
        )}`;
      });
      const payload = [header, ...rows].join('\n');

      try {
        await navigator.clipboard.writeText(payload);
        this.copyMessage = t.resultsCopied;
      } catch (error) {
        console.error('Copy failed', error);
        this.copyMessage = t.copyNotSupported;
      }
    },
    resetForm() {
      this.projectTitle = '';
      this.totalRoyalty = null;
      this.collaborators = [createCollaborator()];
      this.results = [];
      this.copyMessage = '';
    },
    formatCurrency(value) {
      const formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      return formatter.format(Number(value) || 0);
    },
    // Language toggle methods
    toggleLangDropdown() {
      this.showLangDropdown = !this.showLangDropdown;
    },
    closeLangDropdown() {
      this.showLangDropdown = false;
    },
    selectLanguage(code) {
      this.currentLanguage = code;
      this.showLangDropdown = false;
      // Save to localStorage
      localStorage.setItem('royaltySplitterLang', code);
      // Update all translatable content
      this.updateContent(code);
    },
    // Update all translatable content on the page
    updateContent(langCode) {
      const t = translations[langCode];
      if (!t) return;

      // Update all elements with data-i18n attributes
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
          // Handle input placeholders
          if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'number')) {
            el.placeholder = t[key];
          } 
          // Handle aria-label attributes
          else if (el.hasAttribute('aria-label')) {
            el.setAttribute('aria-label', t[key]);
          } 
          // Handle regular text content
          else {
            el.textContent = t[key];
          }
        }
      });

      // Update HTML lang attribute
      const langMap = { EN: 'en', ES: 'es', FR: 'fr' };
      document.documentElement.lang = langMap[langCode] || 'en';
    },
    // Share functionality
    async handleShare() {
      const t = translations[this.currentLanguage];
      const shareData = {
        title: t.title,
        text: `${t.shareText} ${window.location.href}`,
        url: window.location.href
      };

      // Try Web Share API first
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (error) {
          // User cancelled or error occurred, fall through to modal
          if (error.name !== 'AbortError') {
            console.error('Share failed:', error);
          }
        }
      }

      // Fallback to modal
      this.showShareModal = true;
    },
    closeShareModal() {
      this.showShareModal = false;
      this.shareCopyMessage = '';
    },
    async copyShareLink() {
      const t = translations[this.currentLanguage];
      const url = window.location.href;
      
      // Try modern clipboard API first
      try {
        await navigator.clipboard.writeText(url);
        this.shareCopyMessage = t.linkCopied;
        setTimeout(() => {
          this.shareCopyMessage = '';
        }, 2000);
      } catch (error) {
        // Fallback to execCommand for older browsers
        try {
          const input = document.createElement('input');
          input.value = url;
          input.style.position = 'fixed';
          input.style.opacity = '0';
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
          this.shareCopyMessage = t.linkCopied;
          setTimeout(() => {
            this.shareCopyMessage = '';
          }, 2000);
        } catch (fallbackError) {
          console.error('Copy failed', fallbackError);
          this.shareCopyMessage = t.copyNotSupported;
        }
      }
    },
    // Help modal functionality
    openHelpModal() {
      this.showHelpModal = true;
    },
    closeHelpModal() {
      this.showHelpModal = false;
    }
  },
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el.clickOutsideEvent = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value();
          }
        };
        document.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
      }
    }
  },
  mounted() {
    document.body.classList.add('theme', `theme--${this.theme}`);
    // Initialize translations on mount
    this.updateContent(this.currentLanguage);
    // Update language names in dropdown
    this.languages = [
      { code: 'EN', name: translations[this.currentLanguage].langEnglish },
      { code: 'ES', name: translations[this.currentLanguage].langSpanish },
      { code: 'FR', name: translations[this.currentLanguage].langFrench }
    ];
  },
  watch: {
    currentLanguage(newLang) {
      // Update language names when language changes
      this.languages = [
        { code: 'EN', name: translations[newLang].langEnglish },
        { code: 'ES', name: translations[newLang].langSpanish },
        { code: 'FR', name: translations[newLang].langFrench }
      ];
    }
  }
}).mount('#app');

