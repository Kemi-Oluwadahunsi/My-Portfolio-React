export const statusConfig = {
  'in-progress': { label: 'Writing Now', className: 'amber' },
  'coming-soon': { label: 'Coming Soon', className: 'blue' },
  published: { label: 'Published', className: 'green' },
  Done: { label: 'Available Now', className: 'green' },
}

export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } },
}
