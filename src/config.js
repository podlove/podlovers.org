export const contributors = {
  groups: Object.values(CONFIG.contributors.groups) || [],
  roles: Object.values(CONFIG.contributors.roles) || []
}

export const background = CONFIG.header.background

export const colors = CONFIG.theme.colors

export const feed = CONFIG.feed

export const comments = {
  discourse: CONFIG.comments.discourse
}
