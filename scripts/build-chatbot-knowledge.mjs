import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { createServer } from 'vite'

const OUT_DIR = path.resolve('chatbot-knowledge')
const SITE_URL = 'https://kemi-oluwadahunsi.vercel.app'
const OWNER = 'Kemi Oluwadahunsi'
const SKIP_KEYS = new Set(['id', 'img', 'image', 'images', 'heroImage', 'initials', 'caseStudyId', 'hasCaseStudy'])
const TITLE_KEYS = ['title', 'name', 'decision', 'metric', 'phase', 'platform']

const isLink = (v) => typeof v === 'string' && v && v !== '#'
const humanize = (key) => key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (c) => c.toUpperCase())

function renderValue(value, depth) {
  if (value == null || value === '' || value === '#') return ''
  if (typeof value !== 'object') return String(value).trim()
  if (Array.isArray(value)) {
    if (value.every((v) => typeof v !== 'object')) {
      return value.filter((v) => v !== '').map((v) => `- ${String(v).trim()}`).join('\n')
    }
    return value.map((v) => renderObject(v, depth)).filter(Boolean).join('\n\n')
  }
  return renderObject(value, depth)
}

function renderObject(obj, depth) {
  const titleKey = TITLE_KEYS.find((k) => typeof obj[k] === 'string')
  const lines = []
  if (titleKey) lines.push(`${'#'.repeat(Math.min(depth, 6))} ${obj[titleKey].trim()}`)
  for (const [key, value] of Object.entries(obj)) {
    if (key === titleKey || SKIP_KEYS.has(key)) continue
    const body = renderValue(value, depth + 1)
    if (!body) continue
    lines.push(body.includes('\n') || typeof value === 'object' ? `**${humanize(key)}:**\n${body}` : `**${humanize(key)}:** ${body}`)
  }
  return lines.join('\n\n')
}

function section(title, body) {
  return body ? `## ${title}\n\n${body}\n` : ''
}

// Sections of the single-page site (ids match src/components/Layout and the sidebar).
const SITE_SECTIONS = [
  ['Home / top of the page', 'main-content', 'the introduction and headline stats'],
  ['Expertise / Services', 'services', 'what Kemi offers: micro-frontends, enterprise frontend, full-stack, security and IAM, writing, AI automation'],
  ['Work / Portfolio / Projects', 'portfolioSection', 'the project cards with live sites, source code and case studies'],
  ['Architecture', 'architecture', 'system architecture write-ups and design decisions'],
  ['Experience / Work history', 'experience', 'the career timeline'],
  ['Skills / Tech stack', 'skills', 'skills grouped by category'],
  ['Writing / Ebooks / Teaching', 'writing', 'ebooks, LinkedIn carousels and articles'],
  ['Open source', 'opensource', 'published and upcoming open-source libraries'],
  ['Testimonials / Recommendations / Reviews', 'testimonials', 'what colleagues say about Kemi'],
  ['Contact', 'contact', 'the contact form for hiring, freelance projects and questions'],
]

function buildSiteMap() {
  const sections = SITE_SECTIONS.map(
    ([name, id, about]) => `- ${name}: ${SITE_URL}/#${id} (${about})`,
  ).join('\n')
  return [
    'The portfolio is a single scrolling page. These links jump straight to a section:',
    sections,
    `- All ebooks, with filters and details: ${SITE_URL}/ebooks`,
    `- Case studies open on their own pages, e.g. ${SITE_URL}/case-study/<id> (links are listed under each project).`,
  ].join('\n')
}

