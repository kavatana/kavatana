# Field Consumer Map

## Project
- `title`, `tagline`, `status`, `year`, `endYear`: Rendered in BayonHub Flagship Card & `/projects/[slug]` Hero.
- `featured`, `featuredOrder`: Used by `useProjects` composable to sort and filter the Projects index.
- `role`, `stack`, `coverImage`, `coverImageAlt`: Rendered in BayonHub Flagship Card & `/projects/[slug]` Hero.
- `screenshots`: Rendered in `/projects/[slug]` screenshots section.
- `liveUrl`, `repoUrl`: Rendered in CTA buttons on `/projects/[slug]`.
- `problem`, `constraints`, `myRole`, `solution`, `tradeoffs`, `results`, `nextSteps`: Rendered in `/projects/[slug]` body sections.
- `callout`: Rendered in callout block on `/projects/[slug]`.

## CapabilityGroup
- `title`, `description`, `items`: Rendered in Capability List component on `/` and `/about`.

## BuildDirection
- `label`: Rendered in Build Directions Block on `/` and `/projects`.

## TimelineEntry
- `title`, `organization`, `startYear`, `endYear`, `description`: Rendered in Timeline component on `/about`.

## SiteConfig
- `name`, `tagline`, `description`, `url`, `ogImage`: Consumed by `app.head` and Nuxt SEO composables.
- `email`: Fallback for Contact page and footer.
- `social.github`, `social.linkedin`: Rendered in AppFooter social icons.
- `availabilityStatus`: Rendered in Home and About pages.
