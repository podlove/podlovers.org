module.exports = {
  HEADER: {
    SUBSCRIBE: 'Subscribe',
    EPISODES: 'Episoden',
    CONTRIBUTORS: 'Kontributoren'
  },
  EPISODE: {
    SUMMARY: 'Info',
    SHOWNOTES: 'Shownotes',
    TIMELINE: 'Timeline',
    DISCUSS: 'Kommentare'
  },
  CONTRIBUTOR: {
    SOCIAL: 'Social',
    DONATION: 'Support',
    SUMMARY: 'Zusammenfassung',
    EPISODES: 'Episoden',
    EPISODE: 'Episode',
    TIMELINE: 'Verlauf',
    WORDS_TOTAL: 'Wörter',
    WORDS_TOTAL_TOOLTIP: '{relative}% aller Wörter in diesem Podcast ({total})',
    TALK_TIME_TOTAL: 'Sprechzeit',
    TALK_TIME_TOTAL_TOOLTIP: '{relative}% der gesamten Sprechzeit in diesem Podcast ({total})',
    EPISODES_TOTAL: 'Episoden',
    EPISODES_TOTAL_TOOLTIP: '{relative}% aller Episoden in diesem Podcast ({total})'
  },
  CONTRIBUTOR_LIST: {
    TITLE: 'Kontributoren',
    EPISODES_COUNT: ({ count }) => (count <= 1 ? `${count} Episode` : `${count} Episoden`)
  }
}
