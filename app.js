const { createApp } = Vue;

const createCollaborator = () => ({
  id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
  name: '',
  percentage: 0
});

createApp({
  data() {
    return {
      theme: 'dark',
      projectTitle: '',
      totalRoyalty: null,
      collaborators: [createCollaborator()],
      results: [],
      copyMessage: ''
    };
  },
  computed: {
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
      const title = this.projectTitle || 'Unnamed project';
      if (!this.results.length) {
        return `Awaiting calculation for ${title}.`;
      }
      return `${title}: ${this.results.length} collaborator${
        this.results.length !== 1 ? 's' : ''
      } splitting ${this.formatCurrency(this.totalRoyalty || 0)}.`;
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

      const header = 'Collaborator,Split %,Royalty Share';
      const rows = this.results.map((row) => {
        const safeName = row.name || 'Unnamed collaborator';
        return `${safeName},${row.percentage.toFixed(2)}%,${this.formatCurrency(
          row.amount
        )}`;
      });
      const payload = [header, ...rows].join('\n');

      try {
        await navigator.clipboard.writeText(payload);
        this.copyMessage = 'Results copied to clipboard.';
      } catch (error) {
        console.error('Copy failed', error);
        this.copyMessage = 'Copy not supported in this browser.';
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
    }
  },
  mounted() {
    document.body.classList.add('theme', `theme--${this.theme}`);
  }
}).mount('#app');