function buildProfile(data) {
  const { portfolioItems, workExperience, skillGroups, services, socialLinks, contactInfo, testimonials, writingData, blogLink, openSourceData } = data

  const projects = portfolioItems.map((p) => {
    const lines = [
      `### Project: ${p.title.trim()}`,
      `**Category:** ${p.category}`,
      p.description,
      `**Tech stack:** ${p.stacks.join(', ')}`,
      isLink(p.live) && `**Live site:** ${p.live}`,
      isLink(p.gitHub) && `**Source code:** ${p.gitHub}`,
      p.hasCaseStudy && `**Full case study:** ${SITE_URL}/case-study/${p.caseStudyId}`,
    ]
    return lines.filter(Boolean).join('\n\n')
  }).join('\n\n')

  const experience = workExperience.map((job) => [
    `### ${job.title} at ${job.company}`,
    `**Location:** ${job.location}`,
    `**Period:** ${job.startDate} – ${job.endDate}${job.current ? ' (current role)' : ''}`,
    `**Highlights:**\n${job.highlights.map((h) => `- ${h}`).join('\n')}`,
    `**Technologies:** ${job.tags.join(', ')}`,
  ].join('\n\n')).join('\n\n')

  const skills = skillGroups.map((g) => `**${g.category}:** ${g.skills.join(', ')}`).join('\n\n')

  const serviceList = services.map((s) => `### Service: ${s.title}\n\n${s.description}\n\n**Focus areas:** ${s.tags.join(', ')}`).join('\n\n')

  const openSource = [
    ...openSourceData.published.map((o) => `### Open-source (published): ${o.name}\n\n${renderValue({ ...o, name: undefined }, 4)}`),
    ...openSourceData.pipeline.map((o) => `### Open-source (${o.status}, not yet released): ${o.name}\n\n${o.description}`),
  ].join('\n\n')

  const writing = [
    ...writingData.map((w) => `### ${w.title}\n\n${renderValue({ ...w, title: undefined }, 4)}`),
    isLink(blogLink?.url) && `### Blog\n\n${blogLink.description}\n\n**URL:** ${blogLink.url}`,
  ].filter(Boolean).join('\n\n')

  const recommendations = testimonials.map((t) => `> "${t.quote}"\n>\n> — ${t.name}, ${t.role}, ${t.company}`).join('\n\n')

  const contactLines = [
    `- Contact form: ${SITE_URL}/#contact`,
    contactInfo.email && `- Email: ${contactInfo.email}`,
    isLink(socialLinks.linkedin) && `- LinkedIn: ${socialLinks.linkedin}`,
    isLink(socialLinks.github) && `- GitHub: ${socialLinks.github}`,
    isLink(socialLinks.twitter) && `- X / Twitter: ${socialLinks.twitter}`,
    isLink(socialLinks.whatsapp) && `- WhatsApp: ${socialLinks.whatsapp}`,
    isLink(socialLinks.resume) && `- Resume / CV: ${socialLinks.resume}`,
  ].filter(Boolean).join('\n')

  return [
    `# ${OWNER} — Portfolio Knowledge Base`,
    `This document describes ${OWNER}, a Software Engineer, and is the source of truth for the portfolio assistant at ${SITE_URL}.`,
    section('Website sections and navigation', buildSiteMap()),
    section('Contact and links', contactLines),
    section('Work experience', experience),
    section('Skills', skills),
    section('Services offered', serviceList),
    section('Projects', projects),
    section('Open-source work', openSource),
    section('Writing, books and content', writing),
    section('Recommendations', recommendations),
  ].filter(Boolean).join('\n\n')
}

function buildCaseStudy(cs) {
  const { title, ...rest } = cs
  return [
    `# Case study: ${title}`,
    `Case study of ${OWNER}'s project "${title}". Page: ${SITE_URL}/case-study/${cs.id}`,
    renderObject({ ...rest, title: undefined }, 2),
  ].join('\n\n')
}

const SYSTEM_PROMPT = `You are the portfolio assistant for ${OWNER}, a Software Engineer. You help visitors (recruiters, clients and developers) learn about ${OWNER}'s experience, skills, projects, case studies, services, open-source work and writing.

How to answer:
- Base every answer on the knowledge base below. You may reason from it: when a visitor asks "can she do X?", look through her skills, services, projects and experience, and answer yes when they support it, naming the specific skills, services or projects that back it up (for example, HTML5, CSS3, React and Next.js are listed skills, and Full-Stack Development is a service, so building a website is within scope).
- If only part of the request is covered, say what is covered and what is not, instead of refusing.
- Never invent or estimate employers, dates, metrics, projects, skills, prices, rates, availability, timelines or contact details that are not in the knowledge base.
- Navigation: if a visitor asks to be taken somewhere, to scroll, to see or open a section, or says things like "take me there", reply with one short sentence and the matching link from "Website sections and navigation" (or the project link you just discussed). Match loosely and forgive typos, so "porttfolio sction" means the Work / Portfolio section.
- Pricing, rates, availability, timelines and project-specific commitments are agreed case by case: say so and point to the contact form at ${SITE_URL}/#contact.
- Only if the knowledge base has nothing relevant at all, reply: "I don't have that information. Please use the contact form at ${SITE_URL}/#contact to ask ${OWNER.split(' ')[0]} directly."
- Politely decline requests unrelated to ${OWNER}'s portfolio (general coding help, other people, current events) and redirect to what you can answer.
- Refer to ${OWNER.split(' ')[0]} in the third person. Be concise (under 120 words), warm and professional.
- When relevant, include the matching live site, source code or case study link, written as a plain URL.
`

const server = await createServer({
  configFile: false,
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true, hmr: false },
})

try {
  const portfolio = await server.ssrLoadModule('/src/constants/portfolioData.js')
  const { caseStudies } = await server.ssrLoadModule('/src/constants/caseStudiesData.js')

  await rm(OUT_DIR, { recursive: true, force: true })
  await mkdir(OUT_DIR, { recursive: true })

  const files = {
    'system-prompt.txt': SYSTEM_PROMPT,
    'profile.md': buildProfile(portfolio),
    ...Object.fromEntries(Object.values(caseStudies).map((cs) => [`case-study-${cs.id}.md`, buildCaseStudy(cs)])),
  }

  for (const [name, content] of Object.entries(files)) {
    await writeFile(path.join(OUT_DIR, name), `${content.trim()}\n`)
  }

  console.log(`Wrote ${Object.keys(files).length} files to ${path.relative(process.cwd(), OUT_DIR)}/`)
} finally {
  await server.close()
}
